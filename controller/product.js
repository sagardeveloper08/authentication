const product = require('../models/product')

const addproduct = async(req,res)=>
{
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
       
    })
    product.save()
    res.status(200).json({message: product})
}

module.exports = {
    addproduct: addproduct
}