const request = require('request')

const forecast = function(lat, long, callback){
    const url = 'https://api.darksky.net/forecast/56ff846d93e0332382f68268b4e76978/'+encodeURIComponent(long)+','+encodeURIComponent(lat)
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            console.log(body.error)
            callback('Please check data geolocation is a valid one and try again', undefined)
        }else{
            callback(undefined, {
                summary: body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+body.daily.data[0].precipProbability * 100+'% chance of rain.',
                currently: body.currently
            })
        }
    })
}

module.exports = forecast