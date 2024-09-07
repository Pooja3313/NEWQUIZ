import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";

const Register = () => {
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  // console.log("user:", user);
  const handleInput = (e) => {
    console.log(e);
    let { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0) {
  //     console.log(user);
  //   }
  // }, [formErrors]);

  const validate = (values) => {
    const errors = {};
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

    if (!values.name) {
      errors.name = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.phone) {
      errors.phone = "phone is required!";
    } else if (values.phone.length !== 10) {
      errors.phone = "Phone number must be exactly 10 digits!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    if (!values.cpassword) {
      errors.cpassword = "Password is required";
    } else if (values.cpassword !== values.password) {
      errors.cpassword = "Passwords do not match!";
    }
    return errors;
  };

  const PostData = async (e) => {
    e.preventDefault();
    // setFormErrors(validate(user));
    // setIsSubmit(true);
    const validationErrors = validate(user);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("/api/authh/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const responseData = await response.json();
        if (response.ok) {
          toast.success("Registration successful");
          setUser({
            name: "",
            email: "",
            phone: "",
            password: "",
            cpassword: "",
            usertype:"",
            secretKey:"",
          });

          navigate("/login");
        } else {
          toast.error("Registration failed");
        }
      } catch (error) {
        console.error("Error", error);
        toast.error("An error occurred. Please try again.");
      }
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
                      <p className="text-danger">{formErrors.name}</p>
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
                      <p className="text-danger">{formErrors.email}</p>
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
                      <p className="text-danger">{formErrors.phone}</p>
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
                      <p className="text-danger">{formErrors.password}</p>
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
                      <p className="text-danger">{formErrors.cpassword}</p>
                    </div>

                    <div className="col-12">
                      <label for="userType" className="form-label">
                        User Type
                      </label>
                      <div className="row">
                        <div class="form-check col-lg-6">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="usertype"
                            id="user"
                            value="user"
                            onChange={handleInput}
                          />
                          <label class="form-check-label" for="userType">
                            User
                          </label>
                        </div>
                        <div class="form-check col-lg-6">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="usertype"
                            id="admin"
                            value="admin"
                            onChange={handleInput}
                          />
                          <label class="form-check-label" for="userType">
                            Admin
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* console.log("Sending Data:", user); */}
                    {user.usertype === "admin" ? (
                      <div className="col-6">
                        <label for="yourSecretKey" className="form-label">
                          Secret Key
                        </label>
                        <input
                          type="text"
                          name="secretKey"
                          className="form-control"
                          id="yourSecretKey"
                          required
                          value={user.secretKey}
                          onChange={handleInput}
                        />
                      </div>
                    ) : null}

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
