import React, { useState } from 'react'; // Import useState
import SubHeader from '../../Components/Header/SubHeader';
import UserManagement from '../../Components/User/UsersTiles';
import AddNewForm from '../../Components/User/AddNew';

const UserPage = () => {
  const [form, setForm] = useState(0); 
  const toggleNewForm = () => {
    setForm(form === 1 ? 0 : 1);
  };

  return (
    <div>

      <SubHeader toggleForm={toggleNewForm} />
      <hr />
      {form === 0 ? (
        <UserManagement />
      ) : (
        <AddNewForm form={form} setForm={setForm} />
       
      )}
    </div>
  );
};

export default UserPage;