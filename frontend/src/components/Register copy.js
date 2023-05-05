import axios from 'axios'
import React, { useState } from 'react'
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

const Register = () => {
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
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
            username: state.username,
            email: state.email,
            password: state.password,
        };
        axios.post(`http://${window.location.hostname}:8000/registerapi/`, userData).then((response) => {
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
                        value={state.password1}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Register</button>
            </form>
            <br></br>
        </div>
    );
};

export default Register;
