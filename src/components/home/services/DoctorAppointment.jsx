import React, { useState } from "react";
import { db } from "../../../firebase/firebaseConfig"; // Firebase Config
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const DoctorAppointment = () => {
  const [formData, setFormData] = useState({
    serviceType: "DoctorServices",
    name: "",
    age: "",
    contact: "",
    date: "",
    doctor: "",
    problem: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "doctor_appointments"), formData);
      toast.success("Doctor appointment booked successfully")

      // Reset form fields after submission
      setFormData({
        serviceType: "DoctorServices",
        name: "",
        age: "",
        contact: "",
        date: "",
        doctor: "",
        problem: "",
      });
    } catch (error) {
      toast.error("Error submitting appointment.");
      console.error("Firestore Error:", error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen  from-blue-100  p-6">
      <fieldset className="w-full max-w-lg p-8 text-center bg-white rounded-xl shadow-xl border border-gray-300 mt-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">Doctor Appointment</h1>

          <div className="text-left">
            <label className="font-semibold text-gray-700">Applicant Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="text-left">
            <label className="font-semibold text-gray-700">Age:</label>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="text-left">
            <label className="font-semibold text-gray-700">Contact:</label>
            <input
              type="tel"
              name="contact"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="text-left">
            <label className="font-semibold text-gray-700">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="text-left">
            <label className="font-semibold text-gray-700">Doctor Name:</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">Select</option>
              <option value="Dr Rahul">Dr Rahul</option>
              <option value="Dr Prithvi">Dr Prithvi</option>
              <option value="Dr Ramakrishna">Dr Ramakrishna</option>
            </select>
          </div>

          <div className="text-left">
            <label className="font-semibold text-gray-700">Problem:</label>
            <textarea
              name="problem"
              placeholder="Describe your problem"
              value={formData.problem}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              style={{ minHeight: "80px" }}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold"
          >
            Submit
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default DoctorAppointment;
