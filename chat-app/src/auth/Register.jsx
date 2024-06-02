import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { registerUser } from "../services/ApiServices";
import { Button } from "react-bootstrap";
const Register = () => {
  const navigate = useNavigate();
  const PHONE_REGEX = new RegExp(
    /"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"/
  );
  const pswdReg = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  );
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().required("This field is required"),
    contact: Yup.string().required("This field is required"),
    // .matches(PHONE_REGEX, "Please enter a valid  phone number"),
    email: Yup.string()
      .required("This field is required")
      .email("Please enter a valid email"),
    password: Yup.string()
      .required("This field is required")
      .matches(
        pswdReg,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .required("This field is required ")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
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
                <div className="md-5 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                  <p className="text-white-50 mb-5">Create your account</p>
                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      contact: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                      try {
                        delete values.confirmPassword;
                        const response = await registerUser(values);
                        if (response) {
                          navigate("/");
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
                            First name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter firstName"
                            name="firstName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                          />
                          {formik.errors.firstName &&
                            formik.touched.password && (
                              <div className="text-danger">
                                {formik.errors.firstName}
                              </div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-white">
                            LastName
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter lastName"
                            name="lastName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                          />
                          {formik.errors.lastName &&
                            formik.touched.lastName && (
                              <div className="text-danger">
                                {formik.errors.lastName}
                              </div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-white">Email</Form.Label>
                          <Form.Control
                            type="text"
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
                            contact
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter contact"
                            name="contact"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.contact}
                          />
                          {formik.errors.contact && formik.touched.contact && (
                            <div className="text-danger">
                              {formik.errors.contact}
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

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-white">
                            Confirm Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter confirm Password"
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                          />
                          {formik.errors.confirmPassword &&
                            formik.touched.confirmPassword && (
                              <div className="text-danger">
                                {formik.errors.confirmPassword}
                              </div>
                            )}
                        </Form.Group>

                        <Button
                          className="btn btn-outline-light btn-lg px-5"
                          type="submit"
                          // onClick={formik.handleSubmit}
                          // onClick={() => {
                          //   console.log("hello");
                          // }}
                        >
                          Sign Up
                        </Button>
                      </Form>
                    )}
                  </Formik>

                  <div className="mt-4">
                    <p className="">
                      Already have an account ? &nbsp;
                      <a href="/" className="text-white-50 fw-bold">
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
