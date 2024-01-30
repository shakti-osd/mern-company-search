const mongoose = require('mongoose')
const locationCountriesSchema = new mongoose.Schema({
    countryName:{
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


module.exports = mongoose.model('locationCountries',locationCountriesSchema)