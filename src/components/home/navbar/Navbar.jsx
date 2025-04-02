import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/smslogo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed z-10 w-full bg-white shadow-sm h-auto py-2 flex items-center">
      <div className="container mx-auto flex items-center justify-between px-6">
        
        {/* Logo */}
        <Link to="/home" className="flex items-center w-30">
          <img
            src={logo}
            alt="logo"
            className="h-10 w-auto hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Navigation Links (Shown on medium and larger screens) */}
        <ul className="hidden md:flex space-x-6 text-lg font-semibold ml-270 list-none">
          <li className="text-blue-600 hover:text-red-500 transition-colors duration-200">
            <Link to="/home">Home</Link>
          </li>
          <li className="text-blue-600 hover:text-red-500 transition-colors duration-200">
            <Link to="/about">About</Link>
          </li>
          <li className="text-blue-600 hover:text-red-500 transition-colors duration-200">
            <Link to="/contactus">Contact </Link>
          </li>
        </ul>

        {/* Hamburger Menu (Visible only on small screens) */}
        <button
          className="md:hidden text-3xl text-blue-600 ml-70 -mt-15"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Dropdown Menu for Small Screens */}
        {menuOpen && (
          <ul className="absolute top-14 right-6 bg-white shadow-md rounded-md p-3 flex flex-col space-y-2 text-lg font-semibold">
            <li>
              <Link to="/home" className="block text-blue-600 hover:text-red-500" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block text-blue-600 hover:text-red-500" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="block text-blue-600 hover:text-red-500" onClick={() => setMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
