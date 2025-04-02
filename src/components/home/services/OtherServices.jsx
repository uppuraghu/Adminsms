import React, { useState } from "react";
import { db } from "../../../firebase/firebaseConfig"; // Adjusted import path
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const OtherServices = () => {
  const [formData, setFormData] = useState({
    requirement: "",
    appointmentAddress: "",
    appointmentDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.appointmentDate) {
      toast.warning("Please select a date for your appointment.");
      return;
    }

    try {
      await addDoc(collection(db, "other_services"), formData);
      toast.success("Service request submitted!");
      setFormData({
        requirement: "",
        appointmentAddress: "",
        appointmentDate: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
     toast.error("Error submitting data.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white mt-18 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-2xl font-bold text-center  mb-4 text-blue-600">
        Welcome To Other Services
      </h2>

      <form onSubmit={handleSubmit} className="mt-6">
        {/* Requirement Input */}
        <label className="block font-semibold text-gray-700 mb-2">
          Enter Your Requirements
        </label>
        <textarea
          name="requirement"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your requirement..."
          value={formData.requirement}
          onChange={handleChange}
          required
        ></textarea>

        {/* Appointment Address Input */}
        <label className="block font-semibold text-gray-700 mt-3">
          Enter Your Address
        </label>
        <textarea
          name="appointmentAddress"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Your Address..."
          value={formData.appointmentAddress}
          onChange={handleChange}
          required
        ></textarea>

        {/* Appointment Date Input */}
        <label className="block font-semibold text-gray-700 mt-3">
          Select Appointment Date
        </label>
        <input
          type="date"
          name="appointmentDate"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.appointmentDate}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Request Appointment
        </button>
      </form>
    </div>
  );
};

export default OtherServices;
