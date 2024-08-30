import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Store/authh";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const { storeTokenInLS, storeUserIDInLS } = useAuth();

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .matches(/^[^\s@]+@gmail\.com$/, "Email must be a @gmail.com address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const loginUser = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("api/authh/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("after login: ", responseData);
        toast.success("Login Successful");
        storeTokenInLS(responseData.token);
        storeUserIDInLS(responseData.userId);
        navigate("/addtask");
        setSubmitting(false);
      } else {
        toast.error("Login failed. Please check your credentials.");
        setSubmitting(false);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred. Please try again later.");
      setSubmitting(false);
    } 
  };

  return (
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

                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={loginUser}
                >
                  {({ isSubmitting }) => (
                    <Form className="row g-3">
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">
                          Email-Id
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          id="yourUsername"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                          id="yourPassword"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Login
                        </button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          Don't have an account?{" "}
                          <a href="/">Create an account</a>
                        </p>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
