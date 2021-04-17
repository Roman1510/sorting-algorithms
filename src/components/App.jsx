import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Graph from "./Graph";
import randomizeArray from "../randomizing/RandomizeArray.js";
let size = 20; //setting the initial size of the array

function App() {
  const [arr, setArr] = useState(randomizeArray(20, 550));

  var RefreshButton = (a) => {
    setArr(randomizeArray(a, 550));
  };

  function handleClick(type) {
    switch (type) {
      case 1:
        console.log("1");
        break;
      case 2:
        console.log("2");
        break;
      case 3:
        console.log("3");
        break;
      default:
        console.log("default");
        break;
    }
  }
  return (
    <>
      <div className="divslider">
        <a onClick={() => RefreshButton(size)} href="/#" className="btn btn-1">
          Refresh
        </a>
        <div className="adjust">
          <div style={{ width: "200px" }}>
            <Slider
              defaultValue={20}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="off"
              step={5}
              marks
              min={20}
              max={100}
              track={false}
              onChange={(_, val) => {
                size = val;
              }}
            />
          </div>
          <input type="color" />
        </div>

        <div className="sorting-buttons">
          <button
            onClick={() => {
              handleClick(1);
            }}
          >
            Merge Sort
          </button>
          <button
            onClick={() => {
              handleClick(2);
            }}
          >
            Insertion Sort
          </button>
          <button
            onClick={() => {
              handleClick(3);
            }}
          >
            Quick Sort
          </button>
        </div>
      </div>
      <Graph graphArray={arr} />
    </>
  );
}

export default App;
