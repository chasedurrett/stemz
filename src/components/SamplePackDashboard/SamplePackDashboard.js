import React, { Component } from "react";
import "./SamplePackDashboard.css";
import axios from "axios";
import { connect } from "react-redux";
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
      speed: 300,
      slidesToShow: 4,
      arrows: true,
      slidesToScroll: 1,
      className: "slides",
      cssEase: "linear",
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
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
    const lofi = samplePacks
      .sort(function (a, b) {
        return b - a;
      })
      .map((e) => (
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
        <div className="sample-pack-nav"></div>
        <div className="content-display">
          <div className="sample-pack-carousel">
            <h3 className="row-title">All Packs</h3>
            <Slider {...settings}>{samplePacksDisplay}</Slider>
          </div>
          <div className="sample-pack-carousel-two">
            <h3 className="row-title">Lofi</h3>
            <p>Lofi sounds to warm up your production</p>
            <Slider {...settings}>{lofi}</Slider>
          </div>
        </div>
        <div className="slogan-container">
          <img
            style={{ height: 60 }}
            alt="find your sound"
            src="https://img.icons8.com/nolan/2x/audio-wave.png"
          />
          <h2 className="slogan">Find your sound</h2>
        </div>
        <div className="right-sidebar">
          <h3 className="row-title recent-packs-title">Recent Packs</h3>
          <div className="recent-packs-list">{recentFilter}</div>
        </div>
        <footer className="footer">
          <img
            style={{ height: 20, width: 20 }}
            src="https://img.icons8.com/metro/2x/instagram-new.png"
          />
          <img
            style={{ height: 20, width: 20 }}
            src="https://img.icons8.com/ios/2x/twitter.png"
          />
          <img
            style={{ height: 20, width: 20 }}
            src="https://img.icons8.com/ios/2x/facebook-circled.png"
          />
          <img
            style={{ height: 20, width: 20 }}
            src="https://img.icons8.com/ios/2x/linkedin.png"
          />
        </footer>
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
