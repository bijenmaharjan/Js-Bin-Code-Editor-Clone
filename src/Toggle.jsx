import React, { useState } from "react";
import "./App.css";
const Toggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark"); // Add dark mode class
    } else {
      document.body.classList.remove("dark"); // Remove dark mode class
    }
  };

  return (
    <button className="text-blue-500" onClick={handleClick}>
      {darkMode ? "Light mode" : "Dark mode"}
    </button>
  );
};

export default Toggle;
