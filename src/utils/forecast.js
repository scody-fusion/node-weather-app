request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/fd424b3f546ae5c2d69cdd6a2f67a233/'

    const requestOptions = {
        url: `${url}${latitude},${longitude}`,
        qs: {
            units: 'us'
        },
        json: true
    }
    
    // { body } is destructuring... same as res.body ???
    request(requestOptions,
        (error, { body }) => {
            if (error) {
                callback('Unable to connect to weather service')
            } else if (body.error) {
                callback('Invalid location');
            } else {
                console.log('body.daily.data:', body.daily.data);
                const { temperature, precipProbability } = body.currently
                callback(undefined, body.daily.data[0].summary + ' It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain. The expected high is ' + body.daily.data[0].temperatureHigh + ' degrees.');
            }
        }
    )
}

module.exports = forecast;



