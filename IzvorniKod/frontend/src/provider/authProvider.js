import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import AuthContext from "../context/authContext";

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));

  const setToken = (newToken) => {
    console.log(newToken);
    setToken_(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken_(null);
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      logout,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;