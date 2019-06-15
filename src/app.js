const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode.js')
const forecast = require('../src/utils/forecast.js')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const app = express()
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup statuc directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'brusmax'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: 'brusmax'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Hola About',
        name: 'brusmax'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: 'There was an error: '+ error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return req.send({
                    error: 'There was an error: '+ error
                })
            }
            // console.log(location)
            // console.log(forecastData)
            res.send({
                address: req.query.address,
                forecast: forecastData
            })

        })
    });



    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search query'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Not found',
        error: 'this was not found',
        name: 'brusmax'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'brusmax',
        error: "Page not found"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})