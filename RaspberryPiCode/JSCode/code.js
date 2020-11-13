async function readData(){
const fetch = require("node-fetch");
const sensor = require('ds18b20-raspi');

while(1)
{
var tempC = sensor.readSimpleF();
var max30100 = await fetch('http://localhost:5000/');
max30100 = await max30100.json();
console.log(`Temp = ${tempC}F, Heart Rate = ${max30100.HR}, SPo2 = ${max30100.SPo2}`);

}
}

readData()