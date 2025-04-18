
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const loginMessage = location.state?.message || "";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );
      console.log("Login successful:", userCredential.user);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Invalid email or password");
    }
  };

  const handlePasswordReset = async () => {
    const trimmedEmail = formData.email.trim();

    if (!trimmedEmail) {
      setResetMessage("⚠️ Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, trimmedEmail);
      setResetMessage("✅ Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Password reset error:", error.code);

      if (error.code === "auth/user-not-found") {
        setResetMessage("❌ No account found with this email.");
      } else {
        setResetMessage("❌ Failed to send reset email. Try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
        <h2 className="text-2xl text-center mt-6 mb-6 font-semibold">
          Welcome to <span className="text-blue-500">SMS</span>
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-2 border border-zinc-400 rounded-sm outline-none"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full p-2 border border-zinc-400 rounded-sm outline-none"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button
            className="mt-2 border-2 bg-blue-500 rounded-md text-white py-2 hover:bg-sky-500"
            type="submit"
          >
            Login
          </button>

          <div className="flex justify-between text-sm text-zinc-700 mt-2">
            <Link to="/register">Register</Link>
            <button
              type="button"
              className="text-blue-600 underline cursor-pointer"
              onClick={handlePasswordReset}
            >
              Forgot Password?
            </button>
          </div>

          {resetMessage && (
            <p className="text-center mt-2 text-sm text-red-500">
              {resetMessage}
            </p>
          )}
        </form>

        <div className="absolute mt-6 left-1/2 transform -translate-x-1/2 px-4 py-2 text-red-500">
          {error}
          {loginMessage && (
            <p className="text-red-500 text-center">{loginMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
