/* eslint-disable react/prop-types */




import  { useState, } from 'react';
import {  ChevronDown, Upload, Users } from 'lucide-react';
import useApi from '../../useApi/useApi';

export default function AddNewForm({ setForm }) {
  const { addData,UploadImage } = useApi();
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
    UserImage: '',
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







const handleImgChange=(e)=>{
  const file = e.target.files[0]
  if(!file){
    alert("file not uploaded")
  }
  if(!file.size>10*1024*1024){
    alert("file size too big")
  }
  setFormData(prevState=>({
    ...prevState,
    UserImage:file

  }))
  setFileName(file.name)

}






  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError('');

    if (!validateForm()) {
     alert('Form validation failed');
      return;
    }
    var ImgUrl= null;
    try {
      const ImageData = new FormData;
      if(!formData.UserImage){
        console.log("no image file")
      }else{
        ImageData.append("image",formData.UserImage)
      }
      try {
        const response = await UploadImage("user/upload",ImageData)
      
        if (response?.fileUrl) {
          ImgUrl = await response.fileUrl;
          console.log("img urk",ImgUrl)
        } else {
          throw new Error('Failed to retrieve uploaded image URL');
        }
        
      } catch (error) {
        console.log(error)
        
      }

      
      const formPayload = { ...formData, UserImage: ImgUrl};

      const response = await addData('user/add', formPayload);
      
      if (response?.data) {
        console.log('New user added successfully', response.data);
        alert('User added successfully!');
        handleReset();
        setForm(0);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setBackendError(`Error adding user: ${error.message}`);
    }
  };

  const handleCancel = () => setForm(0);
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



//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     console.log("Selected file:", file); // Debug log
    
//     if (file) {
//         // Basic validation
//         if (!file.type.startsWith('image/')) {
//             alert('Please upload an image file');
//             return;
//         }
        
//         if (file.size > 5 * 1024 * 1024) {
//             alert('File size must be less than 5MB');
//             return;
//         }

//         // Create new FormData instance specifically for the file
//         const fileFormData = new FormData();
//         fileFormData.append('image', file);
        
//         // Log the FormData contents to verify
//         console.log("FormData content:", fileFormData.get('image'));
        
//         setFormData(prevState => ({ 
//             ...prevState, 
//             UserImage: file  // Store the actual file object
//         }));
//         setFileName(file.name);
//     } else {
//         setFormData(prevState => ({ ...prevState, UserImage: null }));
//         setFileName('No file chosen');
//     }
// };

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
              <input id="UserImage" name="UserImage" type="file"   onChange={handleImgChange} className="sr-only" />
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