import { useEffect, useState } from 'react';

import useApi from '../../useApi/useApi';

import VendorManagementTile from './VendorManagementTile';

const VendorManagementTiles = () => {
  const { data: apiUsers, loading, error, fetchData, deleteData} = useApi();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  
  const getUsers = async () => {
    try {
      const response = await fetchData('Vendor/vendors');
      console.log("vendors aree", response);
      setUsers(response.data.Data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

  const handleUserUpdate = (updatedUser) => {
    setUsers(prevUsers => prevUsers.map(user => 
      user._id === updatedUser._id ? updatedUser : user
    ));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div  className="max-h-[70vh] overflow-y-auto">
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex items-center text-left  font-bold ">
        <div className="flex-1 p-3 ">Category Name</div>
        
        <div className="flex-1 p-3 ">Details</div>
        
        <div className="w-24 p-3">Actions</div>
      </div>
    </div>
    
      {users.length === 0 ? (
        <div>No users found</div>
      ) : (
        users.map(user => (
          <VendorManagementTile 
            key={user._id} 
            user={user} 
            onUpdate={handleUserUpdate}  
          />
        ))
      )}
    </div>
  );
}

export default VendorManagementTiles;