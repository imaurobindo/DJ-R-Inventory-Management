import React, { useState, useEffect } from 'react';
import { v4 } from "uuid";
import PickupAddress from './PickupAddress';
import props from 'prop-types';

function PinCodeFetch1({ pincode }) {
    const [data, setData] = useState(null);
    const [index, setIndex] = useState(0); // initial value of index is 0

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

    let Stat=data.map((output, i) => (output.Status))
    if (Stat != "Success") {
        return <div>Invalid Pincode</div>
    }

    return (
        <div>
            {/* {data.map((output, i) => (
                <h1 key={v4()}>{output.PostOffice.map((PostOffice, j) => (
                    <p key={v4()}>{PostOffice.Name + ", " + PostOffice.District + ", " + PostOffice.State + ", " + PostOffice.Country + ", " + PostOffice.Pincode}</p>
                ))}</h1>
            ))} */}
            <div className='select-postoffice'>
                <p>Select your Post Office:</p>
                <select value={index} onChange={(e) => setIndex(parseInt(e.target.value))}>
                    {data[0].PostOffice.map((_, i) => (
                        <option key={i} value={i}>{data[0].PostOffice[i].Name}</option>
                    ))}
                </select>
                <PickupAddress pincode={pincode} area={data.map((output, i) => (output.PostOffice[index]))} />
            </div>
        </div>
    );
}

export default PinCodeFetch1;
