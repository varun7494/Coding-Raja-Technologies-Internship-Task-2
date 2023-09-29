const mongoose = require('mongoose')


const ProductSchema  =  new mongoose.Schema({

   p_name : {
    type : String,
    reuiqred : true
   },
   price : {
    type : String,
    reuiqred : true
   },
   category : {
    type : String,
    reuiqred : true
   },
   image : {
    type : String,
    reuiqred : true
   },
   discount : {
    type : String,
    reuiqred : true
   }


})

const Products  = mongoose.model('Products' ,  ProductSchema)

module.exports  = Products;