import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css"

function Nav() {
  return (
    <div className="Nav">
      <Link className="link" to="/sample-pack-dashboard">
        <h3>Sample Packs</h3>
      </Link>
      <Link className="link" to="/samples-dashboard">
      <h3>All Samples</h3>
      </Link>
      <Link className="link" to="/new-sample">
        <h3>Upload a Sample</h3>
      </Link>
      <Link className="link" to="/new-sample-pack">
        <h3>Create Sample Pack</h3>
      </Link>
    </div>
  );
}

export default Nav;
