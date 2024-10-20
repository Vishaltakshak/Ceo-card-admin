import { useEffect, useState } from 'react';

import useApi from '../../useApi/useApi';
import BookingTile from './BookingTile';
import { User } from 'lucide-react';

const BookingTiles = () => {
  const { data: apiUsers, loading, error, fetchData, deleteData } = useApi();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  
  const getUsers = async () => {
    try {
      const response = await fetchData('booking/services/view');
      console.log("bookings aree", response);
      setUsers(response.data.Data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

  const DeleteData = async (id) => {
    try {
        await deleteData('booking/services/delete', id); // Await the delete operation
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id)); // Filter out the deleted user
    } catch (err) {
        console.error("Error deleting user:", err);
    }
};

  const handleUserUpdate = (updatedUser) => {
    setUsers(prevUsers => prevUsers.map(user => 
      user._id === updatedUser._id ? updatedUser : user
    ));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  

  return (
    <div  className="max-h-[70vh] overflow-y-auto">
      
      {users.length === 0 ? (
        <div>No users found</div>
      ) : (
        users.map(user => (
          <BookingTile
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

export default BookingTiles;