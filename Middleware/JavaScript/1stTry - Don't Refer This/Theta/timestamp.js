function timestamp()
{
    var today = new Date();
   // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time+'/'+date;
    console.log("Current time is "+dateTime);
    return dateTime;
}

module.exports = {timestamp}