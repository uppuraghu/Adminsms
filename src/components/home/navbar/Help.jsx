import React, { useState } from "react";
import "./style.css";
const serviceOptions = {
  Banking: [
    {
      option: "Open an Account",
      steps: ["Choose account type", "Submit documents"],
    },
    {
      option: "Apply for a Loan",
      steps: ["Select loan type", "Check eligibility"],
    },
    { option: "Report Fraud", steps: ["Provide details", "Submit complaint"] },
  ],
  Doctor: [
    {
      option: "Book Appointment",
      steps: ["Select doctor", "Choose time slot"],
    },
    {
      option: "Get Prescription",
      steps: ["Describe symptoms", "Receive prescription"],
    },
    {
      option: "Emergency Help",
      steps: ["Provide emergency details", "Get assistance"],
    },
  ],
  Lawyer: [
    {
      option: "Legal Consultation",
      steps: ["Describe issue", "Get expert advice"],
    },
    { option: "File a Case", steps: ["Submit details", "Review case"] },
    {
      option: "Contract Review",
      steps: ["Upload document", "Get legal opinion"],
    },
  ],
};

const Help = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [messages, setMessages] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

  // Handle Service Selection
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setMessages([
      {
        sender: "bot",
        text: `You selected ${service}. Please choose an option.`,
      },
    ]);
  };

  // Handle Option Selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setStepIndex(0);
    setMessages([
      ...messages,
      {
        sender: "bot",
        text: `You chose: ${option.option}. ${option.steps[0]}`,
      },
    ]);
  };

  // Handle Next Step
  const handleNextStep = () => {
    if (stepIndex < selectedOption.steps.length - 1) {
      setStepIndex(stepIndex + 1);
      setMessages([
        ...messages,
        { sender: "bot", text: selectedOption.steps[stepIndex + 1] },
      ]);
    } else {
      setMessages([...messages, { sender: "bot", text: "Process complete!" }]);
    }
  };
  return (
    <div className="support-container">
      <div className="support-box">
        <h2 className="support-title">WELCOME TO HELP PAGE</h2>
        {!selectedService ? (
          <div className="options-container">
            <p className="prompt-text">Select a service:</p>
            {Object.keys(serviceOptions).map((service) => (
              <button
                key={service}
                className="service-button"
                onClick={() => handleServiceSelect(service)}
              >
                {service}
              </button>
            ))}
          </div>
        ) : !selectedOption ? (
          <div className="options-container">
            <p className="prompt-text">Choose an option:</p>
            {serviceOptions[selectedService].map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleOptionSelect(option)}
              >
                {option.option}
              </button>
            ))}
          </div>
        ) : (
          <div className="chat-container">
            <div className="chat-box">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    msg.sender === "user" ? "user-message" : "bot-message"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <button onClick={handleNextStep} className="next-button">
              Next Step
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;
