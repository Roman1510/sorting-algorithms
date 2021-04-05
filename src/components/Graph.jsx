import React from "react";

function Graph(props) {
  return props.graphArray.map((e, i) => {
    return (
      <div
        className="line"
        key={i}
        style={{ height: e, width: "5px" }}
      ></div>
    );
  });
}

export default Graph;
