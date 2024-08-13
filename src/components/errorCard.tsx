import Overlay from "./overlay";

export default function ErrorCard({ error }: { error: string }) {
    return (
        <Overlay>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
                        <p className="mb-5 text-red-800">There was an error fetching the data. Please refresh the page to try again.</p>
                        <label className="mr-2">Error message:</label>
                        <code className="bg-gray-100 p-2 rounded">{error}</code>
                        <button onClick={() => { location.reload() }} className="block w-full rounded-lg bg-[#025257] px-5 py-3 mt-5 text-sm font-medium text-white capitalize">
                            Refresh Page
                        </button>
                    </div>
                </div>
            </div>
        </Overlay>
    )
}