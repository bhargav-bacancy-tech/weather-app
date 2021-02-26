const request = require('request');
const path = require('path');
const hbs = require('hbs');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//making app compitible with heroku and localhost both
const port = process.env.PORT || 3000


//setting up path
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const particialsPath= path.join(__dirname,'../templates/partials');


//setting up with views to see hbs files
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(particialsPath);


//setting up public dir for using outer componenets
app.use(express.static(publicDirectoryPath));
app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Bhargav kanodiya'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Bhargav kanodiya'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is the help desk',
        title:'Help',
        name:'Bhargav kanodiya'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You need to provide an address'
        })
    }
    geocode(req.query.address , (error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=> {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kanodiya Bhargav',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kanodiya Bhargav',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})