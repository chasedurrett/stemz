import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <div>
        Header
        <Link to="/sample-pack-dashboard">STEMZ</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/" onClick={() => this.logoutUser()}>
          Logout
        </Link>
      </div>
    );
  }
}

export default Header;
