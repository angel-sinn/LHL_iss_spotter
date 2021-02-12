const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log(`It didn't work!`, error);
    return;
  }

  console.log(`It worked! Returned IP:`, ip);
});

fetchCoordsByIP("154.5.118.199", (error, coords) => {
  if (error) {
    console.log(`It didn't work!`, error);
    return;
  }

  console.log(`It worked! Returned Coordinates:`, coords);
});
