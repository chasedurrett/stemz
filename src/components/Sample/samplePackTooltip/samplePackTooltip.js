import React, { useState, useEffect } from "react";
import axios from "axios";
import "./samplePackToolTip.css";

function SamplePackTooltip(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/usersamplepacks").then((res) => setData(res.data));
  }, []);

  function handleClick(id) {
    let samplePackId = id;
    console.log(samplePackId);
    const {sampleId} = props
    axios.put('/api/addtosamplepack', {samplePackId, sampleId})
  }

  return (
    <div className="tooltip-body">
      <h2>Add to Sample-Pack</h2>
      {data.map((e) => (
        <h3 onClick={() => handleClick(e.id)} key={e.id}>
          {e.name}
        </h3>
      ))}
    </div>
  );
}

export default SamplePackTooltip;
