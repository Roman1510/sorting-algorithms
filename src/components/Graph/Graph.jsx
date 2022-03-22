import React from 'react'
import './GraphStyle.css'

function Graph(props) {
  return (
    <div className="graph" ref={props.forwardedRef}>
      {props.graphArray.map((e, i) => {
        return (
          <div
            key={i}
            className="line"
            style={{ height: e, width: '5px' }}
          ></div>
        )
      })}
    </div>
  )
}

export default Graph
