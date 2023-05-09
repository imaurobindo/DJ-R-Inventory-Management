import React, { useState, useEffect } from 'react';
import { v4 } from "uuid";
import PickupAddress from './PickupAddress';
import props from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import LoadingBar from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import SetWarehouseAddress from './SetWarehouseAddress';

function PinCodeFetchAdmin({ pincode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [index, setIndex] = useState(0); // initial value of index is 0
    const [isPincodeValid, setIsPincodeValid] = useState(true); // initial value is true`

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const responseData = await response.json();
            setData(responseData);
            
        }
        setIsLoading(false);
        fetchData();
    }, [pincode]);


    useEffect(() => {
        if (data) {
            let Stat = data.map((output, i) => (output.Status));
            if (Stat != "Success" && isPincodeValid) {
                setIsPincodeValid(false);
                toast.error("Invalid Pincode!");
            }

            if (Stat == "Success" && isPincodeValid) {
                setIsPincodeValid(false);
                toast.success(" Pincode Data Fetched Successfully!");
            }
        }
    }, [data, isPincodeValid]);

    

    if (!data) {
        return <div>Loading...</div>;
        
        
    }

    let Stat=data.map((output, i) => (output.Status))
    if (Stat != "Success") {
        return <h2>invalid pincode</h2>
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
                
            </div>

            <SetWarehouseAddress pincode={pincode} area={data.map((output, i) => (output.PostOffice[index]))} />
            <LoadingBar
        showFastActions
        progress={isLoading ? 50 : 0} // set progress to 50 when loading
      />
        </div>
    );
}

export default PinCodeFetchAdmin;
