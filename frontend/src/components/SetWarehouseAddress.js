import axios from 'axios'
import React, { useState, useEffect } from 'react'
import props from 'prop-types';
import pincode from './PinCodeMain';
//import CSRFToken from './csrftoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import StaffUpdater from './StaffUpdater';
import Modal from 'react-modal';

import { useTheme } from '@material-ui/core/styles';




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


const SetWarehouseAddress = (props) => {

  const theme = useTheme();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalOpen = () => {
    setModalIsOpen(true);
  }


  const contextClass = {
    success: "bg-blue-600 opacity-100",
    error: "bg-red-600 opacity-100 !important" ,
    info: "bg-gray-600 opacity-100",
    warning: "bg-orange-400 opacity-100",
    default: "bg-indigo-600 opacity-100",
    dark: "bg-white-600 font-gray-300 opacity-100",
  };
  
  const handleModalClose = () => {
    setModalIsOpen(false);
  }
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      return config;
    },
    error => {
      Promise.reject(error)
    }
  );

  const [user, setUser] = useState(null);
  
  const token = localStorage.getItem('access_token');
  

  useEffect(() => {
    fetch(`http://${window.location.hostname}:8000/current_user/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      
    })
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error(error));
      
  }, [token]);

  const [state, setState] = useState({
    pincode: "",
    postoffice: "",
    town_or_city: "",
    district: "",
    state: "",
    country: "",
    street_address: "",
    warehouse_name: "",
    is_staff: "True",
    
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  };


  function handleSubmit(event) {
    event.preventDefault();
    // Code to handle form submission goes here
    axios
      .get(`http://${window.location.hostname}:8000/current_user/`)
      .then((response) => {
        if (response.status === 200) {
          const currentUser = response.data;
          
          currentUser.is_staff = true; // Set is_staff to 1
          axios
            .post(`http://${window.location.hostname}:8000/current_user/`, currentUser)
            .then((response) => {
              if (response.status === 200) {
                const userData = {
                  pincode: state.pincode,
                  postoffice: state.postoffice,
                  town_or_city: state.town_or_city,
                  district: state.district,
                  state: state.state,
                  country: state.country,
                  street_address: state.street_address,
                  warehouse_name: state.warehouse_name,
                };
                axios
                  .post(`http://${window.location.hostname}:8000/warehouseaddressapi/`, userData)
                  .then((response) => {
                    console.log(response.status, response.data);
                    if (response.status === 201) {
                      toast.success("Address Data has been Successfully Subbmitted!");

                      // setTimeout(() => {
                      //   navigate('/dashboard');
                      // }, 5000);

                      handleModalOpen();

                    } else {
                      toast.error("Please enter your Street address.");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    toast.error('Please enter your Street address.');
                  });
              } else {
                toast.error("Please enter your Street address.");
              }
            })
            .catch((error) => {
              console.log(error);
              toast.error('Please enter your Street address.');
            });
        } else {
          toast.error('Session Timed Out to update data, Please Logout and Login again.');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Session Timed Out to update data, Please Logout and Login again.');
      });
      console.log({user});
    setIsSubmitted(true);
  }

  

  

  return (

    <div className='other-pin-details'>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\nbody {\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n    font-family: sans-serif;\n  }\n  h1 {\n    text-align: center;\n    margin-top: 30px;\n    margin-bottom: 0px;\n  }\n  hr {\n    margin-bottom: 30px;\n    width: 25%;\n    border: 1px solid palevioletred;\n    background-color: palevioletred;\n  }\n  form {\n    border: 1px solid black;\n    margin: 0 28%;\n    padding: 30px 0;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  }\n  label {\n    width: 80%;\n    text-transform: uppercase;\n    font-size: 16px;\n    font-weight: bold;\n  }\n  input {\n    display: block;\n    margin-bottom: 25px;\n    height: 6vh;\n    width: 100%;\n  }\n  button {\n    padding: 10px 30px;\n    text-transform: uppercase;\n    cursor: pointer;\n  }\n  <style/>\n"
        }}
      />

      {/* <div>hi {user && user.email}</div> */}

      <h1>Enter other address details</h1>
      {/* <hr className='hrs'/> */}
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
        <label htmlFor="warehouse_name">
          Enter Warehouse Name
          <input
            type="text"
            name="warehouse_name"
            value={state.warehouse_name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="street_address">
          Enter Street Address
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
        
        <button type="submit" >Submit</button>
      </form>
      <br></br>

      {/* <ToastContainer autoClose={3000}  toastClassName={({ type }) => contextClass[type || "default"] +
        " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
      }
      bodyClassName={() => "text-sm font-white font-med block p-3"}
      position="top-right" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}/> */}
      {/* <StaffUpdater /> */}
      {/* {isSubmitted && <StaffUpdater />} */}
      {/* <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose}>
  <StaffUpdater />
</Modal> */}
    </div>
  );
};

export default SetWarehouseAddress;



