import React from 'react'

const userManage = () => {
  return (
    <div className="p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-gray-600" />
          <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
          <span className="text-gray-500 ml-2">Add, Edit, Delete</span>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2">
          <span className="text-xl font-bold">+</span>
          Add New
        </button>
      </div>

      {/* Search and List Container */}
      <div className="bg-white rounded-lg shadow">
        {/* Search Bar */}
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Table Header */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b font-medium">
          <div className="w-1/6">Name</div>
          <div className="w-1/6">Email</div>
          <div className="w-1/6">Mobile</div>
          <div className="w-1/6">Profile Image</div>
          <div className="w-1/6">Role</div>
          <div className="w-1/6">Actions</div>
        </div>

        {/* User List */}
        {loading ? (
          <div className="p-4 text-center text-gray-600">Loading users...</div>
        ) : error ? (
          <div className="p-4 text-center text-red-600">Error: {error}</div>
        ) : (
          users.map(user => <UserRow key={user.id} user={user} />)
        )}
      </div>
    </div>
  )
}

export default userManage
