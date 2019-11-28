const Gpio = require('onoff').Gpio;
const sensor = new Gpio(0, 'out')

sensor.watch((err, value) => led.writeSync(value));