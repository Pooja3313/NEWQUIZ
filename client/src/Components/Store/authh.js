import { createContext, useContext } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };
  const storeUserIDInLS = (serverUserid) => {
    return localStorage.setItem("userid", serverUserid);
  };
  const UserIDFROMLSGet= () => {
    return localStorage.getItem("userid");
  };
  // Function to clear token and user ID from local storage (logout)
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
  };
  return (
    <AuthContext.Provider value={{ storeTokenInLS, storeUserIDInLS, UserIDFROMLSGet, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};