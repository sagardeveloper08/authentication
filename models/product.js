const mongoose = require('mongoose')

const productSchema  = new mongoose.Schema({
    name:String,
    price:Number,
})

exports.Product = mongoose.model('Product',productSchema)