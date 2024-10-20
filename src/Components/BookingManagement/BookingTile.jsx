import React, { useState } from 'react';
import { Edit, Trash } from 'lucide-react';
import BookingUpdateForm from './BookingUpdateForm';
import { format, parseISO } from 'date-fns';

const BookingTile = ({ user, onUpdate, DeleteData }) => {
  const [active, setActive] = useState(0);
  const isActive = () => {
    return user.BookingStatus === "Active";
  };

  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'MMMM d, yyyy h:mm a');
    } catch (error) {
      console.error('Error parsing date:', error);
      return 'Invalid Date';
    }
  };


  const handleDelete = () => {
    DeleteData(user._id);
    console.log('Delete service:', user);
  };

  const handleUpdate = (updatedService) => {
    onUpdate(updatedService);
    setActive(0);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
      {active === 0 ? (
        <>
          <div className="flex-grow">
            <h2 className="text-lg font-semibold">{user.Name}</h2>
            <p className="text-gray-600">{user.Description}</p>
            <div className="flex gap-4 p-4 bg-white">
              <div>{formatDate(user.Date)}</div>
              {/* <div>{user.BookingStatus}</div> */}
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setActive(1)} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              <Edit size={18} />
            </button>
            <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
              <Trash size={18} />
            </button>
          </div>
        </>
      ) : (
        <BookingUpdateForm 
          active={active} 
          setActive={setActive} 
          onUpdate={handleUpdate} 
          booking={user}
        />
      )}
    </div>
  );
};

export default BookingTile;