import React from "react";
import image from "../../../images/about_logo.jpg";
const About = () => {

  return (
      <>
        {/* Inline Styles */}
        <style>
  {`
    @keyframes slow-bounce {
      0%, 100% {
        transform: translateY(-15%);
        animation-timing-function: ease-in-out; /* Same easing */
      }
      50% {
        transform: translateY(0);
        animation-timing-function: ease-in-out; /* Same easing */
      }
    }
    .animate-slow-bounce {
      animation: slow-bounce 2s infinite ease-in-out;
    }
  `}
</style>

<div className="w-full flex flex-col items-center justify-center px-6 sm:px-10 mt-18 overflow-hidden">
  {/* Heading */}
  <h1 className="text-center text-4xl text-blue-600 font-bold mb-6">
    About Us
  </h1>

  {/* Responsive Layout */}
  <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-6 p-5 md:p-8 w-full max-w-6xl mx-auto">

    {/* Image - On top for mobile, on right for laptop */}
    <img
      src={image}
      alt="about image"
      className="w-full max-w-xs sm:max-w-sm md:w-80 h-60 md:h-80 object-cover animate-slow-bounce"
    />

    {/* Paragraph - Below image for mobile, beside image for laptop */}
    <p className="w-full sm:w-4/5 md:w-2/3 text-center sm:text-left md:text-left text-base sm:text-lg leading-relaxed mt-2 sm:mt-4 md:mt-12 mx-auto md:mx-0 md:-ml-8">

    At <span className="font-semibold">GTS</span>, we provide seamless access
      to{" "}
      <span className="font-semibold">legal, medical, and banking services</span>{" "}
      to meet your needs. Whether you require expert{" "}
      <span className="font-semibold">legal consultation</span>, professional{" "}
      <span className="font-semibold">medical advice</span>, or reliable{" "}
      <span className="font-semibold">banking assistance</span>, our platform
      connects you with trusted professionals quickly and efficiently. We ensure
      a hassle-free experience, allowing you to access essential services with
      confidence and ease.
    </p>
  </div>
</div>
    </>
  );
};

export default About;
