const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const subServiceSchema = new mongoose.Schema({
    subServiceName:{
        type:String,
        require:true,
        trim:true
    },
    isActive:{
        type: Boolean,
        require:true,
        trim:true
    },
    serviceId:{
        type:ObjectId,
        ref:"Services"
    }
})

module.exports = mongoose.model('subservices',subServiceSchema)