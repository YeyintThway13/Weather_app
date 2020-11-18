const request = require('request')

const forecast = (latitude,longitude , callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=ced8f4a5c766ac8acd689fca2c4f79e9&units=metric'

    request({url , json:true} , (error, {body})=>{
        if(error){
            callback(error,undefined)
        }else {
            callback(undefined, 'It is currently '+ body.main.temp + ' Degree')
        }
    })
}

module.exports = forecast