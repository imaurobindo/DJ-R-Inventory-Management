import React, { Component, useState } from 'react';
import axios from 'axios';
import props from 'prop-types';



const [state, setState] = useState({
    pincode: "",
    area: "",
    city: "",
    district: "",
    state: "",
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
    const userData = {
        pincode: state.pincode,
        area: state.area,
        city: state.city,
        district: state.district,
        state: state.state,
    };
    axios.post("http://localhost:8000/selleraddressapi/", userData).then((response) => {
        //<CSRFToken />
        console.log(response.status, response.data);
    });
};

export default class PickupAddress1 extends Component {
  
     
  render() {
    return (
        <div>
        <style
            dangerouslySetInnerHTML={{
                __html:
                    "\nbody {\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n    font-family: sans-serif;\n  }\n  h1 {\n    text-align: center;\n    margin-top: 30px;\n    margin-bottom: 0px;\n  }\n  hr {\n    margin-bottom: 30px;\n    width: 25%;\n    border: 1px solid palevioletred;\n    background-color: palevioletred;\n  }\n  form {\n    border: 1px solid black;\n    margin: 0 28%;\n    padding: 30px 0;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  }\n  label {\n    width: 80%;\n    text-transform: uppercase;\n    font-size: 16px;\n    font-weight: bold;\n  }\n  input {\n    display: block;\n    margin-bottom: 25px;\n    height: 6vh;\n    width: 100%;\n  }\n  button {\n    padding: 10px 30px;\n    text-transform: uppercase;\n    cursor: pointer;\n  }\n  <style/>\n"
            }}
        />

        <h1>Pincode Data Will Be Fetched Here</h1>
        <hr />
        <form onSubmit={handleSubmit} method='post'>
            <label htmlFor="pincode">
                Pincode
                <input
                    type="text"
                    name="pincode"
                    value={state.pincode}
                    onChange={handleChange}
                />
            </label>
            <h1>Pincode: {this.props.pincode}</h1>
            <label htmlFor="area">
                Area
                <input
                    type="text"
                    name="area"
                    value={state.area}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor="city">
                City
                <input
                    type="text"
                    name="city"
                    value={state.city}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor="district">
                District
                <input
                    type="text"
                    name="district"
                    value={state.district}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor="state">
                State
                <input
                    type="text"
                    name="state"
                    value={state.state}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
        <br></br>
    </div>
    )
  }
}
