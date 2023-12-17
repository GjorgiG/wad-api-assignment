import React, { useState, createContext, useCallback } from "react";
import PropTypes from "prop-types";
import { login, signup } from "../api/tmdb-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  // const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    // setAuthToken(data);
  }

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      setUserName(username);
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    console.log(result.code);
    return (result.code == 201) ? true : false;
  };

  const signout = useCallback(() => {
    console.log("Signing out..."); // Check if this log appears
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;