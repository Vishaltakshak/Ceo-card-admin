
import { useEffect } from 'react';
import useApi from '../../useApi/useApi';
import { useState } from 'react';
import ServiceTile from './ServiceTile';



const ServiceProviderTIles = () => {
    const { data: loading, error, fetchData, deleteData } = useApi();
  const [users, setUsers] = useState([]);


  useEffect(() => {
    getSubCat();
  }, []);
  
  const getSubCat = async () => {
    try {
      const response = await fetchData('subnav/link/view');
      

      setUsers(response.data.Data || []);
      console.log('service',response)
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
        await deleteData('subnav/link/delete', id);
        getSubCat() 
        
        // setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
       
    } catch (err) {
        console.error("Error deleting user:", err);
    }
};

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

  return (
    <div  className="max-h-[70vh] overflow-y-auto">
      <div className="flex pl-2.5">
        <div className='w-1/6'><strong>Provider Name</strong></div>
        <div className='w-1/6'><strong>Category</strong></div>
        <div className='w-1/6'><strong>Sub Category</strong></div>
        <div className='w-1/6'><strong>Banner</strong></div>
        <div className='w-1/6'><strong>Website</strong></div>
        <div className='w-1/6'><strong>Status</strong></div>
        <div className='w-1/6'><strong>Actions</strong></div>

      </div>
      {users.length === 0 ? (
        <div>No users found</div>
      ) : (
        users.map(user => (
          <ServiceTile
            key={user._id} 
            service={user} 
            onUpdate={handleUserUpdate}
            DeleteData={DeleteData}
            
          />
        ))
      )}
    </div>
  );
 
}

export default ServiceProviderTIles;
