import React, { useState } from "react";
import { db } from "../../../firebase/firebaseConfig"; // Firebase Config
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const LawyerService = () => {
    const [formData, setFormData] = useState({
      serviceType: "LawyerService",
      name: "",
      contact: "",
      date: "",
      address: "",
      lawyer: "",
      filing: "",
      issue: "",
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Add form data to Firestore in the "lawyer_services" collection
        const response = await addDoc(collection(db, "lawyer_services"), formData);
       toast.success ("Form submitted successfully!");
  
        // Reset form after successful submission
        setFormData({
          serviceType: "LawyerService",
          name: "",
          contact: "",
          date: "",
          address: "",
          lawyer: "",
          filing: "",
          issue: "",
        });
      } catch (error) {
        toast.error("Error submitting form. Please try again.");
        console.error("Error:", error);
      }
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen p-6">
        <fieldset className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 border border-gray-300 mt-8">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
              Lawyer Appointment
            </h1>
  
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Applicant Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                required
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Contact Number:</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter your contact number"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                required
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Appointment Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                required
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Address:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                rows="3"
                required
              ></textarea>
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Select Lawyer:</label>
              <select
                name="lawyer"
                value={formData.lawyer}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                required
              >
                <option value="">Select a Lawyer</option>
                <option value="Yashwanth Reddy">Yashwanth Reddy (MA, LLB)</option>
                <option value="Lakshmi Durga">Lakshmi Durga (MA, LLB)</option>
                <option value="P. Rohit">P. Rohit (MA, LLB)</option>
              </select>
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Filing Against:</label>
              <input
                type="text"
                name="filing"
                value={formData.filing}
                onChange={handleChange}
                placeholder="Enter opponent's name"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                required
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Issue Description:</label>
              <textarea
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                placeholder="Describe your issue"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                rows="4"
                required
              ></textarea>
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4 hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </fieldset>
      </div>
    );
  };
  
  export default LawyerService;
