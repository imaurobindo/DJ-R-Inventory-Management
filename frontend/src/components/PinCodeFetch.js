import React, { useState, useEffect } from 'react';
import { v4 } from "uuid";
import PincodeMain from './PinCodeMain';


function PinCodeFetch({ pincode }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const responseData = await response.json();
      setData(responseData);
    }

    fetchData();
  }, [pincode]);
  

  if (!data) {
    
    return <div>Loading...</div>;
    
  }

  return (
    <div>
      {data.map((output, index) => (
          <h1 key={v4()}>{output.PostOffice.map((PostOffice, innerIndex) => ( <p>{PostOffice.Name + ", " + PostOffice.District + ", " + PostOffice.State + ", " + PostOffice.Country + ", " + PostOffice.Pincode}</p>))} </h1>
        ))}
    </div>
  );
}

export default PinCodeFetch;
