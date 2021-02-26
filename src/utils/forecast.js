const request = require('request');
const forecast = (latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=dc80ac005afd09755db4bbb9a122eb30&query="+latitude+","+longitude;
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('oops..! There is something try again later',undefined)
        }
        else if(body.error){
            callback('404...! cannot find weather of location you entered',undefined)
        }
        else{
            console.log(url);
            callback(undefined,'weather at the '+body.location.name+' is '+body.current.temperature+'degree celcius but it feels like '+body.current.feelslike+' degree celcius...');
        }
        
    })
}
module.exports= forecast;