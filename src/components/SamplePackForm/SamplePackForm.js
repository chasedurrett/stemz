import React, { Component } from "react";

class SamplePackForm extends Component {

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
