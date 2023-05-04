import axios from 'axios'
import React, { useState } from 'react'
import props from 'prop-types';
import pincode from './PinCodeMain';
//import CSRFToken from './csrftoken';




// function App() {
//   return (
//     <div className="App">
//       <div>
//         <h1>Invois</h1>
//       </div>
//     </div>
//   );
// }

// class App extends React.Component {

//   state = { details: [], }

//   componentDidMount() {

//     let data;
//     axios.get('http://localhost:8000/')
//     .then(res => {
//       data = res.data;
//       this.setState({
//         details: data
//       });
//     })
//     .catch(err => { })
//   }


//   render() {
//     return (
//       <div>
//         <header>Data Generated From Django</header>
//         <hr></hr>
//         {this.state.details.map((output, id) => (
//           <div>
//             <h2>{output.first_name}</h2>
//             <h3>{output.last_name}</h3>
//             <br></br>

//           </div>
//         ) )}
//       </div>
//     )
//   }


// }


const PickupAddress = (props) => {
    
    const [state, setState] = useState({
        pincode: "",
        postoffice: "",
        town_or_city: "",
        district: "",
        state: "",
        country: "",
        street_address: "",
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
            postoffice: state.postoffice,
            town_or_city: state.town_or_city,
            district: state.district,
            state: state.state,
            country: state.country,
            street_address: state.street_address,

        };
        axios.post("http://localhost:8000/selleraddressapi/", userData).then((response) => {
            //<CSRFToken />
            console.log(response.status, response.data);
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

            <h1>Enter other address details</h1>
            <hr />
            <form onSubmit={handleSubmit} method='post'>
                <label htmlFor="pincode">
                    {/* Pincode */}
                    <input
                        type="hidden"
                        name="pincode"
                        value={state.pincode = props.pincode}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="street_address">
                    Enter Your Street Address
                    <input
                        type="text"
                        name="street_address"
                        value={state.street_address}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="postoffice">
                    {/* PostOffice */}
                    <input
                        type="hidden"
                        name="postoffice"
                        value={state.postoffice = props.area[0].Name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="town_or_city">
                    Town / City
                    <input
                        type="text"
                        name="town_or_city"
                        value={state.town_or_city = props.area[0].Block}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="district">
                    District
                    <input
                        type="text"
                        name="district"
                        value={state.district = props.area[0].District}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="state">
                    State
                    <input
                        type="text"
                        name="state"
                        value={state.state = props.area[0].State}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="country">
                    {/* Country */}
                    <input
                        type="hidden"
                        name="country"
                        value={state.country = props.area[0].Country}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <br></br>
        </div>
    );
};

export default PickupAddress;



