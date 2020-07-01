import React, { Component } from "react";
import axios from "axios";
import "./SamplePackFromStepOne.css";

class SamplePackFormStepOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      img:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0533%2F2089%2Ffiles%2Fplaceholder-images-image_large.png%3Fv%3D1530129081&f=1&nofb=1",
    };
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createSamplePack() {
    const { name, img } = this.state;
    axios
      .post(`/api/samplepack`, { name, img })
      .then((res) => {
        this.setState({
          name: "",
          img:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0533%2F2089%2Ffiles%2Fplaceholder-images-image_large.png%3Fv%3D1530129081&f=1&nofb=1",
        });
        this.props.history.push("/sample-pack-dashboard");
      })
      .catch((err) => console.log(err));
  }

  render() {
    console.log(this.state);
    return (
      <div className="step-one-container">
        <div className="step-one-form">
          <img alt="Sample Pack Preview" src={this.state.img} />
          <input
            name="name"
            placeholder="Name.."
            onChange={(e) => this.handleInput(e)}
          />
          <input
            name="img"
            placeholder=" Image Url.."
            onChange={(e) => this.handleInput(e)}
          />
          <button className="create-button">
            <button onClick={() => this.createSamplePack()}>Submit</button>
          </button>
        </div>
      </div>
    );
  }
}

export default SamplePackFormStepOne;
