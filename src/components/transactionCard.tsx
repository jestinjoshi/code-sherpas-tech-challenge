import { FormEventHandler } from "react";
import Overlay from "./overlay";

type TransactionCardType = {
    type: string;
    submitHandler: Function;
    setDisplay: Function;
};

export default function TransactionCard({ type, submitHandler, setDisplay }: TransactionCardType) {

    const formSubmit: FormEventHandler<HTMLFormElement> = e => {
        submitHandler(e, type)
    }

    return (
        type !== 'none' &&
        <Overlay setDisplay={setDisplay}>
            <div className="transaction-card">

                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg">
                        <form onSubmit={formSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white" onClick={(e) => e.stopPropagation()}>

                            {type !== 'transfer' &&
                                <div>
                                    <label htmlFor="description" className="sr-only">Description</label>

                                    <div className="relative">
                                        <input
                                            required
                                            autoComplete="off"
                                            type="text"
                                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border"
                                            placeholder="Enter description"
                                            name="description"
                                        />
                                    </div>
                                </div>
                            }

                            {type === 'transfer' &&
                                <>
                                    <div>
                                        <label htmlFor="receipient" className="sr-only">Recepient</label>

                                        <div className="relative">
                                            <input
                                                required
                                                autoComplete="off"
                                                type="text"
                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border"
                                                placeholder="Enter recepient name"
                                                name="recepient"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="iban" className="sr-only">IBAN</label>

                                        <div className="relative">
                                            <input
                                                // HTML validation
                                                pattern="^([A-Z]{2})(\d{2})([A-Z0-9]{4,30})$"
                                                required
                                                autoComplete="off"
                                                type="text"
                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border iban"
                                                placeholder="Enter IBAN number"
                                                name="iban"
                                            />
                                        </div>
                                    </div>
                                </>
                            }

                            <div>
                                <label htmlFor="amount" className="sr-only">Amount</label>

                                <div className="relative">
                                    <input
                                        required
                                        autoComplete="off"
                                        type="number"
                                        min={1}
                                        step={0.01}
                                        className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm border"
                                        placeholder="Enter amount"
                                        name="amount"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="block w-full rounded-lg bg-[#025257] px-5 py-3 text-sm font-medium text-white capitalize"
                            >
                                {type} Money
                            </button>
                        </form>
                    </div>
                </div>
            </div >
        </Overlay >
    )
}