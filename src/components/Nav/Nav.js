import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      Nav
      <Link to="/sample-pack-dashboard">Sample Packs</Link>
      <Link to="/samples-dashboard">All Samples</Link>
      <Link to="/new-sample">Upload a Sample</Link>
      <Link to="/new-sample-pack">Create a Sample Pack</Link>
    </div>
  );
}

export default Nav;
