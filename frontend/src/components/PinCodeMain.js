
import PinCodeFetch from './PinCodeFetch';
import PickupAddress from './PickupAddress';
import { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./HomePage";
import { useNavigate } from 'react-router-dom';


import PinCodeFetch1 from './PinCodeFetch1';

const PincodeMain = () => {

  const navigate = useNavigate();

  const handlePinCodeResponse = (responseData) => {
    console.log(responseData); // do something with the response data
  }

  const [message, setMessage] = useState('');
  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
      window.location.href = '/login'
    }
    else {
      (async () => {
        try {
          const { data } = await axios.get(
            'http://localhost:8000/dashboard/', {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          );
          setMessage(data.message);
        } catch (e) {
          console.log('not auth')
        }
      })()
    };
  }, []);
  const [pincode, setPincode] = useState('');

  const handleChange = event => {
    setPincode(event.target.value);

    console.log('value is:', event.target.value);
  };

  return (
    <div className='pin-input-parent'>
      <div className='pincode-input'>
      <h2>To Continue Enter Your Pincode:</h2>
        <input
          type="text"
          id="pincode"
          name="pincode"
          onChange={handleChange}
          value={pincode}
        />

        

       


      </div>
      {pincode.length === 6 && (
          <PinCodeFetch1 pincode={pincode} />


        )}
    </div>
  );
};

export default PincodeMain;