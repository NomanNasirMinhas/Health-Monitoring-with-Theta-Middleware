async function readData(){
const fetch = require("node-fetch");
const sensor = require('ds18b20-raspi');

while(1)
{
var tempC = sensor.readSimpleC();
var max30100 = await fetch('http://localhost:5000/');
max30100 = await max30100.json();
console.log(`Temp = ${tempC}C and Max30100 = ${JSON.stringify(max30100)}`);

}
}

readData()