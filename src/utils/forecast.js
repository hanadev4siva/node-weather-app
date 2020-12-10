const request = require('request');

getCurrentWeather=({latitude,longitude}={}, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=7cfcaebc725d3c804892a947fac45fb7&query='+latitude+','+longitude;
    request({url:url,json:true},(error, response)=>{
        if(error){
            callback('Weather service access error.', undefined);
        }else if(response.body.length === 0){
            callback('Weather data not found for this location, try again!', undefined);
        }else{
                // console.log(response.body.current)
                callback(undefined, response.body.current)
            }})
}

module.exports = getCurrentWeather;