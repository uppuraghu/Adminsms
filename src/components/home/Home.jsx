

import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import "../../App.css";

import Post from "./services/Post";

const Home = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Logout Failed", error);
    }
  };

  

  return (
    <div className="flex min-h-screen w-372  bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-68 h-full bg-[#1557b3] text-white p-4 flex flex-col justify-between shadow-lg hidden md:flex">
        <ul className="space-y-3 mt-20">
          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="w-full text-left bg-blue-600 hover:bg-blue-700 p-2 rounded"
            >
              Services ▼
            </button>
            {isDropdownOpen && (
              <ul className="mt-2 bg-blue-800 text-white rounded shadow-lg">
                <li>
                  <Link
                    to="/lawyerservice"
                    className="block p-2 hover:bg-blue-600"
                  >
                    Lawyers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/doctorappointment"
                    className="block p-2 hover:bg-blue-600"
                  >
                    Doctors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bankingservices"
                    className="block p-2 hover:bg-blue-600"
                  >
                    Banking
                  </Link>
                </li>
                <li>
                  <Link
                    to="/otherservices"
                    className="block p-2 hover:bg-blue-600"
                  >
                    Others
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/help"
              className="block bg-blue-600 hover:bg-blue-700 p-2 rounded"
            >
              Help
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <div className="mt-auto text-center pb-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 text-white border border-red-500 rounded-md hover:bg-red-700 transition text-sm cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className=" ml-64 flex flex-col mt-50 w-full">
        <div className="justify-center text-center  -ml-130">
      <Post/>
      </div>
        {/* Footer Section */}
        <footer className="footer">
      <div className="container">
        {/* About Section */}
        <div className="section">
          <h2 className="section-title">About SMS</h2>
          <p className="section-text">
            Sadha Mee Seva Lo offers a seamless connection to essential services
            like legal assistance, healthcare, banking, and more. We strive to
            make your service journey hassle-free.
          </p>
        </div>

        {/* Quick Links */}
        <div className="section">
          <h2 className="section-title">Quick Links</h2>
          <ul className="links">
            <li>
              <Link to="/home" className="link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="link">
                About
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="link">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="section">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-text">📞 +91-98765-43210</p>
          <p className="section-text">✉️ support@smsplatform.com</p>
          <p className="section-text">📍 Hyderabad, Telangana</p>
        </div>
      </div>

      <div className="copyright">
        © 2025 Sadha Mee Seva Lo. All rights reserved.
      </div>
    </footer>
      </div>
    </div>
  );
};

export default Home;