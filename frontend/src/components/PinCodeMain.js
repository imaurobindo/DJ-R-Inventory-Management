import {useState} from 'react';
import PinCodeFetch from './PinCodeFetch';
import PickupAddress from './PickupAddress';

const PincodeMain = () => {
  const [pincode, setPincode] = useState('');

  const handleChange = event => {
    setPincode(event.target.value);

    console.log('value is:', event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        id="pincode"
        name="pincode"
        onChange={handleChange}
        value={pincode}
      />

      <h2>Pincode: {pincode}</h2>
      {pincode.length === 6 && (
        <PinCodeFetch pincode={pincode} />
            
        
      )}

      <PickupAddress pincode={pincode} />
    </div>
  );
};

export default PincodeMain;