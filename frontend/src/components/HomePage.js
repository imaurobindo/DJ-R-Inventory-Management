import React, { Component } from "react";
import { render } from "react-dom/client";
import { v4 } from "uuid";
import axios from "axios";
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  state = { details: [] };

  componentDidMount() {
    let data;
    axios
      .get("http://localhost:8000/api/")
      .then((res) => {
        data = res.data;
        this.setState({
          details: data,
        });
      })
      .catch((err) => {});
  }
  render() {
    return (
      <div className="homepage_main">
        

        {/* <div className="nav-scroller bg-body shadow-sm">
          <nav className="nav" aria-label="Secondary navigation">
            <a className="nav-link active" aria-current="page" href="#">
              Dashboard
            </a>
            <a className="nav-link" href="#">
              Friends
              <span className="badge text-bg-light rounded-pill align-text-bottom">
                27
              </span>
            </a>
            <a className="nav-link" href="#">
              Explore
            </a>
            <a className="nav-link" href="#">
              Suggestions
            </a>
            <a className="nav-link" href="#">
              Link
            </a>
            <a className="nav-link" href="#">
              Link
            </a>
            <a className="nav-link" href="#">
              Link
            </a>
            <a className="nav-link" href="#">
              Link
            </a>
            <a className="nav-link" href="#">
              Link
            </a>
          </nav>
        </div> */}
        <Link to="login">Login</Link>
        <br />
        <Link to="register">Register</Link>
        <h1>HomePage</h1>
        <header>Data Generated From Django</header>
        <hr></hr>
        <img src=""></img>
        {this.state.details.map((output, index) => (
          <h1 key={v4()}>
            {output.product_image + " " + output.brand + " " + output.product_name + " Rs." + output.product_price}{" "}
          </h1>
        ))}
        {this.state.details.map((output, index) => (
          <h1 key={v4()}>{output.ratings} </h1>
        ))}

        {/* {this.state.details.map((output, index,) => (
          <div>
            <br></br>
            <h2>output deatils={output.first_name} key={index}</h2>
            <h3 key="{id}">{" "}{output.last_name}{" "}</h3>
                        <h2 key="{id}">{" "}{output.username}{" "}</h2>
                        <h2 key="{id">{" "}{output.password}{" "}</h2>
            <br></br>

          </div>
        ))} */}

        <br></br>
      </div>
    );
  }
}

export default HomePage;
