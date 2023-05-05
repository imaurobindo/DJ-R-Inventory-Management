import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PBKDF2 } from 'crypto-js';
import CryptoJS from 'crypto-js';
import { HmacSHA256 } from 'crypto-js/hmac-sha256';


const Register = () => {

    //const hash = CryptoJS.HmacSHA256(message, secret);

    const notify = () => toast("You Have Been Successfully Registered");

    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        password1: "",
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const salt = "myrandomsalt"; // replace with a random salt value
        const iterations = 260000; // choose a suitable number of iterations
        const hashBits = 256; // choose the desired hash length
        const hash = PBKDF2(state.password, salt, {
            keySize: hashBits / 32,
            iterations: iterations,
            hasher: PBKDF2.lib.HmacSHA256
        }).toString(PBKDF2.enc.Base64);

        const userData = {
            username: state.username,
            email: state.email,
            password: `pbkdf2_sha256$${iterations}$${salt}$${hash}`,
        };

        axios.post(`http://${window.location.hostname}:8000/registerapi/`, userData)
            .then((response) => {
                if (response.status === 201) {
                    toast.success("You have been successfully registered!");
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
        <div>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\nbody {\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n    font-family: sans-serif;\n  }\n  h1 {\n    text-align: center;\n    margin-top: 30px;\n    margin-bottom: 0px;\n  }\n  hr {\n    margin-bottom: 30px;\n    width: 25%;\n    border: 1px solid palevioletred;\n    background-color: palevioletred;\n  }\n  form {\n    border: 1px solid black;\n    margin: 0 28%;\n    padding: 30px 0;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  }\n  label {\n    width: 80%;\n    text-transform: uppercase;\n    font-size: 16px;\n    font-weight: bold;\n  }\n  input {\n    display: block;\n    margin-bottom: 25px;\n    height: 6vh;\n    width: 100%;\n  }\n  button {\n    padding: 10px 30px;\n    text-transform: uppercase;\n    cursor: pointer;\n  }\n  <style/>\n"
                }}
            />

            <h1>Register or Create new account</h1>
            {/* <hr /> */}
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
                    <input
                        type="text"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password1">
                    Confirm Password
                    <input
                        type="text"
                        name="password1"
                        
                    />
                </label>
                <button className='btn btn-primary' type="submit" >Register</button>
            </form>
            <br></br>
            <ToastContainer />
        </div>
        
    );
};

export default Register;
