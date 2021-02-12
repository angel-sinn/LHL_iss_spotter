const { nextISSTimesForMyLocation } = require("./iss");

// Codes commented out below are for reference. Used when building up the app.

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log(`Fetching IP didn't work!`, error);
//     return;
//   } else {
//     console.log(`It worked! Returned IP:`, ip);
//   }
// });

// fetchCoordsByIP("154.5.118.199", (error, coords) => {
//   if (error) {
//     console.log(`Fetching Coordinates didn't work!`, error);
//     return;
//   } else {
//     console.log(`It worked! Returned Coordinates:`, coords);
//   }
// });

// fetchISSFlyOverTimes(
//   { latitude: 49.1689, longitude: -123.1442 },
//   (error, flyOverTimes) => {
//     if (error) {
//       console.log(`Fetching ISS flyover times didn't work!`, error);
//     } else {
//       console.log(`It worked! Returned ISSFlyOverTimes:\n`, flyOverTimes);
//     }
//   }
// );

const { printFlyOverTimes } = require("./printFlyOverTimes");

nextISSTimesForMyLocation((error, flyOverTimes) => {
  if (error) {
    return console.log(
      `Fetching next ISS flyover times for my location didn't work!`,
      error
    );
  } else {
    printFlyOverTimes(flyOverTimes);
  }
});

module.exports = { printFlyOverTimes };
