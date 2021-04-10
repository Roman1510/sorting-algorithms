import React from "react";

function Graph(props) {
  return (
    <div className="graph">
      {props.graphArray.map((e, i) => {
        return (
          <div
            key={i}
            className="line"
            style={{ height: e, width: "5px" }}
          ></div>
        );
      })}
    </div>
  );
}

export default Graph;
