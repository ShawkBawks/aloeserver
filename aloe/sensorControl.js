const Gpio = require('onoff').Gpio;
const sensor = new Gpio(17, 'in', 'both');
const pump = new Gpio(18, 'out');

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
