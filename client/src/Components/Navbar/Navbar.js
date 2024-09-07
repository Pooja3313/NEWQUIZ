import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Store/authh";

const Navbar = () => {
  const { isLoggedIn,isAdmin  } = useAuth();
  console.log("login or not ", isLoggedIn);
   console.log("Current usertype:", isAdmin);

  return (
    <>
      <header
        id="header"
        className="header d-flex align-items-center sticky-top"
      >
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <NavLink
            to="index.html"
            className="logo d-flex align-items-center me-auto"
          >
            {/* <!-- Uncomment the line below if you also wish to use an image logo --> */}

            <h1 className="sitename">QuiZTask</h1>
          </NavLink>

          <nav id="navmenu" className="navmenu">
            <ul>
              {isAdmin? (
                <li>
                  <NavLink to="/user">UserDetails</NavLink>
                </li>
              ) : ( 
                <li>
                  <NavLink to="/addtask"> Addtask </NavLink>
                </li>
              )} 

              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </>
              )}

              <li>
                <NavLink to="#">Pricing</NavLink>
              </li>
            </ul>
          </nav>

          <NavLink className="btn-getstarted" to="/joblist">
            Joblist
          </NavLink>
        </div>
      </header>
    </>
  );
};
export default Navbar;
