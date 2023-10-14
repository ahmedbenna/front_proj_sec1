import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSnackbar } from '../context/SnackbarProvider';
import { json, redirect, useNavigate } from 'react-router-dom';
import useApi from '../hocks/useApi';
// Create an AuthContext
export const AuthContext = createContext();


// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create an AuthProvider component
export const AuthProvider = ({ children }) => {
  const { get, data } = useApi()
  const showSnackbar = useSnackbar();
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  // const navigate = useNavigate();
  useEffect(() => {
    const getCurentUser =  () => {
       setToken(JSON.parse(localStorage.getItem('token')))
       setUser(JSON.parse(localStorage.getItem('user')))
    }
    getCurentUser()
  }, []);

  const login = async (values) => {

    try {
      let response = await axios.post('auth/', { email: values.email, password: values.password });
      console.log(response)
      await setUser(response.data.user);
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setIsAuthenticated(true);
      // if (user.role=='admin') {
      //   return redirect("/dashboard");
      // }
      // else {
        // redirect("/dashboard");
      // }
    } catch (err) {
      console.error(err)
    }
  };

  const logout = async () => {
    try {
      let response = await axios.get('logout/');
      console.log(response)
      setToken(null)
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      redirect("/login");
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
