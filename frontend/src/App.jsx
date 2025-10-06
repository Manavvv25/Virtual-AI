import React, { useContext } from 'react'
import SignIn from './pages/SignIn'
import Signup from './pages/Signup'
import Customize from './pages/Customize'
import Customize2 from './pages/Customize2'
import { userDataContext } from './context/userContext'
import Home from './pages/Home'
import { Routes, Route, Navigate } from 'react-router-dom'


function App() {
  const {userData,setUserData}=useContext(userDataContext);
  return (
    <Routes>
  <Route path="/" element={userData ? <Home /> : <Navigate to="/customize" />  } />
  <Route path="/signup" element={!userData ? <Signup /> : <Navigate to="/customize" />} />
  <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to="/" />} />
  <Route path="/customize" element={userData ? <Customize /> : <Navigate to="/signup" /> } />
  <Route path="/customize2" element={userData ? <Customize2 /> : <Navigate to="/signup" />} />
</Routes>

  )
} 

export default App