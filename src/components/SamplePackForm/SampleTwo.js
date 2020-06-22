import React from "react";
import ReactPlayer from "react-player";

function SampleTwo(props) {
  const {
    id,
    name,
    url,
    sampleType,
    sampleKey,
    instrument,
    genre,
    author,
    addToSamplePack,
  } = props;

  return (
    <div>
      sample
      <h4>{name}</h4>
      <h4>{instrument}</h4>
      <h4>{genre}</h4>
      <h4>{sampleKey}</h4>
      <h4>{sampleType}</h4>
      <h4>{author}</h4>
      <ReactPlayer controls={true} width={50} height={30} url={url} />
      {/*<audio id="audio-element" src={url} controls={true}></audio>*/}
      <button onClick={() => addToSamplePack(id)}>Add to Sample-pack</button>
    </div>
  );
}

export default SampleTwo;
