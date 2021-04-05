import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Graph from "./Graph"
let size = 20;

// min and max included
//helper function:
var randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
//randomization of the array using the helper function (USAGE: just pass length and height to the function):
var randomizeArray = (length, height) => {
  var randArray = [];
  for (let index = 0; index < length; index++) {
    randArray.push(randomIntFromInterval(1, height));
  }
  return randArray;
};
//sorting methods{
var mergeSort = () => {
  console.log();
};

var quickSort = () => {
  console.log();
};
var heapSort = () => {
  console.log();
};
var bubbleSort = () => {
  console.log();
};
//}

function App() {

  const [arr, setArr] = useState(randomizeArray(size, 550));
  var RefreshButton = (a) => {
    setArr(randomizeArray(a, 550));
  };

  return (
    <>
      <div className="divslider">
        <a onClick={() => RefreshButton(size)} href="/#" className="btn btn-1">
          Refresh
        </a>
        <div style={{width:'200px'}}>
          {/* SLIDER */}
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
        <div className="sorting-buttons">
          <button
            onClick={() => {
              mergeSort();
            }}
          >
            Merge Sort
          </button>
          <button
            onClick={() => {
              quickSort();
            }}
          >
            Quick Sort
          </button>
          <button
            onClick={() => {
              heapSort();
            }}
          >
            Heap Sort
          </button>
          <button
            onClick={() => {
              bubbleSort();
            }}
          >
            Bubble Sort
          </button>
        </div>
      </div>

      <div className="graph">
        <Graph graphArray={arr} />
      </div>
    </>
  );
}

export default App;
