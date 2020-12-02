import "./App.css";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

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
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

function valuetext(value) {
  //here I can update the value of an array I generate
  return `${value}`;
}
function App() {
  const classes = useStyles();
  const [arr, setArr] = useState(RandomizeArray(100, 550));
  var RefreshButton = () => {
    setArr(RandomizeArray(100, 550));
  };

  return (
    <>
      <div className="divslider">
        <a onClick={() => RefreshButton()} href="/#" className="btn btn-1">
          Refresh
        </a>
        <div className={classes.root}>
          <Typography id="discrete-slider" gutterBottom>
            Array size
          </Typography>
          <Slider
            defaultValue={30}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="off"
            step={1}
            marks
            min={1}
            max={15}
            track={false}
          />
        </div>
      </div>

      <div className="graph">{arr}</div>
    </>
  );
}

export default App;
