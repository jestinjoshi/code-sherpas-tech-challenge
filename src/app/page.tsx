"use client"

import { useEffect, useState } from "react";
import "./styles.css";

type transactionType = {
  date: string;
  description: string;
  amount: number;
  balance: number;
};

export default function Home() {
  const [transactions, setTransactions] = useState<transactionType[][]>([]);
  const [page, setPage] = useState(0);

  const handlePagination = (handler: number) => {
    const newPage = page + handler;
    if (newPage >= 0 && newPage < transactions.length)
      setPage(newPage);
  }

  useEffect(() => {
    fetch('./dummy-data.json')
      .then(res => res.json())
      .then((res: transactionType[]) => {
        let chunks = [];
        const chunkSize = 10;
        for (let i = 0; i < res.length; i += chunkSize) {
          chunks.push(res.slice(i, i + chunkSize));
        }
        setTransactions(chunks);
      })
  }, [])

  return (
    <main className="flex flex-col p-24 min-h-screen bg-[#025257]">
      <h1 className="text-4xl mb-1 text-white">Hi, <span className="user-name min-w-10 inline-block h-full" contentEditable="plaintext-only"></span></h1>
      <p className="mb-10 text-white">Welcome to your banking portal</p>

      <div className="rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left bg-gray-200">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Description</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-right">Amount</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Balance</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {transactions[page]?.map(({ date, description, amount, balance }, index) => (
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

            {transactions.map((el, ind) => (
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
      </div>
    </main>
  );
}
