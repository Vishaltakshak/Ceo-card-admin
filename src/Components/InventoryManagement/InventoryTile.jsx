import {useState} from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import InventoryUpdateForm from './InventoryUpdateForm';

const InventoryTile = ({user, onUpdate, DeleteData}) => {
  const [active, setActive] = useState(0);
  const isAvailable = user.Availability === "Available";
  const handleDelete = () => {
    DeleteData(user._id);
    console.log('Delete service:', user);
  };

  const handleUpdate = (updatedService) => {
    onUpdate(updatedService);
    setActive(0);
  };

        // Check if user object exists and has properties
        if (!user ) {
          console.error('Missing user in InventoryTile component');
          return <p>Loading...</p>; // Or display a placeholder message
        }
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      {active===0?(
        <> <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 ">{user.VendorName}</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 ">{user.InventoryType}</p>
      </div>
      <div className="flex-1 min-w-0">
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 ">{user.Pricing}</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 ">{user.Discount}</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 ">{user.CreationDate}</p>
      </div>
      <div className="flex-shrink-0 ml-4">
        <button onClick={() => setActive(1)} className="p-1 text-blue-600 hover:bg-blue-100 rounded">
          <Pencil size={20} />
        </button>
        <button onClick={handleDelete} className="p-1 text-red-600 hover:bg-red-100 rounded ml-2">
          <Trash2 size={20} />
        </button>
      </div></>
      ):(<InventoryUpdateForm
         active={active} 
        setActive={setActive} 
        onUpdate={handleUpdate} 
        booking={user}/>)}
     
    </div>
  );
};

export default InventoryTile;