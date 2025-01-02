import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import ServiceUpdateForm from './ServiceUpdateForm';

const ServiceTile = ({onUpdate, service, DeleteData }) => {
  const [active, setActive] = useState(0); // State for managing edit mode

  const isActive = () => {
    return service.ProviderStatus === "Active";
  };

  const handleDelete = () => {
    DeleteData(service._id); // Use service._id instead of subCat._id
    console.log('Delete service:', service);
  };

  const handleUpdate = (updatedService) => {
    onUpdate(updatedService); // Call the update function passed as a prop
    setActive(0); // Reset active state after update
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-full">
      {active === 0 ? ( 
        <>
          <div className="flex items-center space-x-6">
            <span className="w-6.5 text-sm font-semibold text-gray-800 whitespace-normal">{service.ProviderName}</span>
            <span className="text-sm text-gray-600 whitespace-nowrap">{service.ServiceCatergory}</span>
            <span className=" text-sm text-gray-600 whitespace-normal">{service.SubCategory}</span>
          </div>
        
          <div className="flex items-center space-x-6">
            <img 
              src={service.BannerIMG} 
              alt={`${service.ProviderName} banner`} // Add alt text for accessibility
              className="w-20 h-20 object-cover rounded" // Use valid Tailwind sizes
            />
            <a 
              href={service.WebsiteURl} // Use service.WebsiteURl for dynamic link
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline truncate max-w-[150px]"
            >
              {service.WebsiteURl}
            </a>
            <span className="px-2 py-1 text-sm font-medium text-white bg-green-100 rounded-full whitespace-nowrap">
              <div className="flex-shrink-0 mx-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${isActive() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {isActive() ? 'Active' : 'Inactive'}
                </span>
              </div>
            </span>
            <button onClick={() => setActive(1)} className="p-2 text-blue-500 hover:bg-blue-100 rounded-full">
              <Edit size={20} />
            </button>
            <button onClick={handleDelete} className="p-2 text-red-500 hover:bg-red-100 rounded-full">
              <Trash2 size={20} />
            </button>
          </div>
        </>
      ) : (
        <ServiceUpdateForm active={active} setActive={setActive} onUpdate={onUpdate} navbar={service} />
      )}
    </div>
  );
};

export default ServiceTile;