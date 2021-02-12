const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      callback(`${error}`, null);
      return;
    } else if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching IP.\nResponse: ${body}`
        ),
        null
      );
      return;
    } else {
      let ip = JSON.parse(body).ip;

      callback(null, ip);
    }
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(`${error}`, null);
      return;
    } else if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching Coordinates for IP.\nResponse: ${body}`
        ),
        null
      );
      return;
    } else {
      let { latitude, longitude } = JSON.parse(body);

      callback(null, { latitude, longitude });
    }
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(`${error}`, null);
        return;
      } else if (response.statusCode !== 200) {
        callback(
          Error(
            `Status Code ${response.statusCode} when fetching ISS flyover times.\nResponse: ${body}`
          ),
          null
        );
        return;
      } else {
        let flyOverTimes = JSON.parse(body).response;

        callback(null, flyOverTimes);
      }
    }
  );
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
