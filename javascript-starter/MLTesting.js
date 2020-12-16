// JavaScript
async function test()
{
    try
    {
    const tf = require('@tensorflow/tfjs-node');
    const model = await tf.loadLayersModel('https://storage.googleapis.com/fyp_model/model.json');
    const data = tf.tensor([[90, 80, 99]])
    console.log(data.shape)
    var predication = await model.predict(data).data();
    // predication = JSON.parse(predication);
    console.log("Stability  = ",predication[0])
}
catch(e)
{
    console.log(e)
}
}
test()