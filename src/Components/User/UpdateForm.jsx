import { useState, useEffect, useRef } from "react";
import { ChevronDown, Upload, Users } from "lucide-react";
import useApi from "../../useApi/useApi";
import formatDate from "../../utility/FormatDate";
export const UpdateForm = ({ userId, setActive, onUpdate }) => {
  const { addData, updateData, findData, UploadImage } = useApi();
  const [formData, setFormData] = useState({
    Name: "",
    Mail: "",
    Password: "",
    ConfirmPassword: "",
    MobileNumber: "",
    Role: "User",
    DOB: "",
    LinkedinProfile: "",
    CompanyName: "",
    ProfessionalTitle: "",
    Status: "Active",
    UserType: "Regular User",
    UserImage: null,
    Currency: "USD",
    Language: "English",
  });
  const [fileName, setFileName] = useState("No file chosen");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await findData("user/view", userId);
        if (response?.data?.Users) {
          const userData = response.data.Users;
          setFormData((prevState) => ({
            ...prevState,
            Name: userData.Name || "",
            Mail: userData.Mail || "",
            MobileNumber: userData.MobileNumber || "",
            Role: userData.Role || "User",
            DOB: formatDate(userData.DOB), // Format DOB here
            LinkedinProfile: userData.LinkedinProfile || "",
            CompanyName: userData.CompanyName || "",
            ProfessionalTitle: userData.ProfessionalTitle || "",
            Status: userData.Status || "Active",
            UserType: userData.UserType || "Regular User",
            Currency: userData.Currency,
            Language: userData.Language,
            UserImage: userData.UserImage || null,
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, UserImage: file }));
      setFileName(file.name);
    }
  };

  const validateForm = () => {
    if (!formData.Name || !formData.Mail || !formData.Role) {
      alert("Please fill out all required fields.");
      return false;
    }
   
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let uploadedImageUrl = formData.UserImage;

      if (formData.UserImage && typeof formData.UserImage !== "string") {
        const imageData = new FormData();
        imageData.append("image", formData.UserImage);
        const response = await UploadImage("user/upload", imageData);
        if (response?.data?.UserImage) {
          uploadedImageUrl = response.data.UserImage;
        }
      }

      const payload = { ...formData, UserImage: uploadedImageUrl };

      if (userId) {
        await updateData("user/update", userId, payload);
        onUpdate(payload);
        setActive(0);
      } else {
        await addData("user/add", payload);
      }
    } catch (err) {
      setError("An error occurred while submitting the form.");
      console.error(err);
    }
  };

  const handleCancel = () => setActive(0);

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ['Name', 'Full Name'],
              ['Mail', 'Email address'],
              ['Password', 'Password'],
              ['ConfirmPassword', 'Confirm Password'],
              ['MobileNumber', 'Mobile Number'],
              ['LinkedinProfile', 'LinkedIn Profile (URL)'],
              ['CompanyName', 'Company Name'],
              ['ProfessionalTitle', 'Professional Title'],
              ['Currency','Currency'],
              ['Language','Language']
            ].map(([key, label]) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={key === 'Mail' ? 'email' : key.includes('Password') ? 'password' : 'text'}
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option>User</option>
                  <option>Admin</option>
                  <option>Manager</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="Status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="relative">
                <select
                  id="Status"
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="UserType" className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
              <div className="relative">
                <select
                  id="UserType"
                  name="UserType"
                  value={formData.UserType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option>Regular User</option>
                  <option>System Admin</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label htmlFor="DOB" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <div className="relative">
                <input
                  type="date"
                  id="DOB"
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="UserImage" className="block text-sm font-medium text-gray-700 mb-1">User Image</label>
            <div className="flex items-center">
              <label htmlFor="UserImage" className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                <Upload className="h-5 w-5 inline-block mr-2" />
                Choose File
              </label>
              <input  id="UserImage" name="UserImage" type="file" onChange={handleFileChange} className="sr-only" />
              <span className="ml-3 text-sm text-gray-500">{fileName}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
          <button type="button" onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Cancel
            </button>
            <button type="button" onClick={handleChange}
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
};







