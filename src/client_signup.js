import React, { Component, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import "./client_signup.css";
import Facebook from './facebook_login.js';
import Google from './google_login.js';
import axios from 'axios';


const eye = <FontAwesomeIcon icon={faEye} />;

function PopUpSignUp(){
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return(
    <>
    <Button className="registerButton" onClick={handleShow}>
      Create an account
    </Button>

    <Modal className="signUp" show={show} onHide={handleClose}>
      
      <Modal.Header closeButton>
        <Modal.Title >REGISTRATION FORM</Modal.Title>
      </Modal.Header>
      <Modal.Body> <SignUp/> </Modal.Body>
    </Modal>
  </>
  );
};


const SignUp = () => {

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  function EmailArray(){
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    async function fetchData() { 
      const result = await fetch("http://localhost:3001");
      result
      .json()
      .then(result => setUsers(result)) 
    };

    fetchData();
  }, []);

  return (
      users.map(u => u.email)
  )
  }

  let emailArray = EmailArray();

  function UsernameArray(){
    const [users, setUsers] = useState([])
    
    useEffect(() => {
      async function fetchData() { 
        const result = await fetch("http://localhost:3001");
        result
        .json()
        .then(result => setUsers(result)) 
      };
  
      fetchData();
    }, []);
  
    return (
        users.map(u => u.username)
    )
    }
  
    let usernameArray = UsernameArray();

  const schema = Yup.object().shape({
    email: Yup.string()
        .email("Email must be a valid email.")
        .required("No email provided.")
        .notOneOf(emailArray, "There already exists an account with this email."),
    username: Yup.string()
        .min(3, "Username is too short - should be 3 chars minimum.")
        .max(30, "Username is too long - should be 30 chars maximum.")
        .matches(/^[a-zA-Z0-9]*$/, "Username should not contain space or special characters.")
        .required("No username provided.")
        .notOneOf(usernameArray, "This username is taken."),
    phoneNumber: Yup.string()
        .required("No phone number provided.")
        .matches(/^\+(?:[0-9]●?){6,14}[0-9]$/, "Phone number must be valid."),
    password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
        .matches(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/, "Password should not contain blank space."),
    retypePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords don't match.")
        .required("Required.")
});

  const formik = useFormik({
  initialValues:{ email: "", username: "", password: "", retypePassword: "", phoneNumber: "" },
  validationSchema: schema,
  onSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("Signing Up", values);
      const newData = {
        email: values.email,
        username: values.username,
        password: values.password,
        retypePassword: values.retypePassword,
        phoneNumber: values.phoneNumber
      }
      axios.post('http://localhost:3001', newData)
      setSubmitting(false);
      
    }, 500);
  },
  
});


return (
<Form autoComplete="off" onSubmit={formik.handleSubmit}>
  <Form.Label hidden = {true} htmlFor="email">Email</Form.Label>
    <Form.Control
        id="email"
        name="email"
        type="text"
        placeholder="Enter your email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={formik.errors.email && formik.touched.email && "error"}
    />
    {formik.errors.email && formik.touched.email && (
    <div style={{color: "red"}} className="input-feedback">{formik.errors.email}</div>
    )}
    <p/>

  <Form.Label hidden = {true} htmlFor="username">Username</Form.Label>
    <Form.Control
        id="username"
        name="username"
        type="text"
        placeholder="Create your username"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={formik.errors.username && formik.touched.username && "error"}
    />
    {formik.errors.username && formik.touched.username && (
    <div style={{color: "red"}} className="input-feedback">{formik.errors.username}</div>
    )}
    <p/>

  <Form.Label hidden = {true} htmlFor="phoneNumber">Phone Number</Form.Label>
    <Form.Control
        id="phoneNumber"
        name="phoneNumber"
        type="text"
        placeholder="Insert your phone number"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={formik.errors.phoneNumber && formik.touched.phoneNumber && "error"}
    />
    {formik.errors.phoneNumber && formik.touched.phoneNumber && (
    <div style={{color: "red"}} className="input-feedback">{formik.errors.phoneNumber}</div>
    )}
    <p/>    

  <Form.Label hidden = {true} htmlFor="password">Password</Form.Label> 
    <div className="parent1">
    <Form.Control
        id="password"
        name="password"
        type={passwordShown ? "text" : "password"}
        placeholder="Enter your password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={formik.errors.password && formik.touched.password && "error"}
    /> 
    <i className="child1" onClick={togglePasswordVisiblity}>{eye}</i>
    </div>
    {formik.errors.password && formik.touched.password && (
    <div style={{color: "red"}} className="input-feedback">{formik.errors.password}</div>
    )}
    <p/>
  
  <Form.Label hidden = {true} htmlFor="retypePassword">Re-type Password</Form.Label>
    <div className="parent2">
    <Form.Control
        id="retypePassword"
        name="retypePassword"
        type={passwordShown ? "text" : "password"}
        placeholder="Re-enter your password"
        value={formik.values.retypePassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={formik.errors.retypePassword && formik.touched.retypePassword && "error"}
    />
     <i className="child2" onClick={togglePasswordVisiblity}>{eye}</i>
     </div>
    {formik.errors.retypePassword && formik.touched.retypePassword && (
    <div style={{color: "red"}} className="input-feedback">{formik.errors.retypePassword}</div>
    )}
    <p/>
  
    <Button className="registerButton" type="submit" disabled={formik.isSubmitting}>
        Register
    </Button>
    <div style={{marginLeft: "140px",marginTop: '15px',  marginBottom: '-20px', fontFamily:"'Helvetica', serif", fontWeight: "bold"}}>OR</div>  

      <Facebook/>
      <p/>
      <Google/>


</Form>
);
};

export default PopUpSignUp;