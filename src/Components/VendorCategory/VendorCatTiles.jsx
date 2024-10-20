import React from 'react'
import VendorCategoryTile from './VendorCategoryTIle';
import { ImageOff } from 'lucide-react';
import { useEffect } from 'react';
import useApi from '../../useApi/useApi';
import { useState } from 'react';
const VendorCatTiles = () => {
    const { data: loading, error, fetchData, deleteData } = useApi();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  
  const getUsers = async () => {
    try {
      const response = await fetchData('NavBar/view');
      setUsers(response.data.Data || []);
      console.log('navbar',users)
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

  const handleUserUpdate = (updatedUser) => {
    setUsers(prevUsers => prevUsers.map(user => 
      user._id === updatedUser._id ? updatedUser : user
    ));
  }
  const DeleteData = async (id) => {
    try {
        await deleteData('Nav/hover/delete', id); // Await the delete operation
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id)); // Filter out the deleted user
    } catch (err) {
        console.error("Error deleting user:", err);
    }
};

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

  return (
    <div  className="max-h-[70vh] overflow-y-auto">
        <div className="flex pl-2.5">
        <div className='w-1/6'><strong>Category</strong></div>
        <div className='w-11/12'><strong>Description</strong></div>
        <div className='w-1/6'><strong>Status</strong></div>
        <div className='w-1/6'><strong>Created ON</strong></div>
        <div className='w-1/6'><strong>Actions</strong></div>
      </div>
      {users.length === 0 ? (
        <div>No users found</div>
      ) : (
        users.map(user => (
          <VendorCategoryTile
            key={user._id} 
            navbar={user} 
            onUpdate={handleUserUpdate}
            DeleteData={DeleteData}
          />
        ))
      )}
    </div>
  );
 
}

export default VendorCatTiles
