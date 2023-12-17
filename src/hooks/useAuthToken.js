import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const useAuthToken = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // Check if the user is authenticated and return the token
  const getAuthToken = () => {
    if (isAuthenticated) {
      // Assuming your AuthContext includes the token
      return localStorage.getItem("token") || "";
    }
    return "";
  };

  return { getAuthToken };
};

export default useAuthToken;
