import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Graph from "./Graph";
let size = 20;

var randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var randomizeArray = (length, height) => {
  var randArray = [];
  for (let index = 0; index < length; index++) {
    randArray.push(randomIntFromInterval(1, height));
  }
  return randArray;
};

//algorithms

function App() {
  const [arr, setArr] = useState(randomizeArray(20, 550));
  function animate(array,delay){
    setTimeout(()=>{
      setArr([...array])
    },delay)
  }
  function sortingBubble() {
    let array = arr;
    let search = false;
    let temp = 0;
    do {
      search = false;
      for (var i = 0; i < arr.length; i++) {
        // eslint-disable-next-line no-loop-func
        if (i < array.length - 1) {
          if (array[i] > array[i + 1]) {
            search = true;
            temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
            animate(array,i*200);
            console.log("array", array);
          }
        }
      }
    } while (search === true);
  }
  var RefreshButton = (a) => {
    setArr(randomizeArray(a, 550));
  };
  function handleClick() {
    sortingBubble();
  }
  return (
    <>
      <div className="divslider">
        <a onClick={() => RefreshButton(size)} href="/#" className="btn btn-1">
          Refresh
        </a>
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
        <div className="sorting-buttons">
          <button onClick={handleClick}>Bubble Sort</button>
        </div>
      </div>
      <Graph graphArray={arr} />
    </>
  );
}

export default App;
