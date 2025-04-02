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
import BankingServices from "./components/home/services/BankingServices";
import OtherServices from "./components/home/services/OtherServices";
import { ToastContainer } from "react-toastify";
import DoctorAppointment from "./components/home/services/DoctorAppointment";
import LawyerService from "./components/home/services/LawyerService";
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
            <Route path="/bankingservices" element={<BankingServices />} />
            <Route path="/otherservices" element={<OtherServices />} />
            <Route path="/doctorappointment" element={<DoctorAppointment />} />
            <Route path="/lawyerservice" element={<LawyerService />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
