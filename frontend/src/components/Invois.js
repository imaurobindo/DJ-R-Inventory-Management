import React from 'react';
import logo from '../assets/images/Logo.png';

export default function InventoryManagementSystem() {
  return (
    <div className="landing-page">
      <div className='landing-page-inner'>
      <img src={logo} alt="Company logo" width={200} />
      <h1>Welcome to INVOIS</h1>
      <p>The leading inventory management solution for businesses of all sizes.</p>
      <ul>
        <li>Track inventory levels in real-time</li>
        <li>Set reorder points and receive alerts when inventory runs low</li>
        <li>Manage multiple warehouses and locations</li>
        <li>Track product movements and inventory history</li>
        <li>Generate reports and analytics to help you make informed decisions</li>
      </ul>
      <br/>
      <p>With our user-friendly interface and easy-to-use tools, you'll be able to manage your inventory with ease and efficiency. Our system is also customizable to meet your specific needs, so you can tailor it to fit your unique business requirements.</p>
      <br/><button className="btn btn-secondary">Start your free trial</button>
      </div>
    </div>
  );
}
