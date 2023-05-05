import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import UpdateYourProfile from './UpdateYourProfile';
import PinCodeMain from './PinCodeMain';

function UserProfile() {

  const [user, setUser] = useState(null);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    fetch('http://localhost:8000/current_user/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error(error));
  }, [token]);

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.first_name}!</p>
          <p>Your email is {user.email}.</p>
       
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
  );
}

export default UserProfile;