import React, { useState } from 'react';
import useApi from '../../useApi/useApi';
import { CategoryUpdateForm } from './CategoryUpdateForm';

const VendorCategoryTile = ({ navbar, onUpdate, DeleteData }) => {
  const [active, setActive] = useState(0);
  const { deleteData, fetchData } = useApi();

  const handleDelete = () => {
    DeleteData(subCat._id)
    
    console.log('Delete sub-category:', subCat);
  };


  const toggleUpdateForm = () => {
    setActive(active === 1 ? 0 : 1);
  };

  const handleUpdate = (updatedUser) => {
    onUpdate(updatedUser);
    toggleUpdateForm();
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-md overflow-hidden">
      {active === 0 ? (
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-900">{navbar.CategoryName}</span>
            <span className="text-sm font-medium text-gray-500">{navbar.Description}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              {navbar.Status}
            </span>
            <span className="text-sm text-gray-500">03-08-2024</span>
            <div className="flex space-x-2">
              <button
                onClick={toggleUpdateForm}
                className="p-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="p-1 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <CategoryUpdateForm active={active} setActive={setActive} onUpdate={handleUpdate} navbar={navbar} />
      )}
    </div>
  );
};

export default VendorCategoryTile;


// import React from 'react'
// import useApi from '../../useApi/useApi'
// import { useState } from 'react';
// import { CategoryUpdateForm } from './CategoryUpdateForm';


// const VendorCategoryTile = ({navbar, onUpdate}) => {
//   const [active, setActive] = useState(0);
  
//   const {deleteData, fetchData}=useApi();


//   const deleteCat=async()=>{
//     const itemid=navbar._id
    
//     try {
//       const deletedData = await deleteData('NavBar', itemid)
//       console.log(deletedData)
//       fetchData('NavBar/view')
//       return deleteData
      
//     } catch (error) {
//       console.log(error.message)

      
//     } 
//   }





//   const toggleUpdateForm = () => {
//     setActive(active === 1 ? 0 : 1);
//   };
//   const handleUpdate = (updatedUser) => {
//     onUpdate(updatedUser);
//     toggleUpdateForm();
//   };
//   return (
//     <div className="w-full  bg-white border border-gray-200 rounded-md overflow-hidden">
//       {active === 0 ? (
//       <div className="flex items-center justify-between px-4 py-3">
//         <div className="flex items-center space-x-4">
//           <span className="text-sm font-medium text-gray-900">{navbar.CategoryName}</span>
//           <span className="text-sm font-medium text-gray-500">{navbar.Description}</span>
//         </div>
//         <div className="flex items-center space-x-4">
//           <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
//             {navbar.Status}
//           </span>
//           <span className="text-sm text-gray-500">03-08-2024</span>
//           <div className="flex space-x-2">
//             <button
//             onClick={toggleUpdateForm}
//               className="p-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               aria-label="Edit"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//               </svg>
//             </button>
//             <button onClick={deleteCat}
//               className="p-1 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//               aria-label="Delete"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>):(
//         <CategoryUpdateForm active={active} setActive={setActive} onUpdate{handleUpdate}/>
        
//       )}
//     </div>
//   )
// }

// export default VendorCategoryTile


