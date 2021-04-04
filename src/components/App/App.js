import "./App.css";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
// min and max included
//helper function:
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//randomization of the array using the helper function (USAGE: just pass length and height to the function):
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
//style for the slider:
const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

function App() {
  const classes = useStyles();
  const [arr, setArr] = useState(RandomizeArray(20, 550));
  const [size, setSize] = useState(20);
  var RefreshButton = (a) => {
    setArr(RandomizeArray(a, 550));
  };
  //sorting methods

  function mergeSort() {
    console.log(arr)
  }
  function quickSort() {}
  function heapSort() {}
  function bubbleSort() {}
  return (
    <>
      <div className="divslider">
        <a onClick={() => RefreshButton(size)} href="/#" className="btn btn-1">
          Refresh
        </a>
        <div className={classes.root}>
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
              console.log(size);
              setSize(val);
              console.log(size);
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

      <div className="graph">{arr}</div>
    </>
  );
}

export default App;
