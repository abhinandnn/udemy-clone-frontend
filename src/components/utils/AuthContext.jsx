
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
const navigate=useNavigate();

  const [user, setUser] = useState();
  const [loginStatus,setLogin]=useState(false)
  const getData = async (config) => {
    try {
      console.log("loading")
      const response = await  axios.get('/',config);
      setUser(response.data.data.user);
      setLogin(true);
      console.log(response);
    } catch (error) {
      console.log('err_',error.response.status);
      if(error.response.status===401)
      logout();
    }
  };
  const login = (token) => {
  localStorage.setItem("authId",token);
  const config = { headers: {'Authorization':`Bearer ${token}`}, withCredentials: false }
        getData(config);
  };

  const logout = () => {
    setUser(null);
    setLogin(false);
    localStorage.removeItem('authId')
    navigate('/login')
  };
  const config = { headers: {'Authorization':`Bearer ${localStorage.getItem('authId')}`}, withCredentials: false }
 
  useEffect(() => {
    getData(config);
  },[]);
  const reload=()=>{
    getData(config);
  }
  console.log('hi',user);

  return (
    <AuthContext.Provider value={{ user, login, logout, loginStatus,reload}}>
      {children}
    </AuthContext.Provider>
  );
};
