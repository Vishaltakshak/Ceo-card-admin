import { useEffect, useState } from 'react';

import useApi from '../../useApi/useApi';
import InventoryTile from './InventoryTile';

const Inv = () => {
  const { data: apiUsers, loading, error, fetchData, deleteData } = useApi();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  
  const getUsers = async () => {
    try {
      const response = await fetchData('Inventory/management/view');
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
    <div>
      <div className="flex pl-3.5">
        <div className='w-1/6'><strong>Vendor Name</strong></div>
        <div className='w-1/6'><strong>Inventory Type</strong></div>
        <div className='w-1/6'><strong>Availabilty</strong></div>
        <div className='w-1/6'><strong>Pricing</strong></div>
        <div className='w-1/6'><strong>Discount</strong></div>
        <div className='w-1/6'><strong>Created on</strong></div>
        <div className='w-1/6'><strong>Actions</strong></div>
      </div>
      {users.length === 0 ? (
        <div>No users found</div>
      ) : (
        users.map(user => (
          <InventoryTile
            key={user._id} 
            user={user} 
            onUpdate={handleUserUpdate}
          />
        ))
      )}
    </div>
  );
}

export default Inv;