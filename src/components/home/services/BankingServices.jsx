import React, { useState } from "react";
import { db } from "../../../firebase/firebaseConfig"; // Firebase Config
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const BankingServices = () => {
  const [formData, setFormData] = useState({
    serviceType: "BankingService",
    name: "",
    email: "",
    phone: "",
    date: "",
    bank: "",
    accountType: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if bank is selected
    if (!formData.bank) {
      toast.warning("Please select a bank.");
      return;
    }

    // Generate a unique bank ID using the bank prefix
    const bankPrefix = formData.bank.substring(0, 3).toLowerCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bankID = `#${bankPrefix}${randomNum}`;

    // Append the bankID to the form data
    const finalData = { ...formData, uniqueID: bankID };

    try {
      // Add the form data to Firestore collection "banking_services"
      await addDoc(collection(db, "banking_services"), finalData);
      toast.success(`Form submitted successfully!\nYour Bank ID: ${bankID}`);

      // Reset form fields after successful submission
      setFormData({
        serviceType: "BankingService",
        name: "",
        email: "",
        phone: "",
        date: "",
        bank: "",
        accountType: "",
        address: "",
      });
    } catch (error) {
      toast.error("Error submitting form.");
      console.error("Firestore Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full max-w-lg mt-8 bg-white shadow-2xl rounded-lg p-8 border border-gray-300">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome To Our Banking Services
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Enter Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Enter Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Enter Your Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Select Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Select Account Type</label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="savings">Savings</option>
              <option value="current">Current</option>
            </select>
          </div>

          {/* Bank Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Select Bank</label>
            <select
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Bank</option>
              <option value="SBI">State Bank Of India</option>
              <option value="BOI">Bank Of India</option>
              <option value="UBIN">Union Bank Of India</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Enter Your Address</label>
            <textarea
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankingServices;
