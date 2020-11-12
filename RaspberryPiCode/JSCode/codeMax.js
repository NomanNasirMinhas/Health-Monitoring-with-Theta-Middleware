const { spawn } = require('child_process');
const temperatures = []; // Store readings

const sensor = spawn('python', ['testMax30100.py']);

sensor.stdout.on('data', function(data) {
    
    // Coerce Buffer object to Float
    //temperatures.push(parseFloat(data));

    // Log to debug
    console.log(data);
});