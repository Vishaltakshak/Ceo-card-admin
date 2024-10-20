
import './App.css'
import LoginBody from './Components/Login/LoginPage'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

import AfterLogin from './Pages/AterLogin/AfterLogin';



function App() {
  

  return (

    
      <Router>
        <Routes>
          <Route path="/" element={<LoginBody />} />
          <Route path="/after-login" element={<AfterLogin />} />
        </Routes>
      </Router>
  
    );


  
}

export default App


// import React from 'react'
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
// import './App.css'
// import LoginPage from './Components/Login/LoginPage'
// import AfterLogin from './Pages/AterLogin/AfterLogin'

// // Simulated authentication state
// const isAuthenticated = () => {
//   // In a real app, you'd check if the user is logged in
//   // For this example, we'll just return true
//   return true
// }

// // PrivateRoute component to protect routes
// const PrivateRoute = ({ children }) => {
//   return isAuthenticated() ? children : <Navigate to="/" replace />
// }

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route
//           path="/after-login"
//           element={
//             <PrivateRoute>
//               <AfterLogin />
//             </PrivateRoute>
//           }
//         />
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   )
// }