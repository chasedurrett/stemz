import React from "react";

function Sample(props) {
  const { name } = props;
  console.log(props)
  return (
    <div>
      sample
      <h2>{name}</h2>
      <button>Download</button>
    </div>
  );
}

export default Sample;
