import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";

import Home from "./components/home/Home";
import AuthForm from "./components/login/AuthForm";
import About from "./components/home/navbar/About";
import ContactUs from "./components/home/navbar/ContactUs";
// import Services from "./components/home/navbar/Services";
import Help from "./components/home/navbar/Help";

import { ToastContainer } from "react-toastify";

import Adminhome from "./components/Admin/Adminhome";
import ShortMessageService from "./components/Mainpage"; // Ensure this file exists
import AdminLogin from "./components/Adminaccount/Adminlogin";
import AdminRegister from "./components/Adminaccount/Adminregst";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShortMessageService />} /> {/* Initial Page */}
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/Adminregister" element={<AdminRegister />} />
          <Route element={<AuthForm />}>
          <Route path="/Adminhome" element={<Adminhome />} />

            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactus" element={<ContactUs />} />
            {/* <Route path="/services" element={<Services />} /> */}
            <Route path="/help" element={<Help />} />
           
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
