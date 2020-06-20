import React, { Component } from "react";
import axios from "axios";
import { v4 as randomString } from "uuid";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";

class SamplePackForm extends Component {
  constructor() {
    super();
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {

    console.log(this.state);
    return (
      <div>
        samplepackformmmm
      </div>
    );
  }
}

export default SamplePackForm;
