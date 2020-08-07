import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./Sample.css";
import SamplePackTooltip from "./samplePackTooltip/samplePackTooltip";

function Sample(props) {
  const { id, name, url, sampleType, sampleKey, instrument, genre, author } = props;
  const [more, toggleMore] = useState(false);

  return (
    <div className="sample-container">
      <div className="play-button box">
        <ReactPlayer
          className="audioPlayer"
          controls={true}
          width={50}
          playIcon={true}
          height={30}
          url={url}
        />
      </div>
      <div className="box">
        <h4 className="name sample">{name}</h4>
      </div>
      <div className="box">
        <h4 className="instrument sample">{instrument}</h4>
      </div>
      <div className="box">
        <h4 className="genre sample">{genre}</h4>
      </div>
      <div className="box">
        <h4 className="sample-key sample">{sampleKey}</h4>
      </div>
      <div className="box">
        <h4 className="sample-type sample">{sampleType}</h4>
      </div>
      <div className="box">
        <h4 className="author sample">{author}</h4>
      </div>
      {/*<audio id="audio-element" src={url} controls={true}></audio>*/}
      <div className="box">
        <a className="button sample" href={url}>
          <img
            alt="download"
            src="https://img.icons8.com/android/24/000000/download.png"
          />
        </a>
        <button className="button sample" onClick={() => toggleMore(!more)}>
          {!more ? (
            <img
              alt="more"
              src="https://img.icons8.com/android/24/000000/more.png"
            />
          ) : (
            <SamplePackTooltip sampleId={id} />
          )}
        </button>
      </div>
    </div>
  );
}

export default Sample;
