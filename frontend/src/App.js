import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/login';
import { Home } from './components/Home';
import Dashboard from './components/Dashboard';
import { Navigation } from './components/Navigation';
import { Logout } from './components/logout';
import PincodeMain from './components/PinCodeMain';
import Footer from './components/Layout/Footer';
import LoadingBar from './components/LoadingBar'; // import the LoadingBar component
import './App.css';
import sunIcon from './assets/sun.svg';
import moonIcon from './assets/moon.svg';
import Register from './components/Register';
import Invois from './components/Invois';
import UpdateYourProfile from './components/UpdateYourProfile';
import { useTheme, ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WarehouseAdminlogin } from './components/WarehouseAdminlogin';
import AdminDashboard from './components/AdminDashboard';
import AdminProfile from './components/AdminProfile';
import AddWarehouse from './components/AddWarehouse';
import AddProductCategories1 from './components/AddProductCategories1';



function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeType, setThemeType] = useState("light"); // add a state variable for the current theme type
  const theme = useTheme();
  

  const contextClass = {
    success: "bg-blue-600 opacity-100",
    error: "bg-red-600 opacity-100 !important" ,
    info: "bg-gray-600 opacity-100",
    warning: "bg-orange-400 opacity-100",
    default: "bg-indigo-600 opacity-100",
    dark: "bg-white-600 font-gray-300 opacity-100",
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('isDarkMode');
    if (storedDarkMode === 'true') {
      setIsDarkMode(true);
      setThemeType("dark"); // set the current theme type to "dark" if dark mode is enabled
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      setThemeType(theme.palette.type); // set the current theme type to the default theme type
    }
  }, [theme.palette.type]);

  const toggleDarkMode = () => {
  const newIsDarkMode = !isDarkMode;
  setIsDarkMode(newIsDarkMode);
  localStorage.setItem('isDarkMode', newIsDarkMode.toString());
  if (newIsDarkMode) {
    setThemeType("dark");
  } else if (theme.palette.type === "light") {
    setThemeType("light"); // set the current theme type to "light" if the device theme is light
  }
};

  // console.log(theme.palette.type);
  // console.log(themeType); // log the current theme type

  return (
    <BrowserRouter>
      
      <div className={isDarkMode ? 'dark-mode' : ''}>
      <Navigation></Navigation>
        <div className="toggle-container" onClick={toggleDarkMode}>
          <img src={isDarkMode ? sunIcon : moonIcon} alt="toggle" />
          
          
        </div>
        
        
        
        <LoadingBar /> 
        <Routes>
          <Route path="dashboard/" element={<Dashboard />} />
          <Route path="dashboard/pincodemain" element={<PincodeMain />} />
          <Route path="updateyourprofile" element={<UpdateYourProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Invois />} />
          <Route path="/hidden404/warehouseadminlogin" element={<WarehouseAdminlogin /> } />
          <Route path="/hidden404/admindashboard" element={<AdminDashboard /> } />
          <Route path="/hidden404/warehouses" element={< AddWarehouse /> } />
          <Route path="/hidden404/categories" element={<AddProductCategories1 /> } />
          
        </Routes>
        
      
      <Footer />
      <ToastContainer autoClose={3000}  toastClassName={({ type }) => contextClass[type || "default"] +
        " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
      }
      bodyClassName={() => "text-sm font-white font-med block p-3"}
      position="top-right" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
