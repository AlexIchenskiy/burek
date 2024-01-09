import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Logout = () => {
  const { logout } = useAuth();

  logout();

  return <Navigate replace to="/home" />;
};

export default Logout;