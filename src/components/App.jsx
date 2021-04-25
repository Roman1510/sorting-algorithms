import React, { useState, useRef } from "react";
import Slider from "@material-ui/core/Slider";
import Graph from "./Graph";
import randomizeArray from "../randomizing/RandomizeArray.js";
import { getInsertionSortAnimations } from "../algorithms/InsertionSort";
import { getMergeSortAnimations } from "../algorithms/MergeSort";
import { getQuickSortAnimations } from "../algorithms/QuickSort";
import { GithubPicker } from "react-color";
let SIZE = 20; //setting the initial size of the array
const DELAY = 5;
const ACCESSED_COLOUR = "#ffc0cb";
const SORTED_COLOUR = "#00ffff";

function App() {
  const [arr, setArr] = useState(randomizeArray(20, 550));
  const [isSorting, setIsSorting] = useState(false);

  const [isSorted, setIsSorted] = useState(false);
  const [mainColor, setMainColor] = useState("00ffff");
  const containerRef = useRef(null);
  var dt = new Date(2021, 4, 19, 17, 32, 0);
  console.log(Math.floor(dt.getTime() / 1000) - 1);
  console.log(Math.floor(Date.now() / 1000));
  function animateArrayAccess(index) {
    const arrayBars = containerRef.current.children;
    const arrayBarStyle = arrayBars[index].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = ACCESSED_COLOUR;
    }, DELAY);
    setTimeout(() => {
      arrayBarStyle.backgroundColor = mainColor;
    }, DELAY * 2);
  }
  function animateSortedArray() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      setTimeout(() => {
        arrayBarStyle.backgroundColor = SORTED_COLOUR;
      }, i * DELAY);
    }
    setTimeout(() => {
      setIsSorting(false);
    }, arrayBars.length * DELAY);
  }
  function animateArrayUpdate(animations) {
    if (isSorting) return;
    setIsSorting(true);
    animations.forEach(([comparison, swapped], index) => {
      (function () {
        window.animationsTimerId = setTimeout(() => {
          if (!swapped) {
            if (comparison.length === 2) {
              const [i, j] = comparison;
              animateArrayAccess(i);
              animateArrayAccess(j);
            } else {
              const [i] = comparison;
              animateArrayAccess(i);
            }
          } else {
            setArr((prevArr) => {
              const [k, newValue] = comparison;
              const newArr = [...prevArr];
              newArr[k] = newValue;
              return newArr;
            });
          }
        }, index * DELAY);
      })();
    });
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * DELAY);
  }
  var RefreshButton = (a) => {
    setArr(randomizeArray(a, 550));
    clearTimeout(window.animationsTimerId);
  };
  function handleColorChange(color) {
    setMainColor(color.hex);
  }
  function handleClick(type) {
    let animations;
    switch (type) {
      case "merge":
        animations = getMergeSortAnimations(arr);
        animateArrayUpdate(animations);
        break;
      case "insertion":
        animations = getInsertionSortAnimations(arr);
        animateArrayUpdate(animations);
        break;
      case "quick":
        animations = getQuickSortAnimations(arr);
        animateArrayUpdate(animations);
        break;
      default:
        console.log("default");
        break;
    }
  }
  return (
    <>
      <div className="divslider">
        <button onClick={() => RefreshButton(SIZE)} className="btn btn-1">
          Refresh
        </button>
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
                SIZE = val;
              }}
            />
          </div>
          <GithubPicker
            value={mainColor}
            onChangeComplete={handleColorChange}
          />
        </div>

        <div>
          <button
            className="sorting-buttons"
            onClick={() => {
              handleClick("merge");
            }}
          >
            Merge Sort
          </button>
          <button
            className="sorting-buttons"
            onClick={() => {
              handleClick("insertion");
            }}
          >
            Insertion Sort
          </button>
          <button
            className="sorting-buttons"
            onClick={() => {
              handleClick("quick");
            }}
          >
            Quick Sort
          </button>
        </div>
      </div>
      <Graph graphArray={arr} forwardedRef={containerRef} />
    </>
  );
}

export default App;
