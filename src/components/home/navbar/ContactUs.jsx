import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { toast } from "react-toastify";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "contacts"), formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message, try again");
      console.log("Due to this", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full py-10 flex flex-col text-center items-center w-full  ">
      <h1 className="text-4xl mt-8 font-bold text-blue-600 capitalize  mb-8">
        Get In touch with Us
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md  flex flex-col gap-4  rounded-md p-6 w-96 rounded-lg shadow-lg  "
      >
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
          className="w-full p-2 border border-zinc-400 rounded-sm outline-none "
        />
        <input
          name="email"
          required
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full p-2 border border-zinc-400 rounded-sm  outline-none "
        />
        <input
          name="mobile"
          type="tel"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Enter your Mobile"
          className="w-full p-2 border border-zinc-400 rounded-sm  outline-none "
        />
        <textarea
          name="message"
          placeholder="Write your message.... "
          id=""
          value={formData.message}
          onChange={handleChange}
          className="resize-none w-full p-4 border border-zinc-400 rounded-sm  outline-none "
        ></textarea>
        <button
          className="px-3 py-2 border rounded-md bg-blue-500 text-white font-semibold"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
