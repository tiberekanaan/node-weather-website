const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'https://api.darksky.net/forecast/09f108fca145307590d07434ad96eaf2/' + latitude +','+ longitude +'?units=si'

    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (response.body.error){
            callback('Unable to find location', undefined)
        } 
        else {
            const temp = (response.body.currently.temperature)
            const precip = (response.body.currently.precipProbability)
            const temperatureHigh = (response.body.daily.data[0].temperatureHigh)
            const temperatureLow = (response.body.daily.data[0].temperatureLow)
            callback(undefined, response.body.daily.data[0].summary + ' ' + 'It is currently ' + temp + ' degrees out.  There is a ' + precip + '% chance of rain with temperature high of ' + temperatureHigh +'%' + ' and temparature low of ' + temperatureLow + '%.')
        }
    })
}

module.exports = forecast