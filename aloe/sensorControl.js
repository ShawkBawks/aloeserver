const Gpio = require('onoff').Gpio;
const sensor = new Gpio(17, 'in', 'both');
const pump = new Gpio(18, 'out');

<<<<<<< HEAD
const wet = true;
const lastWater = Date.now();
const url = `http://localhost:3001/api/sensor-history`

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

// module.exports.sensorOn = function(){
//   console.log("Sensor On");
//   sensor.writeSync(0);
// }
// module.exports.sensorOff = function(){
//   console.log("sensor off");
//   sensor.writeSync(1);
// }
=======
pump.writeSync(1);
sensor.watch((err, value) => {
	if (value === 1){
		console.log(value, err)
		pump.writeSync(0);
	}
	else{
		pump.writeSync(1);
	}

})
>>>>>>> c9f6571056a8453eb6af08fe74fefb8a4b24285d
