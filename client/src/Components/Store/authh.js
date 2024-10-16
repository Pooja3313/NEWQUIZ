import { createContext, useContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  // const [userID, setUserID] = useState("");
  const [usertype, setUsertype] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  let isLoggedIn = !!token;
  // let isUsertype = !!usertype;
  // let isAdmin = usertype === "admin";
  console.log("isAdmins", isAdmin);
  // console.log("userID", userID)
  // console.log("isLoggedin ", isLoggedIn);
  // check when page refresh this useEffect useCallback(mount) and check localstorage token and update it
  useEffect(() => {
    const storedToken = TokenFROMLSGet();
    const storedIsAdmin = IsAdminFROMLSGet();
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedIsAdmin) {
      setIsAdmin(storedIsAdmin); // Set the isAdmin if found
      console.log("store authh file", isAdmin);
    }
  }, []);

  //function to stored the token in local storage Importtant
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };
  const storeUserIDInLS = (serverUserid) => {
    // setUserID(serverUserid);
    return localStorage.setItem("userid", serverUserid);
  };
  const UserIDFROMLSGet = () => {
    return localStorage.getItem("userid");
  };
  const TokenFROMLSGet = () => {
    return localStorage.getItem("token");
  };

  const UserTypeFROMLSGet = () => {
    return localStorage.getItem("usertype");
  };
  const IsAdminFROMLSGet = () => {
    return localStorage.getItem("isAdmin");
  };
  const StoreIsAdminINLS = (serverIsAdmin) => {
    setIsAdmin(serverIsAdmin); // important
    localStorage.setItem("isAdmin", serverIsAdmin);
  };
  // if our project 3-4 usertype then we usertype for authentication & given authorization
  const StoreUserTypeINLS = (serverUsertype) => {
    setUsertype(serverUsertype);
    localStorage.setItem("usertype", serverUsertype);
    // console.log("Stored usertype:",storeUserTypeINLS);
  };
  // Function to clear token and user ID from local storage (logout)
  const logout = () => {
    setToken("");
    // setUserID("");
    setIsAdmin(false); // Ensure isAdmin is set to false important
    setUsertype(""); // Clear usertype state
    localStorage.removeItem("usertype");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
  };

  return (
    <AuthContext.Provider
      value={{
        StoreIsAdminINLS,
        isAdmin,
        UserTypeFROMLSGet,
        StoreUserTypeINLS,
        TokenFROMLSGet,
        isLoggedIn,
        storeTokenInLS,
        storeUserIDInLS,
        UserIDFROMLSGet,
        logout,
      }}
    >
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
