request = require('request')

const geocode = (address, callback) => {
    const accessToken = 'pk.eyJ1Ijoic2NvZHkiLCJhIjoiY2p2bWZ4dWJyMWNpcDQ5cW9sdno0anRoYiJ9.j5jtVqeoF1D3LsFDQdnBTA'
    const geoCodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json'

    const geocodingReqOptions = {
        url: `${geoCodingUrl}`,
        qs: {
            access_token: accessToken
        },
        json: true
    }

    request(geocodingReqOptions,
        (error, { body }) => {

            if (error) {
                callback('Unable to connect to location services')
            } else if (body.features.length === 0) {
                callback('Unable to find location')
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }

            
        })

}

module.exports = geocode