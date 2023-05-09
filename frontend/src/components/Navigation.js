import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import './Navigation.css';
import '../App.css'
import { useNavigate } from 'react-router-dom';

export function Navigation() {
   const [isAuth, setIsAuth] = useState(false);

   const [user, setUser] = useState(null);
   const token = localStorage.getItem('access_token');
   const navigate = useNavigate();
 
   useEffect(() => {
     fetch(`http://${window.location.hostname}:8000/current_user/`, {
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
       },
     })
       .then((response) => response.json())
       .then((data) => setUser(data))
       .catch((error) => console.error(error));
   }, [token]);
 
   useEffect(() => {
     if (user && !user.is_staff) {
      //  navigate('/updateyourprofile');
     }
   }, [user, navigate]);
 
  //  console.log(user);

   useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);

   return ( 
      <div className='nvfx'>
        <Navbar className="navbar-container" expand="lg" >
          <Navbar.Brand href="/">INVOIS</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            
            <Nav className="ml-auto">
             {isAuth && (
               <Nav className="ml-auto">
                 {user && user.username == "admin@gmail.com" ? (
                   <Link to="/hidden404/admindashboard" className="nav-link">
                     Admin Dashboard
                   </Link>
                 ) : (
                   <Link to="/dashboard" className="nav-link">
                     Dashboard
                   </Link>
                 )}

               </Nav>
             )}

{isAuth && (
  <Nav className="ml-auto">
    {user && user.username == "admin@gmail.com" ? (
      <Link to="/hidden404/warehouses" className="nav-link">
        Warehouses
      </Link>
    ) : null }
    
  </Nav>
)}

{isAuth && (
  <Nav className="ml-auto">
    {user && user.username !== "admin@gmail.com" ? (
      <Link to="/listings" className="nav-link">
        Listings
      </Link>
    ) : null }
    
  </Nav>
)}

{isAuth && (
  <Nav className="ml-auto">
    {user && user.username == "admin@gmail.com" ? (
      <Link to="/hidden404/categories" className="nav-link">
        Categories
      </Link>
    ) : null }
    
  </Nav>
)}

{isAuth && (
  <Nav className="ml-auto">
    {user && user.username == "admin@gmail.com" ? (
      <Link to="/hidden404/consignments" className="nav-link">
        Consignments
      </Link>
    ) : null }
    
  </Nav>
)}



              {isAuth ? <Link to="dashboard/pincodemain" className="nav-link">PinCodeMain</Link> : null}
              {isAuth ? <Link to="/logout" className="nav-link">Logout</Link> :  
                       <Link to="/login" className="nav-link">Login</Link>}
              {isAuth ? null : <Link to="register" className="nav-link">Register</Link>}
              
                       
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
   );
}
