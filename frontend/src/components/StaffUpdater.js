import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const StaffUpdater = () => {

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

   
   

    const handleSubmit1 = (e) => {
        e.preventDefault();
      
        const userData = {
          is_staff: true,
          username: user.email,
        };
      
        axios.patch(`http://${window.location.hostname}:8000/staffupdateapi/${user&&user.email}/`, userData)
          .then((response) => {
            if (response.status === 200) {
              toast.success("You have successfully updated your data! ");

              setTimeout(() => {
                navigate('/dashboard');
              }, 3000);

            } else {
              toast.error("Update error. Please try again.");
            }
          })
          .catch((error) => {
            toast.error("Update error. Please try again.");
            console.log(error);
          });

          setTimeout(() => {
            
          }, 5000);
      };
    

    return (
        <div className='staff-updater'>
            <div className='staff-updater-inner'>
            
            

            <h1>Are you sure and want to submit ?  {user && user.email}</h1>
           
            <form onSubmit={handleSubmit1} method='post'>
               
                
               
                <button className='btn btn-primary' type="submit" >YES</button>
            </form>
            <br></br>
            {/* <ToastContainer autoClose={2000}/> */}
            </div>
        </div>
        
    );
};

export default StaffUpdater;