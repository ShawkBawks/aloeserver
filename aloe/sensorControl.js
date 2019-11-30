const Gpio = require('onoff').Gpio;
const sensor = new Gpio(17, 'in', 'both');
const pump = new Gpio(18, 'out');

let wet = true;
let lastWater = Date.now();

const sensorControl = () => {
  pump.writeSync(1);
  sensor.watch((err, value) => {
    if (value === 1 && !wet){
      wet = true;
  
      
     
      
      const key = process.env.ACCESS_KEY;
      const  getLocation = function() {
        return axios
        .get(
          `http://api.ipstack.com/check?access_key=${key}&fields=latitude,longitude`
          )
          .then(response => {
            
           axios({
        method: 'post',
        url: 'http://localhost:3001/api/sensor-history',
        data: {
         moisture?: value,
         latitude: response.data.latitude,
         longitude: response.data.longitude
        }
      })
           return data;
         });
       }












      //water
      // lastWater = Date.now();
      console.log(value,err)
      pump.writeSync(0);
    } 
    else if (value === 0 && wet) {
      wet = false;
      //axios posot
      axios({
        method: 'post',
        url: 'http://localhost:3001/api/sensor-history',
        data: {
         moisture?: value
        }
      })
      console.log(value,err)
      pump.writeSync(1)
    }
  })
}

sensorControl();

module.exports = {sensorControl};

