import "./App.css";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var randomizeArray = (length, height) => {
  var arr = [];
  for (let index = 0; index < length; index++) {
    arr.push(
      <div
        className="line"
        key={index}
        style={{ height: randomIntFromInterval(1, height) }}
      ></div>
    );
  }
  return arr;
};
var refreshButton = () => {
  console.log('refresh')
};
function App() {
  var myArr = randomizeArray(280, 670);
  return (
    <>
      <button onClick={() => refreshButton()}>Refresh</button>
      <div className="graph">{myArr}</div>
    </>
  );
}

export default App;
