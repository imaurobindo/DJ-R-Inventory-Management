import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import UpdateYourProfile from './UpdateYourProfile';
import PinCodeMain from './PinCodeMain';
import { useNavigate } from 'react-router-dom';

function UserProfile() {

  const [user, setUser] = useState(null);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

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

  useEffect(() => {
    if (user && !user.is_staff) {
      navigate('/updateyourprofile');
    }
  }, [user, navigate]);

  console.log(user)

  return (
    <div className='user-profile'>
      <div className='user-profile-inner'>
      {user ? (
        <div>
          <p>Welcome, {user.first_name}!</p>
          <p>Your email is {user.email}.</p>
          <p>Your email is {String.valueOf(user.is_staff)}.</p>
       
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
      {user && user.is_staff ? (
        <HomePage />
      ) : (
        <PinCodeMain />
      )}
      </div>
      
    </div>
  );
}

export default UserProfile;
