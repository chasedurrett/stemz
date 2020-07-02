import React, { Component } from "react";
import "./SamplePackDashboard.css";
import axios from "axios";
import {connect} from 'react-redux'
import { Link } from "react-router-dom";
import Carousel from "./Carousel/Carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      arrows: true,
      slidesToScroll: 1,
      className: "slides",
      autoplay: true,
      autoplaySpeed: 8000,
      pauseOnHover: true,
      cssEase: "linear",
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    const { samplePacks } = this.state;
    const samplePacksDisplay = samplePacks.map((e) => (
      <div className="sample-pack-backdrop" key={e.id}>
        <div className="sample-pack-container">
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
      </div>
    ));
    const recents = samplePacks.map((e) => (
      <div key={e.id} className="list-container">
        <div className="recents-img-container">
          <img style={{ width: 40, height: 40 }} src={e.img} />
        </div>
        <div className="recents-name-container">
          <Link
            className="sample-pack-name"
            to={{ pathname: `/samplepack/${e.id}` }}
          >
            <h3>{e.name}</h3>
          </Link>
        </div>
        <div className="recents-author-container">
          <h4>by: {e.username}</h4>
        </div>
      </div>
    ));
    const recentFilter = recents.sort(function (a, b) {
      return b - a;
    });
    return (
      <div className="sample-pack-dashboard">
        <div className="carousel-container">
          <div
            style={{ width: "100%", height: "100%" }}
            className="carousel-one"
          >
            <Carousel />
          </div>
        </div>
        <div className="sample-pack-nav">
          <h3 className="row-title">All Packs</h3>
          <h3 className="row-title">Recent Packs</h3>
        </div>
        <div className="content-display">
        <div className="sample-pack-carousel">
          <Slider {...settings}>
            {samplePacksDisplay}
          </Slider>
        </div>
          {/*<div className="sample-pack-display">{samplePacksDisplay}</div>*/}
          <div className="recent-packs-list">{recentFilter}</div>
        
        </div>
        
      </div>
    );
  }
}

export default SamplePackDashboard;



function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey" }}
      onClick={onClick}
    />
  );
}