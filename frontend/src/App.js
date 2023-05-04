import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/login';
import { Home } from './components/Home';
import Dashboard from './components/Dashboard';
import { Navigation } from './components/Navigation';
import { Logout } from './components/logout';
import PincodeMain from './components/PinCodeMain';
import Footer from './components/Layout/Footer';
import './App.css';
import sunIcon from './assets/sun.svg';
import moonIcon from './assets/moon.svg';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('isDarkMode');
    if (storedDarkMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    localStorage.setItem('isDarkMode', newIsDarkMode.toString());
  };

  return (
    <BrowserRouter>
      <div className={isDarkMode ? 'dark-mode' : ''}>
        <div className="toggle-container" onClick={toggleDarkMode}>
          <img src={isDarkMode ? sunIcon : moonIcon} alt="toggle" />
        </div>
        <Navigation></Navigation>
        <Routes>
          <Route path="dashboard/" element={<Dashboard />} />
          <Route path="dashboard/pincodemain" element={<PincodeMain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
