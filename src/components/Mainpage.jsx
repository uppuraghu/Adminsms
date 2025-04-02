import React from "react";
import { useNavigate } from "react-router-dom";

const ShortMessageService = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">SHORT MESSAGE SERVICE</h1>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Select an Account</h2>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2 hover:bg-blue-600 transition"
          onClick={() => navigate("/AdminLogin")}
        >
          Admin Account
        </button>
        <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition" 
        onClick={() => navigate("/Login")}>
          User Account
        </button>
      </div>
    </div>
  );
};

export default ShortMessageService;
