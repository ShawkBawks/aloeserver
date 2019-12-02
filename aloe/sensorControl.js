const Gpio = require("onoff").Gpio;
const sensor = new Gpio(17, "in", "both");
const pump = new Gpio(18, "out");
const key = process.env.ACCESS_KEY;
const axios = require("axios");

let wet = true;
let lastWater = Date.now();

const getLocation = function(value) {
  console.log("getLocation called");
  return axios
    .get(
      `http://api.ipstack.com/check?access_key=${key}&fields=latitude,longitude`
    )
    .catch(error => {
      console.log(error.message);
    })
    .then(r => {
      return axios({
        method: "post",
        url: "http://192.168.88.123:3001/api/sensor-history-new",
        data: {
          sensor_log: {
            latitude: r.data.latitude,
            longitude: r.data.longitude,
            "moisture?": value === 1 ? "true" : "false",
            sensor_id: 1
          }
        }
      }).then(response => {
        console.log("final res", response);
      });
    })
    .catch(error => {
      console.log(error.message);
    });
};

const sensorControl = () => {
  pump.writeSync(1);
  sensor.watch((err, value) => {
    if (value === 1 && !wet) {
      wet = true;
      getLocation(value);
      console.log(value, err);
      pump.writeSync(0);
    } else if (value === 0 && wet) {
      wet = false;
      getLocation(value);
      console.log(value, err);
      pump.writeSync(1);
    }
  });
};

sensorControl();

module.exports = { sensorControl };
