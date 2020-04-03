request = require('request')
const chalk = require('chalk')


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
                callback(chalk.red.inverse('Invalid location'));
            } else {
                
                const { temperature, precipProbability } = body.currently
                callback(undefined, chalk.green.inverse(body.daily.data[0].summary + ' It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain.'));
            }
        }
    )
}

module.exports = forecast;



