import React, { Component } from "react";
import axios from "axios";
import SampleTwo from "./SampleTwo";

class SamplePackForm extends Component {
  constructor() {
    super();
    this.state = {
      samplePackName: "",
      samplePackImg:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0533%2F2089%2Ffiles%2Fplaceholder-images-image_large.png%3Fv%3D1530129081&f=1&nofb=1",
      samples: [],
      samplesToAdd: [],
    };
    this.addToSamplePack = this.addToSamplePack.bind(this);
  }

  componentDidMount() {
    this.getSamples();
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getSamples() {
    axios
      .get("/api/samples")
      .then((res) => {
        this.setState({ samples: res.data });
      })
      .catch((err) => console.log(err));
  }

  addToSamplePack(id) {
    this.state.samplesToAdd.push(id);
  }

  render() {
    const samples = this.state.samples.map((e) => {
      return (
        <SampleTwo
          key={e.id}
          id={e.id}
          sampleType={e.sample_type}
          name={e.name}
          sampleKey={e.sample_key}
          url={e.sample_url}
          instrument={e.instrument}
          genre={e.genre}
          author={e.username}
          addToSamplePack={this.addToSamplePack}
        />
      );
    });
    console.table(this.state.samplesToAdd);
    return (
      <div>
        samplepackform
        <img alt="Sample Pack Preview" src={this.state.samplePackImg} />
        <h3>Sample-pack Name: </h3>
        <input name="samplePackName" onChange={(e) => this.handleInput(e)} />
        <h3>Sample-pack image: </h3>
        <input
          name="samplePackImg"
          placeholder="Url.."
          onChange={(e) => this.handleInput(e)}
        />
        {samples}
      </div>
    );
  }
}

export default SamplePackForm;
