import React from "react";
import ReactPlayer from "react-player";
import "./SampleTwo.css";

function SampleTwo(props) {
  const {
    name,
    url,
    sampleType,
    sampleKey,
    instrument,
    genre,
    author
  } = props;

  return (
    <div className="sample-container">
      <div className="play-button box">
        <ReactPlayer
          className="audioPlayer"
          controls={true}
          width={50}
          height={30}
          url={url}
        />
      </div>
      <div className="box name">
        <h4 className="name sample">{name}</h4>
      </div>
      <div className="box instrumentbox">
        <h4 className="instrument sample">{instrument}</h4>
      </div>
      <div className="box genre">
        <h4 className="genre sample">{genre}</h4>
      </div>
      <div className="box sample-key-box">
        <h4 className="sample-key sample">{sampleKey}</h4>
      </div>
      <div className="box sampletypebox">
        <h4 className="sample-type sample">{sampleType}</h4>
      </div>
      <div className="box author-box">
        <h4 className="author sample">{author}</h4>
      </div>
      {/*<audio id="audio-element" src={url} controls={true}></audio>*/}
      <div className="box download-box">
        <a className="button sample" href={url}>
          <img
            alt="download"
            src="https://img.icons8.com/android/24/000000/download.png"
          />
        </a>
        <button className="button sample more-box">
          <img
              alt="more"
              src="https://img.icons8.com/android/24/000000/more.png"
            />
        </button>
      </div>
    </div>
  );
}

export default SampleTwo;
