export default function CustomerTile() {
    return (
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium text-gray-900">Customer</h3>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Active
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">05-02-2021</span>
            <div className="flex space-x-2">
              <button
                className="p-1 rounded-md text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                className="p-1 rounded-md text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }