import {useState} from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import ContentUpdateForm from './ContentUpdateForm';


const ContentTile = ({ user, DeleteData, onUpdate }) => {
  const [active, setActive] = useState(0);
  const isActive=()=>{
    const status= user.ContentStatus
    if(status==="Available"){
      return true
    }
    else{
      return false;
    }
  }
  const handleDelete = () => {
    DeleteData(user._id);
    console.log('Delete service:', user);
  };

  const handleUpdate = (updatedService) => {
    onUpdate(updatedService);
    setActive(0);
  };
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      {active===0?(
        <>
         <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{user.VendorName}</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500">{user.ContentType}</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500">{user.Title}</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500">{user.Description}</p>
      </div>
      <div className="flex-shrink-0 mx-2">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isActive ? 'Available' : 'Unavailable'}
        </span>
      </div>
      
      <div className="flex-shrink-0 ml-2 space-x-2">
        <button
        onClick={() => setActive(1)}
          
          className="p-1 text-gray-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </button>
        <button
        onClick={handleDelete}
         
          className="p-1 text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </button>
      </div>

        </>
      ):(<ContentUpdateForm active={active} 
        setActive={setActive} 
        onUpdate={handleUpdate} 
        content={user}/>)}
     
    </div>
  );
};

export default ContentTile;