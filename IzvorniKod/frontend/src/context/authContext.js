import { createContext } from "react";

const AuthContext = createContext(localStorage.getItem('token') || '');

export default AuthContext;