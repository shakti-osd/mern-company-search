const mongoose = require('mongoose')
const serviceSchema = new mongoose.Schema({
    serviceName:{
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


module.exports = mongoose.model('services',serviceSchema)