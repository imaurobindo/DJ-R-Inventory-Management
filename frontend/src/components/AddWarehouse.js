import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-toastify/dist/ReactToastify.css';
import zxcvbn from 'zxcvbn';

import PincodeMain from './PinCodeMain';
import PinCodeMainAdmin from './PinCodeMainAdmin';
//import 'react-toastify/dist/ReactToastify.dark.css';

const AddWarehouse = () => {

    const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    async function fetchWarehouseData() {
      const response = await fetch(`http://${window.location.hostname}:8000/warehouseapi/`);
      const data = await response.json();
      setWarehouses(data);
    }

    fetchWarehouseData();
  }, []);


  const [warehousesaddress, setWarehousesaddress] = useState([]);

  useEffect(() => {
    async function fetchWarehouseaddressData() {
      const response = await fetch(`http://${window.location.hostname}:8000/warehouseaddressapi/`);
      const data = await response.json();
      setWarehousesaddress(data);
    }

    fetchWarehouseaddressData();
  }, []);

    const navigate = useNavigate();

    const notify = () => toast("You Have Been Successfully Registered");

    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        showPassword: false,
    });

    const [passwordScore, setPasswordScore] = useState(0);

    const calculatePasswordScore = (password) => {
        const result = zxcvbn(password);
        setPasswordScore(result.score);
    };

    const togglePasswordVisibility = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };

    const passwordInputType = state.showPassword ? 'text' : 'password';

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
        console.log(passwordScore);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (state.password !== state.password1) {
            toast.error("Passwords do not match");
            return;
        }

        if (state.password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{}|\\:;”’?/<>,.]).{8,}$/;
        if (!passwordRegex.test(state.password)) {
            toast.error("Password must include at least one symbol, one uppercase, one lowercase, and one numeric character");
            return;
        }

        const userData = {
            username: state.username,
            email: state.email,
            password: state.password,
        };

        axios.post(`http://${window.location.hostname}:8000/registerapi/`, userData)
            .then((response) => {
                if (response.status === 201) {
                    toast.success("You have been successfully registered! Please Wait, redirecting to Login...");
                    setState({
                        username: "",
                        email: "",
                        password: "",
                        password1: "",
                    });
                    //navigate('/login'); // redirect to login page
                    // Delay the navigation by 5 seconds
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);

                } else {
                    toast.error("Registration error. Please try again.");
                }
            })
            .catch((error) => {
                toast.error("Registration error. Please try again.");
                console.log(error);
            });
            
    };


    return (

        

        <div className='register'>
            <div className='all-warehouses'>
      <h2>Warehouse Data</h2>
      <ul>
        {/* {warehouses.map((warehouse) => (
          <li key={warehouse.id}>
            <h3>{warehouse.id}. {warehouse.warehouse_name}</h3>
            
            
          </li>
        ))} */}
        {warehousesaddress.map((warehouseaddress) => (
          <li key={warehousesaddress.id}>
            <h3>{warehouseaddress.warehouse_name}, {warehouseaddress.street_address}, {warehouseaddress.postoffice}, {warehouseaddress.town_or_city}, {warehouseaddress.district}, {warehouseaddress.state}, {warehouseaddress.country}</h3>
            <h3>{warehouseaddress.pincode}</h3>
            
            
            
          </li>
        ))}
      </ul>
    </div>

    <div className='register-inner'><PinCodeMainAdmin /></div>
    
    
            {/* <div className='register-inner'>

                

                <h1>Add a new Warehouse</h1>
                
                <form  onSubmit={handleSubmit} method='post'>
                    <div className='cw-add'>
                        <div>
                    <label htmlFor="username">
                        Warehouse Name
                        <input
                            type="text"
                            name="username"
                            value={state.username}
                            onChange={handleChange}
                        />
                    </label>
                    </div>
                    <div>
                    <label htmlFor="email">
                        Pincode
                        <input
                            type="text"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                        />
                    </label></div>
<div>
                    <label htmlFor="password">
                        Password
                        <div className='password-input'>
                            <input
                                type={passwordInputType}
                                name="password"
                                value={state.password}
                                onChange={(e) => {
                                    handleChange(e);
                                    calculatePasswordScore(e.target.value);
                                }}
                            />

                            
                        </div>
                    </label>
                    </div>
                    <div>
                    <label htmlFor="password1">
                        Confirm Password
                        <div className='password-input'>
                            <input
                                type={passwordInputType}
                                name="password1"
                                value={state.password1}
                                onChange={handleChange}
                            />
                            
                        </div>
                    </label>
                    </div>
                    </div>
                    <button id='cw-add-btn' className='btn btn-primary' type="submit" >Add Warehouse</button>
                </form>
                <br></br>
                <ToastContainer autoClose={2000} theme="colored"/>
            </div> */}
            
        </div>

    );
};

export default AddWarehouse;



