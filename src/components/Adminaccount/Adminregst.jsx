import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "user", user.uid), {
        name: formData.name,
        email: user.email,
        createdAt: serverTimestamp(),
      });
      setMessage("Registration successfull! now you can log in.");
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
        <h2 className="text-2xl text-center mt-6 mb-6 uppercase  font-semibold  ">
          Admin-Register
        </h2>
        <form
          onSubmit={handleSubmit}
          action=""
          className="w-full flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Enter your name "
            className="w-full p-2 border border-zinc-400 rounded-sm  outline-none"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-2 border border-zinc-400 rounded-sm  outline-none"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password "
            className="w-full p-2 border border-zinc-400 rounded-sm  outline-none"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button
            className="mt-2 border-2 bg-blue-500 rounded-md text-white  py-2 hover:bg-sky-500 "
            type="submit"
          >
            Create Account
          </button>

          <Link className="text-zinc-700" to="/Adminlogin">
            Login
          </Link>
        </form>
        <div className="absolute mt-6 left-1/2 transform -translate-x-1/2  px-4 py-2 text-green-500">
          {message}
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
