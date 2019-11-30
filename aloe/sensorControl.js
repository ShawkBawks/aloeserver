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
      // axios post too tell the server plant is dfy
      
     axios({
       method: 'post',
       url: 'http://localhost:3001/api/sensor-history',
       data: {
        moisture?: value
       }
     })


      //water
      lastWater = Date.now();
      console.log(value,err)
      pump.writeSync(0);
    } 
    else if (value === 0 && wet) {
      wet = false;
      //axios posot
    axios.post(url)
      .then(function(res){
        data : {
          moisture: res.data.value
        }
      })
      // console.log(value,err)
      pump.writeSync(1)
    }
  })
}

sensorControl();

module.exports = {sensorControl};

