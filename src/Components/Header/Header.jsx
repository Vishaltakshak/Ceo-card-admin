import React, { useEffect, useState } from 'react';
import { Menu, RotateCcw, User, Phone, Mail, LogOut, Lock } from 'lucide-react';
import useApi from '../../useApi/useApi';
import { useNavigate } from 'react-router-dom';

export const Header = ({ userId }) => {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState({
    Name: '',
    Mail: '',
    MobileNumber: '',
    Password: '',
    ConfirmPassword: ''
  });
  
  const { findData, updateData } = useApi();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await findData(`user/view`, userId);
        if (response && response.data && response.data.Users) {
          const fetchedUserData = response.data.Users;
          console.log('Fetched user data:', fetchedUserData);
          
          setUserData({
            Name: fetchedUserData.Name || '',
            Mail: fetchedUserData.Mail || '',
            MobileNumber: fetchedUserData.MobileNumber || '',
            Password: '',
            ConfirmPassword: ''
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const toggleForm = () => setShowForm(!showForm);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (userId) {
        // Create FormData object
        const formPayload = new FormData();
        
        Object.keys(userData).forEach(key => {
          if (userData[key]) { // Only append non-empty values
            formPayload.append(key, userData[key]);
          }
        });

        const updatedUser = await updateData('user/update', userId, formPayload);
        console.log('User data updated successfully', updatedUser);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSignOut = () => {
    navigate('/')

    console.log('Signing out...');
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-[#3088B1] text-white w-full absolute">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">CEO Card</h1>
        <Menu className="w-6 h-6 cursor-pointer" />
      </div>
      
      <div className="flex items-center gap-4 relative">
        <RotateCcw className="w-6 h-6 cursor-pointer" />
        <div className="flex items-center gap-2 cursor-pointer" onClick={toggleForm}>
          <User className="w-5 h-5 text-gray-400 mr-2" />
          <span className="font-medium">Subadmin</span>
        </div>
        
        {showForm && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10">
            <form className="p-4 space-y-4" onSubmit={handleSubmit}>
              <div className="flex items-center border-b border-gray-200 pb-2">
                <input 
                  type="text" 
                  name="Name"
                  placeholder="Full Name" 
                  className="w-full text-gray-700 focus:outline-none"
                  value={userData.Name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center border-b border-gray-200 pb-2">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                <input 
                  type="tel" 
                  name="MobileNumber"
                  placeholder="Mobile Number" 
                  value={userData.MobileNumber}
                  className="w-full text-gray-700 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center border-b border-gray-200 pb-2">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <input 
                  type="email" 
                  name="Mail"
                  placeholder="Email" 
                  value={userData.Mail}
                  className="w-full text-gray-700 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              
              <hr className="border-t border-gray-200" />
              
              <div className="text-gray-700 font-medium">Change Password</div>
              
              <div className="flex items-center border-b border-gray-200 pb-2">
                <Lock className="w-5 h-5 text-gray-400 mr-2" />
                <input 
                  type="password" 
                  name="Password"
                  placeholder="New Password" 
                  value={userData.Password}
                  className="w-full text-gray-700 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center border-b border-gray-200 pb-2">
                <Lock className="w-5 h-5 text-gray-400 mr-2" />
                <input 
                  type="password" 
                  name="ConfirmPassword"
                  placeholder="Confirm Password" 
                  value={userData.ConfirmPassword}
                  className="w-full text-gray-700 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex justify-between">
                {/* <button 
                  type="submit" 
                  className="px-2 py-2 bg-[#3088B1] text-white rounded hover:bg-[#2a7a9d] transition-colors"
                >
                  Submit
                </button> */}
                <button 
                  type="button" 
                  onClick={handleSignOut}
                  className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};


// import React, { useEffect, useState } from 'react';
// import { Menu, RotateCcw, User, Phone, Mail, LogOut, Lock } from 'lucide-react';
// import useApi from '../../useApi/useApi';

// export const Header = ({userId}) => {
//   const [showForm, setShowForm] = useState(false);
//   const[User, setUser]=useState([]);
//   const{findData,updateData}=useApi();
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await findData(`user/view`, userId);
//         if (response && response.data && response.data.Users) {
//           const userData = response.data.Users;
//           console.log('Fetched user data:', userData);
          
//           setUser(prevState => ({
//             ...prevState,
//             Name: userData.Name || '',
//             Mail: userData.Mail || '',
//             MobileNumber: userData.MobileNumber || '',
//             Password: userData.Password,
//             ConfirmPassword: userData.ConfirmPassword
            
//           }));
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     if (userId) {
//       fetchUserData();
//     }
//   }, [userId]);

//   const toggleForm = () => setShowForm(!showForm);


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formPayload = new User();
    
//     Object.keys(User).forEach(key => {
//       if (User[key] !== null) {
//         formPayload.append(key, User[key]);
//       }
//     });

//     try {
//       if (userId) {
//         const updatedUser = await updateData('user/update', userId, formPayload);
//         console.log('User data updated successfully', updatedUser);
//       }
//     } catch (error) {
//       console.error('Error submitting data:', error);
//     }
//   };


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSignOut = () => {
    
//     console.log('Signing out...');
//   };
  

//   return (
//     <header className="flex items-center justify-between px-4 py-2 bg-[#3088B1] text-white w-full absolute">
//       <div className="flex items-center gap-4">
//         <h1 className="text-xl font-semibold">CEO Card</h1>
//         <Menu className="w-6 h-6 cursor-pointer" />
//       </div>
      
//       <div className="flex items-center gap-4 relative">
//         <RotateCcw className="w-6 h-6 cursor-pointer" />
//         <div className="flex items-center gap-2 cursor-pointer" onClick={toggleForm}>
//         <User className="w-5 h-5 text-gray-400 mr-2" />
//           <span className="font-medium">Subadmin</span>
//         </div>
        
//         {showForm && (
//           <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10">
//             <form className="p-4 space-y-4">
//               <div className="flex items-center border-b border-gray-200 pb-2">
//                 <div className="w-5 h-5 text-gray-400 mr-2" />
//                 <input 
//                   type="text" 
//                   placeholder="Full Name" 
//                   defaultValue="Subadmin"
//                   className="w-full text-gray-700 focus:outline-none"
//                   value={User.Name}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="flex items-center border-b border-gray-200 pb-2">
//                 <Phone className="w-5 h-5 text-gray-400 mr-2" />
//                 <input 
//                   type="tel" 
//                   placeholder="Mobile Number" 
//                   defaultValue="8888888888"
//                   value={User.MobileNumber}
//                   className="w-full text-gray-700 focus:outline-none"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="flex items-center border-b border-gray-200 pb-2">
//                 <Mail className="w-5 h-5 text-gray-400 mr-2" />
//                 <input 
//                   type="email" 
//                   placeholder="Email" 
//                   defaultValue="subadmin@ceocard.com"
//                   value={User.Mail}
//                   className="w-full text-gray-700 focus:outline-none"
//                   onChange={handleChange}
//                 />
//               </div>
              
//               <hr className="border-t border-gray-200" />
              
//               <div className="text-gray-700 font-medium">Change Password</div>
              
//               <div className="flex items-center border-b border-gray-200 pb-2">
//                 <Lock className="w-5 h-5 text-gray-400 mr-2" />
//                 <input 
//                   type="password" 
//                   placeholder="New Password" 
//                   className="w-full text-gray-700 focus:outline-none"
                  
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="flex items-center border-b border-gray-200 pb-2">
//                 <Lock className="w-5 h-5 text-gray-400 mr-2" />
//                 <input 
//                   type="password" 
//                   placeholder="Confirm Password" 
//                   className="w-full text-gray-700 focus:outline-none"
//                   onChange={handleChange}
//                 />
//               </div>
              
//               <div className="flex justify-between">
//                 <button 
//                 onClick={handleSubmit}
//                   type="submit" 
//                   className="px-2 py-2 bg-[#3088B1] text-white rounded hover:bg-[#2a7a9d] transition-colors"
//                 >
//                   Submit
//                 </button>
//                 <button 
//                   type="button" 
//                   onClick={handleSignOut}
//                   className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center"
//                 >
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Sign Out
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }