const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2FuYWFubmd1dHUxIiwiYSI6ImNqdGxmdHV6MjM2MXM0Nm11NWJ0cGJqNXkifQ.1T3Jie4AwOwZ398FRuK62Q'

    request({url: url, json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name 
            })
        }
    })
}

// const forecast = (latitude, longitude, callback) => {
    
//     const url = 'https://api.darksky.net/forecast/09f108fca145307590d07434ad96eaf2/' + latitude +','+ longitude +'?units=si'

//     request({ url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service', undefined)
//         } else if (response.body.error){
//             callback('Unable to find location', undefined)
//         } 
//         else {
//             const temp = (response.body.currently.temperature)
//             const precip = (response.body.currently.precipProbability)
//             callback(undefined, response.body.daily.data[0].summary + ' ' + 'It is currently ' + temp + ' degrees out.  There is a ' + precip + '% chance of rain.')
//         }
//     })
// }

module.exports = geocode