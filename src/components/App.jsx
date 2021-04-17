import React, { useState, useRef, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import Graph from "./Graph";
import randomizeArray from "../randomizing/RandomizeArray.js";
import { getInsertionSortAnimations } from "../algorithms/InsertionSort";
import { getMergeSortAnimations } from "../algorithms/MergeSort";
import { getQuickSortAnimations } from "../algorithms/QuickSort";

let size = 20; //setting the initial size of the array
const ARR_LEN = 100;
const MIN_NUM = 5;
const MAX_NUM = 80;
const DELAY = 5;
const ACCESSED_COLOUR = "turquoise";
const SORTED_COLOUR = "green";

function App() {
  const [arr, setArr] = useState(randomizeArray(20, 550));
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const containerRef = useRef(null);
  useEffect(initialiseArray, []);
  function resetArrayColour() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arr.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      arrayBarStyle.backgroundColor = "";
    }
  }
  function initialiseArray() {
    if (isSorting) return;
    if (isSorted) resetArrayColour();
    setIsSorted(false);
    const arr = [];
    for (let i = 0; i < ARR_LEN; i++) {
      arr.push((MAX_NUM - MIN_NUM) * (i / ARR_LEN) + MIN_NUM);
    }
    shuffle(arr);
    setArr(arr);
  }
  function animateArrayAccess(index) {
    const arrayBars = containerRef.current.children;
    const arrayBarStyle = arrayBars[index].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = ACCESSED_COLOUR;
    }, DELAY);
    setTimeout(() => {
      arrayBarStyle.backgroundColor = "";
    }, DELAY * 2);
  }
  function animateSortedArray() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      setTimeout(
        () => (arrayBarStyle.backgroundColor = SORTED_COLOUR),
        i * DELAY
      );
    }
    setTimeout(() => {
      setIsSorted(true);
      setIsSorting(false);
    }, arrayBars.length * DELAY);
  }
  function animateArrayUpdate(animations) {
    console.log("adsfasf");
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
    animateArrayUpdate([])
    setArr(randomizeArray(a, 550));
    setIsSorted(true);
    clearTimeout(window.animationsTimerId);
    
  };
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
          <input id="color-picker" type="color" />
        </div>

        <div className="sorting-buttons">
          <button
            onClick={() => {
              handleClick("merge");
            }}
          >
            Merge Sort
          </button>
          <button
            onClick={() => {
              handleClick("insertion");
            }}
          >
            Insertion Sort
          </button>
          <button
            onClick={() => {
              handleClick("quick");
            }}
          >
            Quick Sort
          </button>
        </div>
      </div>
      <div className="graph" ref={containerRef}>
        {arr.map((e, i) => {
          return (
            <div
              key={i}
              className="line"
              style={{ height: e, width: "5px" }}
            ></div>
          );
        })}
      </div>
    </>
  );
}
const shuffle = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
};

export default App;
