import React, { Component } from "react";
import "./SamplePackDashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from './Carousel/Carousel'

class SamplePackDashboard extends Component {
  constructor() {
    super();
    this.state = {
      samplePacks: [],
    };
  }

  componentDidMount() {
    this.getSamplePacks();
  }

  getSamplePacks() {
    axios
      .get("/api/samplepacks")
      .then((res) => this.setState({ samplePacks: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    const { samplePacks } = this.state;
    const samplePacksDisplay = samplePacks.map((e) => (
      <div className="sample-pack-container" key={e.id}>
        <div className="img-container">
          <img className="sample-pack-img" alt="sample pack" src={e.img} />
        </div>
        <div className="sample-pack-name-container">
          <Link
            className="sample-pack-name"
            to={{ pathname: `/samplepack/${e.id}` }}
          >
            <h2 className="sample-pack-name">{e.name}</h2>
          </Link>
        </div>
      </div>
    ));
    return (
      <div className="sample-pack-dashboard">
        <div className="carousel-container">
          <div className="carousel"></div>
        </div>
        <div className="sample-pack-nav">
        <h3 className="row-title">Recent Packs</h3>
        </div>
        <div className="sample-pack-display">{samplePacksDisplay}</div>
      </div>
    );
  }
}

export default SamplePackDashboard;
