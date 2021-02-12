const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log(`Fetching IP didn't work!`, error);
    return;
  } else {
    console.log(`It worked! Returned IP:`, ip);
  }
});

fetchCoordsByIP("154.5.118.199", (error, coords) => {
  if (error) {
    console.log(`Fetching Coordinates didn't work!`, error);
    return;
  } else {
    console.log(`It worked! Returned Coordinates:`, coords);
  }
});

fetchISSFlyOverTimes(
  { latitude: 49.1689, longitude: -123.1442 },
  (error, time) => {
    if (error) {
      console.log(`Fetching ISS flyover times didn't work!`, error);
    } else {
      console.log(`It worked! Returned ISSFlyOverTimes:\n`, time);
    }
  }
);
