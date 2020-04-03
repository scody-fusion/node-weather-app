const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//  Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sean Cody'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sean Cody'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Something went wrong',
        title: 'Help',
        name: 'Sean Cody'
    })
})


app.get('/weather', (req, res) => {
    
    //validation
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
    
            res.send({
                location: location,
                forecastData: forecastData,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     location: 'Indianapolis',
    //     precipProbability: 0,
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    // return filtered products
    console.log(req.query);
    res.send({
        products: []
    })
})

//404 Pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sean Cody',
        errorMessage: "Help article not found"
    })
})

// General - Needs to be last of the routes
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sean Cody',
        errorMessage: "Page not found"
    })

})



// START THE SERVER
app.listen(port, () => {
    console.log('Your app is listening on port' + port);
})