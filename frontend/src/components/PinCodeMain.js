
import PinCodeFetch from './PinCodeFetch';
import PickupAddress from './PickupAddress';
import { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./HomePage";


import PinCodeFetch1 from './PinCodeFetch1';

const PincodeMain = () => {
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
    <div>
      <div className='pincode-input'>
        <input
          type="text"
          id="pincode"
          name="pincode"
          onChange={handleChange}
          value={pincode}
        />

        <h2>Enter Your Pincode:</h2>

       


      </div>
      {pincode.length === 6 && (
          <PinCodeFetch1 pincode={pincode} />


        )}
    </div>
  );
};

export default PincodeMain;