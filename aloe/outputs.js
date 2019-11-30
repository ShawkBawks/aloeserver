const Gpio = require('onoff').Gpio;
const sensor = new Gpio(17, 'in', 'both');
const pump = new Gpio(18, 'out');

module.exports.pumpOn = function() {
  console.log('pump on');
  pump.writeSync(0);
}

module.exports.pumpOff = function() {
  console.log('pump off');
  pump.writeSync(1);
}

