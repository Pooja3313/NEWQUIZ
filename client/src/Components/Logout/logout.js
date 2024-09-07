import { useEffect } from "react";
import { useAuth } from "../Store/authh";
import { Navigate } from "react-router-dom";


export const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/login" />;
};