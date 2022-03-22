/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import Slider from '@mui/material/Slider'
import Graph from './Graph/Graph'
import ColorPicker from './ColorPicker/ColorPicker'
import randomizeArray from '../utils/randomize/RandomizeArray.js'
import {
  getBubbleSortAnimations,
  getQuickSortAnimations,
  getInsertionSortAnimations,
  getMergeSortAnimations,
} from '../utils'
let size = 20
function App() {
  const DELAY = 5
  const ACCESSED_COLOR = '#ffc0cb'
  // const [size] = useState(20) //setting the initial size of the array
  const [arr, setArr] = useState(randomizeArray(20, 550))
  const [isSorting, setIsSorting] = useState(false)
  const [sortingColor, setSortingColor] = useState('#00ffff')
  const [mainColor, setMainColor] = useState('00ffff')
  const containerRef = useRef(null)

  function animateArrayAccess(index) {
    const arrayBars = containerRef.current.children
    const arrayBarStyle = arrayBars[index].style
    setTimeout(() => {
      arrayBarStyle.backgroundColor = ACCESSED_COLOR
    }, DELAY)
    setTimeout(() => {
      arrayBarStyle.backgroundColor = mainColor
    }, DELAY * 2)
  }
  function animateSortedArray() {
    const arrayBars = containerRef.current.children
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style
      setTimeout(() => {
        arrayBarStyle.backgroundColor = sortingColor
      }, i * DELAY)
    }
    setTimeout(() => {
      setIsSorting(false)
    }, arrayBars.length * DELAY)
  }
  function animateArrayUpdate(animations) {
    if (isSorting) return
    setIsSorting(true)
    animations.forEach(([comparison, swapped], index) => {
      ;(function () {
        window.animationsTimerId = setTimeout(() => {
          if (!swapped) {
            if (comparison.length === 2) {
              const [i, j] = comparison
              animateArrayAccess(i)
              animateArrayAccess(j)
            } else {
              const [i] = comparison
              animateArrayAccess(i)
            }
          } else {
            setArr((prevArr) => {
              const [k, newValue] = comparison
              const newArr = [...prevArr]
              newArr[k] = newValue
              return newArr
            })
          }
        }, index * DELAY)
      })()
    })
    setTimeout(() => {
      animateSortedArray()
    }, animations.length * DELAY)
  }
  const RefreshButton = (a) => {
    setArr(randomizeArray(a, 550))
    clearTimeout(window.animationsTimerId)
  }
  function handleColorChange(color) {
    setMainColor(color.hex)
  }
  function handleClick(type) {
    let animations
    switch (type) {
      case 'merge':
        animations = getMergeSortAnimations(arr)
        animateArrayUpdate(animations)
        break
      case 'insertion':
        animations = getInsertionSortAnimations(arr)
        animateArrayUpdate(animations)
        break
      case 'quick':
        animations = getQuickSortAnimations(arr)
        animateArrayUpdate(animations)
        break
      case 'bubble':
        animations = getBubbleSortAnimations(arr)
        animateArrayUpdate(animations)
        alert('Not yet implemented!')
        break
      default:
        console.log('default')
        break
    }
  }
  return (
    <>
      <button onClick={() => RefreshButton(size)} className="btn btn-1">
        Refresh
      </button>
      <ColorPicker
        handleColorChange={handleColorChange}
        mainColor={mainColor}
      />
      <div style={{ width: '200px' }}>
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
            size = val
          }}
        />
      </div>

      <div>
        <button
          className="sorting-buttons"
          onClick={() => {
            handleClick('merge')
          }}
        >
          Merge Sort
        </button>
        <button
          className="sorting-buttons"
          onClick={() => {
            handleClick('insertion')
          }}
        >
          Insertion Sort
        </button>
        <button
          className="sorting-buttons"
          onClick={() => {
            handleClick('quick')
          }}
        >
          Quick Sorts
        </button>
        <button
          className="sorting-buttons"
          onClick={() => {
            handleClick('bubble')
          }}
        >
          Bubble Sort
        </button>
      </div>

      <Graph graphArray={arr} forwardedRef={containerRef} />
    </>
  )
}

export default App
