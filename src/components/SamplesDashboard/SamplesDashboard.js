import React, { Component } from "react";
import axios from "axios";
import Sample from "../Sample/Sample";

class SamplesDashboard extends Component {
  constructor() {
    super();
    this.state = {
      samples: [],
    };
  }

  componentDidMount() {
    this.getSamples();
  }

  getSamples = () => {
    axios.get("/api/samples").then((res) => {
      this.setState({ samples: res.data });
    });
  };

  render() {
    console.log(this.state.samples);
    const samples = this.state.samples.map((e) => {
      return (
        <Sample
          key={e.id}
          id={e.id}
          sampleType={e.sample_type}
          name={e.name}
          sampleKey={e.sample_key}
          url={e.sample_url}
          instrument={e.instrument}
          genre={e.genre}
          author={e.username}
        />
      );
    });
    return <div>{samples}</div>;
  }
}

export default SamplesDashboard;
