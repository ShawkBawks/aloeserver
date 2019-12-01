const Gpio = require('onoff').Gpio;
const sensor = new Gpio(17, 'in', 'both');
const pump = new Gpio(18, 'out');
const key = process.env.ACCESS_KEY;

let wet = true;
let lastWater = Date.now();

const sensorControl = () => {
  pump.writeSync(1);
  sensor.watch((err, value) => {
    if (value === 1 && !wet){
      wet = true;

      const  getLocation = function() {
        return axios
        .get(
          `http://api.ipstack.com/check?access_key=${key}&fields=latitude,longitude`
          )
          .then(response => {
            
           return axios({
        method: 'post',
        url: 'http://localhost:3001/api/sensor-history',
        data: {
          sensor_history: {
         moisture: value === 1 ? true : false,
         latitude: response.data.latitude,
         longitude: response.data.longitude,
         sensor_id: 1
        }
        }
      })
         });
       }


      //water
      // lastWater = Date.now();
      console.log(value,err)
      pump.writeSync(0);
    } 
    else if (value === 0 && wet) {
      wet = false;
      const  getLocation = function() {
        return axios
        .get(
          `http://api.ipstack.com/check?access_key=${key}&fields=latitude,longitude`
          )
          .then(response => {
            
           return axios({
        method: 'post',
        url: 'http://localhost:3001/api/sensor-history-new',
        data: {
          sensor_history: {
         moisture: value === 1 ? true : false,
         latitude: response.data.latitude,
         longitude: response.data.longitude,
         sensor_id: 1
          }
        }
      })
         });
       }
      console.log(value,err)
      pump.writeSync(1)
    }
  })
}

sensorControl();

module.exports = {sensorControl};

