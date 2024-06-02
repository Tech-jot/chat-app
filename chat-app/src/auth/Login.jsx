import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { login } from "../services/ApiServices";
const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Field is required")
      .email("Please enter a valid email"),
    password: Yup.string()
      .required("Field is required ")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });
  return (
    <section className="gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                      try {
                        const resp = await login(values);
                        if (resp) {
                          navigate("/chat");
                        }
                      } catch (error) {
                        console.log("error", error);
                      }
                    }}
                  >
                    {(formik) => (
                      <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-white">
                            Email address
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                          />
                          {formik.errors.email && formik.touched.email && (
                            <div className="text-danger">
                              {formik.errors.email}
                            </div>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-white">
                            Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                          />
                          {formik.errors.password &&
                            formik.touched.password && (
                              <div className="text-danger">
                                {formik.errors.password}
                              </div>
                            )}
                        </Form.Group>

                        <p className="small mb-5 pb-lg-2">
                          <a className="text-white-50" href="#">
                            Forgot password?
                          </a>
                        </p>
                        <button
                          className="btn btn-outline-light btn-lg px-5"
                          type="submit"
                        >
                          Login
                        </button>
                      </Form>
                    )}
                  </Formik>
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg"></i>
                    </a>
                  </div>
                </div>
                <div>
                  <p className="mb-0">
                    Don't have an account?
                    <a href="/signUp" className="text-white-50 fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
