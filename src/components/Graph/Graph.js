import React, { useState } from "react";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var RandomizeArray = (length, height) => {
  var arr = [];
  for (let index = 0; index < length; index++) {
    arr.push(
      <div
        className="line"
        key={index}
        style={{ height: randomIntFromInterval(1, height), width: "5px" }}
      ></div>
    );
  }
  return arr;
};



function Graph() {
  const [arr, setArr] = useState(RandomizeArray(20, 550));
  var RefreshButton = (a) => {
    setArr(RandomizeArray(a, 550));
  };
  return <div className="graph">{arr}</div>;
}

export default Graph;
