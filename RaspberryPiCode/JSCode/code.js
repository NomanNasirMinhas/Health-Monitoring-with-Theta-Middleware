while(1){
const sensor = require('ds18b20-raspi');
const tempC = sensor.readSimpleC();
console.log(`${tempC} degC`);}