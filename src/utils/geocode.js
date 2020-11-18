const request = require('request')

const geocode = (address , callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWV5aW50LXRod2F5IiwiYSI6ImNraGluMmpmYTFkazQycm80eDk3emV0angifQ.1BQD2sADSpHkx4X8WWebBQ'

    request({url , json:true}, (error , {body})=>{
        if(error){
            callback('Cannot connect to sever' , undefined)
        } else if(body.features.length === 0){
            callback('Cannot find that place' , undefined)
        }else{
            callback(undefined, {
                longitude :body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name

            })
        }
    })
}

module.exports = geocode
