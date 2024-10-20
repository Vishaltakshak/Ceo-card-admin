import { useEffect, useState } from 'react';

import useApi from '../../useApi/useApi';
import ContentTile from './ContentTile';

const ContentTiles = () => {
  const { data: apiUsers, loading, error, fetchData, deleteData } = useApi();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  
  const getUsers = async () => {
    try {
      const response = await fetchData('Content/management/view');
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
  const DeleteData = async (id) => {
    try {
        await deleteData('Content/management/delete', id); // Await the delete operation
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id)); // Filter out the deleted user
    } catch (err) {
        console.error("Error deleting user:", err);
    }
};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div  className="max-h-[70vh] overflow-y-auto m-1 pl-2">
      <div className='flex'>
        <div className='w-1/3'><strong>Title</strong></div>
        <div className='w-1/3'><strong>Content Type</strong></div>
        <div className='w-1/3'><strong>Title</strong></div>
        <div className='w-1/4'><strong>Description</strong></div>
        <div className='w-1/6'><strong>Status</strong></div>
        <div className='w-1/6'><strong>Actions</strong></div>

      </div>
      {users.length === 0 ? (
        <div>No users found</div>
      ) : (
        users.map(user => (
          <ContentTile
            key={user._id} 
            user={user} 
            onUpdate={handleUserUpdate}
            DeleteData={DeleteData}
          />
        ))
      )}
    </div>
  );
}

export default ContentTiles;