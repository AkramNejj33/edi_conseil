import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./Home.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Newsletter from "./components/UI/Newsletter";


// Pages
import Home from "./Home";
import AppointmentPage from "./pages/AppointmentPage";

function App() {
  const [theme, setTheme] = useState("");

  const toggleTheme = () => {
    theme === "" ? setTheme("light-theme") : setTheme("");
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rendez-vous" element={<AppointmentPage />} />
      </Routes>
      <Newsletter />
      <Footer />
    </>
  );
}

export default App;
