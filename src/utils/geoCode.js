const request = require('request');

getGeoCode=(address,callback)=>{
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2l2YTRnaWZ0IiwiYSI6ImNraG5uMWF0MzAweGoyeWxhMzgzYjBjbGIifQ.ZKAhqb0yX8VGjgzEsphxPg&limit=1'
    request({url:url, json:true},(error, {body})=>{
        if(error){
            callback('Error accesing location service.',undefined);
        }else if(body.features[0]===undefined){
            callback('Location not found, try with different location!',undefined)
        }else{
            callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name } )
        }
    })
  
}

module.exports=
{getGeoCode : getGeoCode};