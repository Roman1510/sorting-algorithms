import "./App.css";
import React, { useState } from "react";

var RandomizeArray = (length, height) => {
  var arr = [];
  for (let index = 0; index < length; index++) {
    arr.push(
      <div
        className="line"
        key={index}
        style={{ height: randomIntFromInterval(1, height) }}
      ></div>
    );
  }
  return arr;
};
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function App() {
  const [arr, setArr] = useState(RandomizeArray(700, 670));
  var RefreshButton = () => {
    setArr(RandomizeArray(700, 670));
  };

  return (
    <>
      <a onClick={() => RefreshButton()} href="#" class="btn btn-1">
        Refresh
      </a>

      <div className="graph">{arr}</div>
    </>
  );
}

export default App;
