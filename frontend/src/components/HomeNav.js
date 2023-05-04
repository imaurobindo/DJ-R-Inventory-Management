import '../App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { Login } from "./login";
//import { Home } from "./components/Home";
import { Navigation } from './Navigation';
import { Logout } from './logout';
import HomePage from './HomePage';
import Register from './Register';
import PinCodeMain from './PinCodeMain';
import Dashboard from '../pages/Dashboard';
//import { fas } from '@fortawesome/free-solid-svg-icons'
//import { library } from '@fortawesome/fontawesome-svg-core'
//import Header from "./components/Layout/Header"
import Footer from "./Layout/Footer"
import SideBarContainer from "./Layout/SideBarContainer"
import Transactions from "../pages/Transactions";
import "../assets/scss/app.scss"
//import reactLogo from './assets/react.svg'
import MainAdmin from './MainAdmin';



function HomeNav() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (

    <BrowserRouter>
      {/* <Header /> */}
      <SideBarContainer />
      <Navigation></Navigation>
      <div className="main-content">
        <div className="page-content">
          <div className={`App ${theme}`}>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onClick={toggleTheme}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Enable Dark Mode
              </label>
            </div>
            </div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="register/*" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/dashboard/pincodemain" element={<PinCodeMain />} />
              <Route path="/mainadmin" element={<MainAdmin />} />




              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />



            </Routes>
          </div>
        </div>
        <Footer />
    </BrowserRouter>
    
  );
}

export default HomeNav;