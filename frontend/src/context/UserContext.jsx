import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export const userDataContext = createContext();

function UserContext({ children }) {
  const serverurl = "http://localhost:8000";
  const [userData, setUserData] = useState({ user: {} });
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleCurrentUser = async () => {
    try {
      const result=await axios.get(`${serverurl}/api/user/current`,{withCredentials:true});
      setUserData(result.data.user);
      console.log(result.data.user);
    } catch (error) {
      console.error(error);
    }
  }
  const getGeminiResponse=async (command) => {
    try {
      const result = await axios.post(`${serverurl}/api/user/asktoassistant`, { command }, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error(error);
    }
    
  }








  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = { serverurl, userData, setUserData,frontendImage,setFrontendImage,backendImage,setBackendImage,selectedImage,setSelectedImage,getGeminiResponse };
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
