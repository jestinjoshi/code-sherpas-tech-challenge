"use client"

import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import TransactionCard from "@/components/transactionCard";

type transactionType = {
  date: string;
  description: string;
  amount: number;
  balance: number;
};

export default function Home() {
  // State to hold transactions and pagination
  const [transactions, setTransactions] = useState<transactionType[]>([]);
  const [page, setPage] = useState(0);
  const [isAscending, setAscending] = useState(false);

  // State to manage form visibility
  const [formVisibility, setFormVisibility] = useState<'none' | 'deposit' | 'withdraw' | 'transfer'>('none');

  // Memoized sorted transactions based on the date and sorting order
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      return isAscending
        ? new Date(a.date).valueOf() - new Date(b.date).valueOf()
        : new Date(b.date).valueOf() - new Date(a.date).valueOf();
    });
  }, [transactions, isAscending]);

  // Memoized paginated transactions based on chunk size
  const paginatedTransactions = useMemo(() => {
    const chunkSize = 10;
    return sortedTransactions.reduce<transactionType[][]>((acc, curr, i) => {
      const chunkIndex = Math.floor(i / chunkSize);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = []; // Start a new chunk
      }
      acc[chunkIndex].push(curr);
      return acc;
    }, []);
  }, [sortedTransactions]);

  // Balance is calculated based on the latest transaction
  const balance = transactions[0]?.balance ?? 0;

  // Function to handle pagination
  const handlePagination = (handler: number) => {
    const newPage = page + handler;
    if (newPage >= 0 && newPage < paginatedTransactions.length)
      setPage(newPage);
  };

  // Fetch transactions from the dummy data and initialize balance
  useEffect(() => {
    fetch('./dummy-data.json')
      .then(res => res.json())
      .then((data: transactionType[]) => setTransactions(data));
  }, []);


  // Function to handle form submission for different transaction types
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>, type: 'deposit' | 'withdraw' | 'transfer') => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Parse form amount and calculate based on transaction type
    const formAmount = parseFloat(formData.get('amount')?.toString() || '0');
    const amount = type === 'withdraw' || type === 'transfer' ? -formAmount : formAmount;

    const description = formData.get('description')?.toString() || '';

    // Create new transaction object
    const newTransaction: transactionType = {
      date: new Date().toISOString().split('T')[0],
      description: type === 'transfer' ? `Transferred to ${formData.get('recepient')?.toString() || ''}` : description,
      amount: amount,
      balance: parseFloat((balance + amount).toFixed(2))
    };

    // Add new transaction and close the form
    setTransactions(prev => [newTransaction, ...prev])
    setFormVisibility('none');
  };

  return (
    <main className="flex flex-col p-14 min-h-screen bg-[#025257]">
      <div className="container mx-auto">
        <h1 className="text-4xl mb-1 text-white">Hi, <span className="user-name min-w-10 inline-block h-full" contentEditable="plaintext-only"></span></h1>
        <p className="mb-10 text-white">Welcome to your banking portal</p>

        <div className="stats mb-10 grid gap-10">
          <div className="flex items-center rounded-lg border border-gray-100 bg-white p-6 gap-6 justify-between">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-blue-100 p-3 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <div>
                <p className="text-2xl font-medium text-gray-900">${balance}</p>
                <p className="text-sm text-gray-500">Balance</p>
              </div>
            </div>
            <div className="flex gap-10">
              <div onClick={() => setFormVisibility('deposit')} className="flex flex-col text-center items-center cursor-pointer">
                <span className="rounded-full bg-green-100 p-3 text-green-600 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-8 w-8 p-1" fill="currentColor">
                    <path d="M240.1 4.2c9.8-5.6 21.9-5.6 31.8 0l171.8 98.1L448 104l0 .9 47.9 27.4c12.6 7.2 18.8 22 15.1 36s-16.4 23.8-30.9 23.8L32 192c-14.5 0-27.2-9.8-30.9-23.8s2.5-28.8 15.1-36L64 104.9l0-.9 4.4-1.6L240.1 4.2zM64 224l64 0 0 192 40 0 0-192 64 0 0 192 48 0 0-192 64 0 0 192 40 0 0-192 64 0 0 196.3c.6 .3 1.2 .7 1.8 1.1l48 32c11.7 7.8 17 22.4 12.9 35.9S494.1 512 480 512L32 512c-14.1 0-26.5-9.2-30.6-22.7s1.1-28.1 12.9-35.9l48-32c.6-.4 1.2-.7 1.8-1.1L64 224z" />
                  </svg>
                </span>
                <p className="text-sm text-gray-500">Deposit</p>
              </div>
              <div onClick={() => setFormVisibility('withdraw')} className="flex flex-col items-center text-center cursor-pointer">
                <span className="rounded-full bg-red-100 p-3 text-red-600 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-8 w-8 p-1" fill="currentColor">
                    <path d="M312 24l0 10.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3s0 0 0 0c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8l0 10.6c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-11.4c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2L264 24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5L192 512 32 512c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l36.8 0 44.9-36c22.7-18.2 50.9-28 80-28l78.3 0 16 0 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l120.6 0 119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384c0 0 0 0 0 0l-.9 0c.3 0 .6 0 .9 0z" />
                  </svg>
                </span>
                <p className="text-sm text-gray-500">Withdraw</p>
              </div>
              <div onClick={() => setFormVisibility('transfer')} className="flex flex-col items-center text-center cursor-pointer">
                <span className="rounded-full bg-yellow-200 p-3 text-yellow-700 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="h-8 w-8 p-1" fill="currentColor">
                    <path d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64l241.9 0c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5 608 384c0 35.3-28.7 64-64 64l-241.9 0c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5 32 128c0-35.3 28.7-64 64-64zm64 64l-64 0 0 64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64l64 0 0-64zM320 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z" />
                  </svg>
                </span>
                <p className="text-sm text-gray-500">Transfer</p>
              </div>
            </div>
          </div>


        </div>

        <div className="rounded-lg border border-gray-200">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">

              <thead className="text-left bg-gray-200">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex items-center">
                    <span className="mr-5">Date</span>
                    <div className="flex-col flex cursor-pointer" onClick={() => setAscending(!isAscending)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-3 w-5 mb-[-10px]" fill={isAscending ? 'black' : 'gray'}>
                        <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-3 w-5" transform="rotate(180)" fill={!isAscending ? 'black' : 'gray'}>
                        <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                      </svg>
                    </div>
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Description</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-right">Amount</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Balance</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {paginatedTransactions[page]?.map(({ date, description, amount, balance }, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{date}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{description}</td>
                    <td className={`whitespace-nowrap px-4 py-2 text-right ${amount > 0 ? 'text-green-600' : 'text-red-600'}`}>{amount}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <TransactionCard type={formVisibility} setDisplay={setFormVisibility} submitHandler={handleFormSubmit} />

          {!!paginatedTransactions.length &&
            <div className="rounded-b-lg border-t border-gray-200 px-4 py-4 bg-gray-200">
              <ol className="flex justify-end gap-1 text-xs font-medium">
                <li>
                  <span
                    onClick={() => handlePagination(-1)}
                    className="cursor-pointer inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
                  >
                    <span className="sr-only">Prev Page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </li>

                {paginatedTransactions.map((el, ind) => (
                  <li key={ind}>
                    <span onClick={() => setPage(ind)} className={`${ind === page ? 'border-blue-600 bg-blue-600 text-white' : 'cursor-pointer border-gray-100 bg-white text-gray-900'} block size-8 rounded border text-center leading-8`}>{ind + 1}</span>
                  </li>
                ))}

                <li>
                  <span
                    onClick={() => handlePagination(1)}
                    className="cursor-pointer inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
                  >
                    <span className="sr-only">Next Page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </li>
              </ol>
            </div>
          }
        </div>
      </div>
    </main>
  );
}
