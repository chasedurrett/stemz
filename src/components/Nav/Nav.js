import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css"

function Nav(props) {
  return (
    <div className="Nav">
      <Link className="link first-link" to="/sample-pack-dashboard">
        <h3>Sample Packs</h3>
      </Link>
      <Link className="link" to="/samples-dashboard">
      <h3>All Samples</h3>
      </Link>
      <Link className="link" to="/new-sample">
        <h3>Upload a Sample</h3>
      </Link>
      <button className="button">
        <h3 onClick={() => props.toggleCreating()}>Create Sample Pack</h3>
      </button>
    </div>
  );
}

export default Nav;
