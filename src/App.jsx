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
import Message from "./components/home/navbar/message";





function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
         
          
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
         
          <Route element={<AuthForm />}>
          

            <Route path="/home" element={<Home />} />
            <Route path="/mesg" element={<Message />} />
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
