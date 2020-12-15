// JavaScript
async function test()
{
    try
    {const tf = require('@tensorflow/tfjs');
    const model = await tf.loadLayersModel('https://storage.googleapis.com/fyp_model/model.json');
    const example = [90, 80, 99]
    const prediction = model.predict(example);
    console.log(prediction)
}
catch(e)
{
    console.log(e)
}
}
test()