import React, { Component } from "react";
import axios from "axios";
import "./SamplePack.css";

import SampleTwo from "../SamplePackForm/Sample2/SampleTwo";

class SamplePack extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      img: "",
      author: "",
      samplePack: [],
      filteredStr: "",
      type: "",
      instrument: "",
      genre: "",
    };
  }

  componentDidMount() {
    this.getIndividualSamplePack();
    this.getSamplePackDetails();
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getSamplePackDetails() {
    const { samplepackid } = this.props.match.params;
    axios.get(`/api/samplepackdetails/${samplepackid}`).then((res) => {
      const { img, name, author } = res.data;
      this.setState({
        img,
        name,
        author,
      });
    });
  }

  getIndividualSamplePack() {
    const { samplepackid } = this.props.match.params;
    axios
      .get(`/api/samplepack/${samplepackid}`)
      .then((res) => {
        this.setState({
          samplePack: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const samples = this.state.samplePack
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
          <SampleTwo
            key={e.id}
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
    const { name, img, author } = this.state;
    return (
      <div className="sample-pack-container">
        <div className="sample-pack-header">
          <div className="sample-pack-img-container">
            <img alt="Sample Pack" src={img} />
          </div>
          <div className="user-info-container">
          <div className="username-container">
            <h1>{name}</h1>
          </div>
          <div className="author-container">
            <h3>by: {author}</h3>
          </div>
          </div>
        </div>
        <div className="search-carousel">
          <input
            placeholder="Search Results.."
            name="filteredStr"
            onChange={(e) => this.handleInput(e)}
          />
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

export default SamplePack;
