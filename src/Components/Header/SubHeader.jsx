import { Users } from 'lucide-react';

export default function SubHeader({toggleForm}) {

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6 text-gray-600" />
        <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
        <span className="text-gray-500 ml-2">Add, Edit, Delete</span>
      </div>
      <button onClick={toggleForm} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2">
        <span className="text-xl font-bold">+</span>
        Add New
      </button>
    </div>
  );
}