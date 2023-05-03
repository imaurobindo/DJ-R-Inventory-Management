import React, { Component } from 'react';
import axios from 'axios';
import props from 'prop-types';




export default class PickupAddress1 extends Component {
  
     
  render() {
    return (
      <div>PickupAddress1
        <br/>
        <div>Pincode is: {this.props.pincode}</div>
      </div>
    )
  }
}
