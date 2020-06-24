import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./header.css";

class Header extends Component {
  logoutUser = () => {
    axios
      .delete("/auth/logout")
      .then((res) => {
        console.log(`Session Destroyed`);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <Link className="logo" to="/sample-pack-dashboard">STEMZ</Link>
        </div>
        <div className="header-links">
          <Link className="profile-link" to="/profile">
            Profile
          </Link>
          <Link
            className="logout-link"
            to="/"
            onClick={() => this.logoutUser()}
          >
            Logout
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
