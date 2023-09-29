const mongoose = require('mongoose')


const OrdersSchema  =  new mongoose.Schema({
   u_id : {
      type : String,
      required : true
   },
   payment_mode :{
      type : String ,
      default : "Cash"
   },
   o_data : {
    type : Array,
    reuiqred : true
   },
   date : {
      type : String,
    default : new Date(Date.now()),
    reuiqred : true
   },
   ord_number : {
      type : String,
    reuiqred : true
   },
   status : {
    type : String,
    reuiqred : true,
    default : "Pending"
   }
})

const Orders  = mongoose.model('Orders' ,  OrdersSchema)

module.exports  = Orders;