import React from 'react'
import { GithubPicker } from 'react-color'
const ColorPicker = ({ mainColor, handleColorChange }) => {
  return (
    <div className="picker">
      <GithubPicker
        value={mainColor}
        width="400px"
        onChangeComplete={handleColorChange}
        triangle="false"
      />
    </div>
  )
}

export default ColorPicker
