import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./pages/Home.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Newsletter from "./components/UI/Newsletter";


// Pages
import Home from "./pages/Home";
import AppointmentPage from "./pages/AppointmentPage";
import CarrierePage from "./pages/CarrierePage";


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
        <Route path="/" element={<Home theme={theme}/>} />
        <Route path="/rendez-vous" element={<AppointmentPage />} />
        <Route path="/carriere" element={<CarrierePage />} />
      </Routes>

      <Newsletter />
      <Footer />
    </>
  );
}

export default App;
