import React from "react";
import ReactPlayer from "react-player";
import WaveSurfer from 'wavesurfer'

function Sample(props) {
  const {
    id,
    name,
    url,
    sampleType,
    sampleKey,
    instrument,
    genre,
    author,
  } = props;
  console.log(props);
  return (
    <div>
      sample
      <h4>{name}</h4>
      <h4>{instrument}</h4>
      <h4>{genre}</h4>
      <h4>{sampleKey}</h4>
      <h4>{sampleType}</h4>
      <h4>{author}</h4>
      {/*<ReactPlayer id="audio-element2" controls={true} width={50} height={30} url={url} />*/}
      <audio id="audio-element" src={url} controls={true}></audio>
      
      <button>Download</button>
    </div>
  );
}

export default Sample;
