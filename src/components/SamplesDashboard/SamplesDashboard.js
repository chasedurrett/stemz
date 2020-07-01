import React, { Component } from "react";
import axios from "axios";
import Sample from "../Sample/Sample";
import "./SamplesDashboard.css";

class SamplesDashboard extends Component {
  constructor() {
    super();
    this.state = {
      samples: [],
      filteredStr: "",
      type: "",
      instrument: "",
      genre: "",
    };
  }

  componentDidMount() {
    this.getSamples();
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getSamples = () => {
    axios
      .get("/api/samples")
      .then((res) => {
        this.setState({ samples: res.data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const samples = this.state.samples
      .filter((e) => {
        return e.name.includes(this.state.filteredStr);
      })
      .filter((e) => {
        return e.sample_type.includes(this.state.type);
      })
      .filter((e) => {
        return e.instrument.includes(this.state.instrument);
      })
      .filter((e) => {
        return e.genre.includes(this.state.genre);
      })

      .map((e) => {
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
    return (
      <div className="samples-dashboard">
        <div className="carousel-container">
          <div className="carousel">
            <input placeholder="Search Results.." name="filteredStr" onChange={(e) => this.handleInput(e)} />
            <select name="type" onChange={(e) => this.handleInput(e)}>
              <option value="">Loop & One-shot</option>
              <option value="loop">Loop</option>
              <option value="oneshot">One-shot</option>
            </select>
            <select name="instrument" onChange={(e) => this.handleInput(e)}>
              <option value="">All Instruments</option>
              <option value="Groove">Groove</option>
              <option value="Drums">Drums</option>
              <option value="Bass">Bass</option>
              <option value="Guitar">Guitar</option>
              <option value="Synth">Synth</option>
              <option value="Percussion">Percussion</option>
              <option value="Piano">Piano</option>
              <option value="Keys">Keys</option>
              <option value="Pad">Pad</option>
              <option value="Vocals">Vocal</option>
              <option value="FX">FX</option>
            </select>
            <select name="genre" onChange={(e) => this.handleInput(e)}>
              <option value="">Genre</option>
              <option value="livesound">Live Sound</option>
              <option value="hiphop">Hip Hop</option>
              <option value="trap">Trap</option>
              <option value="r&b">R & B</option>
              <option value="soul">Soul</option>
              <option value="electronic">Electronic</option>
              <option value="experimental">Experimental</option>
              <option value="lofi">Lofi</option>
              <option value="indie">Indie</option>
              <option value="cinematic">Cinematic</option>
              <option value="global">Global</option>
            </select>
          </div>
        </div>
        <div className="samples-table-header">
          <div className="sample-header"></div>
          <div className="sample-header">Name</div>
          <div className="sample-header">Instrument</div>
          <div className="sample-header">Genre</div>
          <div className="sample-header">Key</div>
          <div className="sample-header">Type</div>
          <div className="sample-header">Author</div>
          <div className="sample-header"></div>
        </div>
        <div className="samples-table">{samples}</div>
      </div>
    );
  }
}

export default SamplesDashboard;
