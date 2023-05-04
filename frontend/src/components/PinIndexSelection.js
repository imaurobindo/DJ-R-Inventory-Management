import {useState} from 'react';
import PinCodeFetch from './PinCodeFetch';
import PickupAddress from './PickupAddress';
import props from 'prop-types';

const PinIndexSelection = () => {
  const [indexx, setIndexx] = useState('');

  const handleChange = event => {
    setIndexx(event.target.value);

    console.log('value is:', event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        id="indexx"
        name="indexx"
        onChange={handleChange}
        value={indexx}
      />

      <h2>Indexx: {indexx}</h2>
      
        
            
        
     

      
    </div>
  );
};

export default PinIndexSelection;