import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../Store/authh";



const Login = () => {
  const navigate = useNavigate();

  const { storeTokenInLS, storeUserIDInLS } = useAuth();

  const [user, setUser] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("api/authh/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("after login: ", responseData);
        toast.success("Login Successful");
        storeTokenInLS(responseData.token);
        storeUserIDInLS(responseData.userId);
        navigate("/addtask");
      }
    } catch (error) {
      console.log("pooja", error);
    }
  };

  return (
    <>
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Login to Your Account
                    </h5>
                    <p className="text-center small">
                      Enter your email-id & password to login
                    </p>
                  </div>

                  <form className="row g-3">
                    <div className="col-12">
                      <label for="yourUsername" className="form-label">
                        Email-Id
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="yourUsername"
                        required
                        value={user.email}
                        onChange={handleInput}
                      />
                    </div>

                    <div className="col-12">
                      <label for="yourPassword" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="yourPassword"
                        required
                        value={user.password}
                        onChange={handleInput}
                      />
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100"
                        type="submit"
                        onClick={loginUser}
                      >
                        Login
                      </button>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">
                        Don't have account?{" "}
                        <a href="/">Create an account</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
