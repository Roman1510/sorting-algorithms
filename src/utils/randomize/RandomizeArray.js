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

export default randomizeArray;
