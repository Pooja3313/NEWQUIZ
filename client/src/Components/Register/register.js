import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .matches(/^[^\s@]+@gmail\.com$/, "Email must be a @gmail.com address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Confirm Password is required")
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("/api/authh/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Registration successful");
        setSubmitting(false);
        navigate("/login");
      } else {
        toast.error("Registration failed");
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Registration failed");
      setSubmitting(false);
    }
  };

  return (
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
                    Enter your personal details to create an account
                  </p>
                </div>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    cpassword: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="row g-3">
                      <div className="col-12">
                        <label htmlFor="name" className="form-label">
                          Your Name
                        </label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                        />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                      </div>

                      <div className="col-6">
                        <label htmlFor="email" className="form-label">
                          Your Email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          id="email"
                        />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </div>

                      <div className="col-12">
                        <label htmlFor="phone" className="form-label">
                          Your Contact
                        </label>
                        <Field
                          type="text"
                          name="phone"
                          className="form-control"
                          id="phone"
                        />
                        <ErrorMessage name="phone" component="div" className="text-danger" />
                      </div>

                      <div className="col-12">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                          id="password"
                        />
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </div>

                      <div className="col-12">
                        <label htmlFor="cpassword" className="form-label">
                          Confirm Password
                        </label>
                        <Field
                          type="password"
                          name="cpassword"
                          className="form-control"
                          id="cpassword"
                        />
                        <ErrorMessage name="cpassword" component="div" className="text-danger" />
                      </div>

                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Create Account
                        </button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          Already have an account? <a href="/login">Log in</a>
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

export default Register;
