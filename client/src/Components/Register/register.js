import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const PostData = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("/api/authh/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("response data : ", response);

      if (response.ok) {
        const responseData = await response.json();
        toast.success("registration successful");
        setUser({ name: "", email: "", phone: "", password: "" ,cpassword: ""});
        console.log(responseData);
        navigate("/login");
      } else {
        console.log("error inside response ", "error");
        
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">
              
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Create an Account
                    </h5>
                    <p className="text-center small">
                      Enter your personal details to create account
                    </p>
                  </div>

                  <form className="row g-3 " method="POST">
                    <div className="col-12">
                      <label for="yourName" className="form-label">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="yourName"
                        required
                        value={user.name}
                        onChange={handleInput}
                      />
                    </div>

                    <div className="col-6">
                      <label for="yourEmail" className="form-label">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="yourEmail"
                        required
                        value={user.email}
                        onChange={handleInput}
                      />
                    </div>
                    <div className="col-12">
                      <label for="yourEmail" className="form-label">
                        Your Contact
                      </label>
                      <input
                        type="number"
                        name="phone"
                        className="form-control"
                        id="yourContact"
                        required
                        value={user.phone}
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
                      <label for="yourPassword" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="cpassword"
                        className="form-control"
                        id="yourPassword"
                        required
                        value={user.cpassword}
                        onChange={handleInput}
                      />
                    </div>
                    
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100"
                        type="submit"
                        onClick={PostData}
                      >
                        Create Account
                      </button>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">
                        Already have an account? <a href="/Login">Log in</a>
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

export default Register;
