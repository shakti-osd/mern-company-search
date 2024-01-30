const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const locationCitiesSchema = new mongoose.Schema({
    countryId:{
        type:ObjectId,
        ref:"locationCountries"
    },
    cityName:{
        type:String,
        require:true,
        trim:true
    },
    isActive:{
        type: Boolean,
        require:true,
        trim:true
    }

})


module.exports = mongoose.model('locationCities',locationCitiesSchema)