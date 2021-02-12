const request = require("request");

const fetchMyIP = function (callback) {
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
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
      callback(error, null);
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
        callback(error, null);
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

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, flyOverTimes);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation,
};
