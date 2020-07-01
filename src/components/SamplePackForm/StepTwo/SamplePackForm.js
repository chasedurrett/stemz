import React, { Component } from "react";
import axios from "axios";
import SampleTwo from "../Sample2/SampleTwo";
import "./SamplePackFrom.css";

class SamplePackForm extends Component {
  constructor() {
    super();
    this.state = {
      samples: [],
      samplesToAdd: [],
    };
    this.addToSamplePack = this.addToSamplePack.bind(this);
  }

  componentDidMount() {
    this.getSamples();
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
    this.setState({
      samplesToAdd: [...this.state.samplesToAdd, id],
    });
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
      <div className="sample-pack-form-container">
        <div className="header-section">
          <div>
            <button>Submit</button>
          </div>
        </div>
        <div className=".samples-two-table">{samples}</div>
      </div>
    );
  }
}

export default SamplePackForm;
