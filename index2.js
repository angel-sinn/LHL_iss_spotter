const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss_promised");

const { printFlyOverTimes } = require("./index");

// Codes commented out below are for reference. Used when building up the app.

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then((body) => console.log(body));

nextISSTimesForMyLocation()
  .then((flyOverTimes) => {
    printFlyOverTimes(flyOverTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
