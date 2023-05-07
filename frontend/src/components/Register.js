import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-toastify/dist/ReactToastify.css';
import zxcvbn from 'zxcvbn';
//import 'react-toastify/dist/ReactToastify.dark.css';

const Register = () => {

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
            <div className='register-inner'>

                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\nbody {\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n    font-family: sans-serif;\n  }\n  h1 {\n    text-align: center;\n    margin-top: 30px;\n    margin-bottom: 0px;\n  }\n  hr {\n    margin-bottom: 30px;\n    width: 25%;\n    border: 1px solid palevioletred;\n    background-color: palevioletred;\n  }\n  form {\n    border: 1px solid black;\n    margin: 0 28%;\n    padding: 30px 0;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  }\n  label {\n    width: 80%;\n    text-transform: uppercase;\n    font-size: 16px;\n    font-weight: bold;\n  }\n  input {\n    display: block;\n    margin-bottom: 25px;\n    height: 6vh;\n    width: 100%;\n  }\n  button {\n    padding: 10px 30px;\n    text-transform: uppercase;\n    cursor: pointer;\n  }\n  <style/>\n"
                    }}
                />

                <h1>Register or Create new account</h1>

                <form onSubmit={handleSubmit} method='post'>
                    <label htmlFor="username">
                        Username
                        <input
                            type="text"
                            name="username"
                            value={state.username}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="email">
                        Email
                        <input
                            type="text"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                        />
                    </label>

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

                            <button className='eye-button' type="button" onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={state.showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </label>
                    <div className="password-strength-meter">
                        <progress
                            className={`password-strength-meter-progress strength-${passwordScore}`}
                            value={passwordScore}
                            max="4"
                        />
                        <br />
                        <label className="password-strength-meter-label">
                            {passwordScore === 0
                                ? 'Enter a password'
                                : `Strength: ${passwordScore}/4`}
                        </label>
                    </div>
                    <label htmlFor="password1">
                        Confirm Password
                        <div className='password-input'>
                            <input
                                type={passwordInputType}
                                name="password1"
                                value={state.password1}
                                onChange={handleChange}
                            />
                            <button className='eye-button' type="button" onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={state.showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </label>
                    <button className='btn btn-primary' type="submit" >Register</button>
                </form>
                <br></br>
                {/* <ToastContainer autoClose={2000} theme="colored"/> */}
            </div>
        </div>

    );
};

export default Register;



