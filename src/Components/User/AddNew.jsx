// import React, { useState, useEffect } from 'react';
// import { Calendar, ChevronDown, Upload, Users } from 'lucide-react';
// import useApi from '../../useApi/useApi';

// export const AddNewForm = ({ userId, form, setForm }) => {
//   const { addData } = useApi();
//   const [formData, setFormData] = useState({
//     Name: '',
//     Mail: '',
//     Password: '',
//     ConfirmPassword: '',
//     MobileNumber: '',
//     Role: '',
//     DOB: '',
//     LinkedinProfile: '',
//     CompanyName: '',
//     ProfessionalTitle: '',
//     Status: '',
//     UserType: '',
//     UserImage: '',
//   });

//   const [fileName, setFileName] = useState('No file chosen');

 

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData(prevState => ({ ...prevState, UserImage: file }));
//     setFileName(file ? file.name : 'No file chosen');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formPayload = new FormData();
    
//     Object.keys(formData).forEach(key => {
//       if (formData[key] !== null) {
//         formPayload.append(key, formData[key]);
//       }
//     });

//     try {
      
//         const data = await addData('user/add', formPayload);
//         console.log('New user added successfully', data);
        
//         handleCancel()
//         return data
      
//     } catch (error) {
//       console.error('Error submitting data:', error);
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       Name: '',
//       Mail: '',
//       Password: '',
//       ConfirmPassword: '',
//       MobileNumber: '',
//       Role: 'User',
//       DOB: '',
//       LinkedinProfile: '',
//       CompanyName: '',
//       ProfessionalTitle: '',
//       Status: 'Active',
//       UserType: 'Regular User',
//       UserImage: null,
//     });
//     setFileName('No file chosen');
//   };
//   const handleCancel=()=>{
//     setForm(0)

//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="px-6 py-4 bg-gray-800 text-white flex items-center">
//           <Users className="h-6 w-6 mr-2" />
//           <h1 className="text-xl font-bold">User Management</h1>
//           <span className="ml-2 text-sm">Add / Edit User</span>
//         </div>
//         <form className="p-6" onSubmit={handleSubmit}>
//           <h2 className="text-lg font-semibold mb-6">Enter User Details</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[
//               ['Name', 'Full Name'],
//               ['Mail', 'Email address'],
//               ['Password', 'Password'],
//               ['ConfirmPassword', 'Confirm Password'],
//               ['MobileNumber', 'Mobile Number'],
//               ['LinkedinProfile', 'LinkedIn Profile (URL)'],
//               ['CompanyName', 'Company Name'],
//               ['ProfessionalTitle', 'Professional Title']
//             ].map(([key, label]) => (
//               <div key={key}>
//                 <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//                 <input
//                   type={key === 'Mail' ? 'email' : key.includes('Password') ? 'password' : 'text'}
//                   id={key}
//                   name={key}
//                   value={formData[key]}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             ))}
            
//             <div>
//               <label htmlFor="Role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//               <div className="relative">
//                 <select
//                   id="Role"
//                   name="Role"
//                   value={formData.Role}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
//                 >
//                   <option>User</option>
//                   <option>Admin</option>
//                   <option>Manager</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="Status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//               <div className="relative">
//                 <select
//                   id="Status"
//                   name="Status"
//                   value={formData.Status}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
//                 >
//                   <option>Active</option>
//                   <option>Inactive</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="UserType" className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
//               <div className="relative">
//                 <select
//                   id="UserType"
//                   name="UserType"
//                   value={formData.UserType}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
//                 >
//                   <option>Regular User</option>
//                   <option>System Admin</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               </div>
//             </div>
            
//             <div>
//               <label htmlFor="DOB" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   id="DOB"
//                   name="DOB"
//                   value={formData.DOB}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mt-6">
//             <label htmlFor="UserImage" className="block text-sm font-medium text-gray-700 mb-1">User Image</label>
//             <div className="flex items-center">
//               <label htmlFor="UserImage" className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
//                 <Upload className="h-5 w-5 inline-block mr-2" />
//                 Choose File
//               </label>
//               <input id="UserImage" name="UserImage" type="file" onChange={handleFileChange} className="sr-only" />
//               <span className="ml-3 text-sm text-gray-500">{fileName}</span>
//             </div>
//           </div>

//           <div className="mt-8 flex justify-end space-x-4">
//           <button type="button" onClick={handleCancel}
//                     className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
//               Cancel
//             </button>
//             <button type="button" onClick={handleReset}
            
//                     className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
//               Reset
//             </button>
//             <button type="submit" onClick={handleSubmit}
//                     className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };


// 



import React, { useState } from 'react';
import { Calendar, ChevronDown, Upload, Users } from 'lucide-react';
import useApi from '../../useApi/useApi';

export default function AddNewForm({ setForm }) {
  const { addData } = useApi();
  const [formData, setFormData] = useState({
    Name: '',
    Mail: '',
    Password: '',
    ConfirmPassword: '',
    MobileNumber: '',
    Role: 'User',
    DOB: '',
    LinkedinProfile: '',
    CompanyName: '',
    ProfessionalTitle: '',
    Status: 'Active',
    UserType: 'Regular User',
    UserImage: null,
  });

  const [fileName, setFileName] = useState('No file chosen');
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({ ...prevState, UserImage: file }));
    setFileName(file ? file.name : 'No file chosen');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Name.trim()) newErrors.Name = 'Name is required';
    else if (formData.Name.trim().length < 5) newErrors.Name = 'Name must be at least 5 characters long';

    if (!formData.Mail.trim()) newErrors.Mail = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.Mail)) newErrors.Mail = 'Invalid email format';
    else if (formData.Mail.trim().length < 8) newErrors.Mail = 'Email must be at least 8 characters long';

    if (!formData.Password) newErrors.Password = 'Password is required';
    else if (formData.Password.length < 8) newErrors.Password = 'Password must be at least 8 characters long';

    if (formData.Password !== formData.ConfirmPassword) newErrors.ConfirmPassword = 'Passwords do not match';
    else if (formData.ConfirmPassword.length < 8) newErrors.ConfirmPassword = 'Confirm Password must be at least 8 characters long';

    if (!formData.MobileNumber) newErrors.MobileNumber = 'Mobile number is required';

    if (!formData.DOB) newErrors.DOB = 'Date of Birth is required';

    if (!formData.CompanyName.trim()) newErrors.CompanyName = 'Company Name is required';
    else if (formData.CompanyName.trim().length < 10) newErrors.CompanyName = 'Company Name must be at least 10 characters long';

    if (!formData.ProfessionalTitle.trim()) newErrors.ProfessionalTitle = 'Professional Title is required';
    else if (formData.ProfessionalTitle.trim().length < 10) newErrors.ProfessionalTitle = 'Professional Title must be at least 10 characters long';

    if (!formData.UserType) newErrors.UserType = 'User Type is required';
    else if (formData.UserType.trim().length < 5) newErrors.UserType = 'User Type must be at least 5 characters long';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError('');
  
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }
  
    const formPayload = new FormData();
    
    Object.keys(formData).forEach(key => {
        formPayload.append(key, formData[key]);
      
    });
  
    try {
      console.log('Submitting form data:', Object.fromEntries(formPayload));
      console.log("response is", formPayload)
      const response = await addData('user/add', Object.fromEntries(formPayload));
  
      if (response && response.data) {
        console.log('New user added successfully', response.data);
        alert('User added successfully!');
        handleReset();
        setForm(0);
      } else {
        console.error('Error: Response or response.data is undefined');
        setBackendError('Error adding user. Please check server logs for more details.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setBackendError(`Error adding user: ${error.message}. Please check server logs for more details.`);
    }
  };
  const handleReset = () => {
    setFormData({
      Name: '',
      Mail: '',
      Password: '',
      ConfirmPassword: '',
      MobileNumber: '',
      Role: 'User',
      DOB: '',
      LinkedinProfile: '',
      CompanyName: '',
      ProfessionalTitle: '',
      Status: 'Active',
      UserType: 'Regular User',
      UserImage: null,
    });
    setFileName('No file chosen');
    setErrors({});
    setBackendError('');
  };

  const handleCancel = () => {
    setForm(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-800 text-white flex items-center">
          <Users className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-bold">User Management</h1>
          <span className="ml-2 text-sm">Add / Edit User</span>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-6">Enter User Details</h2>
          {backendError && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {backendError}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ['Name', 'Full Name'],
              ['Mail', 'Email address'],
              ['Password', 'Password'],
              ['ConfirmPassword', 'Confirm Password'],
              ['MobileNumber', 'Mobile Number'],
              ['DOB', 'Date of Birth'],
              ['LinkedinProfile', 'LinkedIn Profile (URL)'],
              ['CompanyName', 'Company Name'],
              ['ProfessionalTitle', 'Professional Title']
            ].map(([key, label]) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={key === 'Mail' ? 'email' : key.includes('Password') ? 'password' : key === 'DOB' ? 'date' : 'text'}
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors[key] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors[key] && <p className="mt-1 text-sm text-red-500">{errors[key]}</p>}
              </div>
            ))}
            
            <div>
              <label htmlFor="Role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="relative">
                <select
                  id="Role"
                  name="Role"
                  value={formData.Role}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.Role ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none`}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.Role && <p className="mt-1 text-sm text-red-500">{errors.Role}</p>}
            </div>

            <div>
              <label htmlFor="Status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="relative">
                <select
                  id="Status"
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.Status ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.Status && <p className="mt-1 text-sm text-red-500">{errors.Status}</p>}
            </div>

            <div>
              <label htmlFor="UserType" className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
              <div className="relative">
                <select
                  id="UserType"
                  name="UserType"
                  value={formData.UserType}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.UserType ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none`}
                >
                  <option value="Regular User">Regular User</option>
                  <option value="System Admin">System Admin</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.UserType && <p className="mt-1 text-sm text-red-500">{errors.UserType}</p>}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="UserImage" className="block text-sm font-medium text-gray-700 mb-1">User Image</label>
            <div className="flex items-center">
              <label htmlFor="UserImage" className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                <Upload className="h-5 w-5 inline-block mr-2" />
                Choose File
              </label>
              <input id="UserImage" name="UserImage" type="file" onChange={handleFileChange} className="sr-only" />
              <span className="ml-3 text-sm text-gray-500">{fileName}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button type="button" onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Cancel
            </button>
            <button type="button" onClick={handleReset}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Reset
            </button>
            <button type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}