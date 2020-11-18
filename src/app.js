const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Setup file path
const Dir_path = path.join(__dirname,'../public')
const view_path = path.join(__dirname,'../templates/views')
const partials_path = path.join(__dirname ,'../templates/partials')


//Setup handle bar and view location
app.set('view engine','hbs')
app.set('views' , view_path)
hbs.registerPartials(partials_path)

//static dir to serve
app.use(express.static(Dir_path))

app.get('',(req , res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Yeyint'
    })
})

app.get('/about' , (req , res)=>{
    res.render('about',{
        title : 'About',
        name : 'Yeyint'
    })
})

app.get('/help', (req , res)=>{
    res.render('help',{
        title:'Help',
        helptext : 'Hello',
        name : 'Yeyint'
    })
})

app.get('/weather',(req , res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(req.query.address,(error , {latitude , longitude , location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude , (error , forecastData)=>{
            if(error){
                res.send({error})
            }

            res.send({
                forecast : forecastData,
                location ,
                address : req.query.address

            })
        })
    })
})

app.get('/product',(req , res)=>{
    console.log(req.query)
    res.send({
        product : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yeyint',
        errorMessage: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yeyint',
        errorMessage: 'Page not found.'
    })
})



app.listen(2000,()=>{
    console.log('Sever is running at 2000')
})