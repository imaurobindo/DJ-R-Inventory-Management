import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navigation.css';

export function Navigation() {
   const [isAuth, setIsAuth] = useState(false);

   useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);

   return ( 
      <div>
        <Navbar className="navbar-container" expand="lg" bg="dark" variant="light">
          <Navbar.Brand href="/">JWT Authentification</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mr-auto">
              {isAuth ? <Nav.Link href="/">Home</Nav.Link> : null}
            </Nav>
            <Nav className="ml-auto">
              {isAuth ? <Link to="dashboard" className="nav-link">Dashboard</Link> : null}
              {isAuth ? <Link to="dashboard/pincodemain" className="nav-link">PinCodeMain</Link> : null}
              {isAuth ? <Link to="/logout" className="nav-link">Logout</Link> :  
                       <Link to="/login" className="nav-link">Login</Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
   );
}
