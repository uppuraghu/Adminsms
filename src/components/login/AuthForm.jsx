import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Navbar from "../home/navbar/Navbar";

const AuthForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;
// check wheather the user is loged in or and if not logedin and try to go to the other page then it will redirect to the login page and display the error message (for the authentication and autherization or security purpose ) 
  if (!user) {
    const showMessage = window.location.pathname !== "/login";
    return (
      <Navigate
        to="/login"
        state={{ message: showMessage ? "Login first " : "" }}
        replace
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar stays at the top */}
      <Navbar />

      {/* Page content appears below the navbar */}
      <div className="flex-grow p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthForm;
