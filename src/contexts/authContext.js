import React, { useState, createContext, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { login, signup } from "../api/tmdb-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingToken = window.localStorage.getItem("token");
      if (existingToken) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  //Function to put JWT token in local storafe
  const setToken = (data) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", data);
    }
  };

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