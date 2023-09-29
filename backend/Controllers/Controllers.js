const UserSchema = require('../Schemas/UserSchema');
const ProductSchema  =  require('../Schemas/ProductsSchema')
const bcrypt = require('bcrypt');
const CartSchema  = require('../Schemas/CartSchema')
const OrdersSchema = require('../Schemas/OrdersSchema')
const OtpSchema =  require('../Schemas/OtpSchema')

const nodemailer = require("nodemailer");

const moment = require('moment')


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'webt5987@gmail.com',
      pass: 'ofmzlrqizewzxngj'
    }
  });


exports.uploadFile= (req,res)=>{

    console.log(req.body.name)
    console.log(req.files[0].originalname)

    res.send({message : "File Uploaded Successfully"})

}


  exports.verifyOtp = (req,res)=>{
    const {email , otp , n_pass } = req.body

    UserSchema.find({email : email}).then((d1)=>{
        if(d1.length  > 0)
        {
            //console.log(d1)

            var dummy  = d1[0]['_id'].toString()
            OtpSchema.find({u_id :dummy }).then((d2)=>{
                //console.log(d2)
                //console.log(d1[0]['_id'])
                if(d2.length > 0)
                {

                        if(d2[0].otp == otp)
                        {

                            if((Number(new Date(Date.now))  - d2[0].time) > 20 )
                            {
                                res.status(400).send({status : 400 , message : "OTP Expired" })
 
                            }
                            else
                            {
                                bcrypt.genSalt(10, function(err ,  salt){
                                    if(err)
                                    {
                                        //console.log(err)
                                        res.status(500).send({status : 500 , message : "Soemthing Went Wrong || Try Again" })

                                    }else
                                    {
                                        bcrypt.hash(n_pass ,  salt , function(err ,  hash){
                                            if(err)
                                            {
                                                //console.log(err)

                                                res.status(500).send({status : 500 , message : "Soemthing Went Wrong || Try Again" })
        
                                            }else
                                            {
                                               UserSchema.updateOne({_id : d1[0]._id } , {$set:{password : hash}}).then((d3)=>{
                                                if(d3.modifiedCount == 1 )
                                                {   

                                                  OtpSchema.deleteOne({u_id : d1[0]._id}).then((d4)=>{

                                                    if(d4.deletedCount == 1 )
                                                    {


transporter.sendMail({
                        from: '"Varun 👻" <webt5987@gmail.com>', // sender address
                        to: email, // list of receivers
                        subject:  "Password Reset Successfully" , // Subject line
                        text: `Hi , ${d1[0].name}  , Your password has been Reset Successfully Just Now :)`, // plain text body
                        html: `Hi , ${d1[0].name}  , Your password has been Reset Successfully Just Now :)`, // html body
                      }).then((result)=>{
                        //console.log(result)
                
                        res.status(200).send({status : 200 , message : "Password Reset Successfully" , mailId  : result.messageId})
                
                      }).catch((err)=>{
                        //console.log(err)
                        res.status(500).send({status : 500 , message : "Password Reset  Failed" , mailId  : null})
                
                      })
                                                    }else
                                                    {
                                                        res.status(500).send({status : 500 , message : "Password Reset Failed|| Try Again" })

                                                    }

                                                  }).catch((err)=>{
                                                    //console.log(err)
                                                    res.status(500).send({status : 500 , message : "Password Reset Failed|| Try Again" })

                                                  })  

                                                }else
                                                {
                                                    res.status(500).send({status : 500 , message : "Password Reset Failed|| Try Again" })

                                                }

                                               }).catch((err)=>{
                                                //console.log(err)
                                                res.status(500).send({status : 500 , message : "Soemthing Went Wrong || Try Again" })

                                               })  
                                            }
                                        })
                                    }
                                })
                            }

                        }else
                        {
                            res.status(400).send({status : 400 , message : "Invalid OTP" })

                        }

                }
                else
                {
                    //console.log("A")
                    res.status(400).send({status : 400 , message : "Soemthing Went Wrong || Try Again" })

                }


            }).catch((err)=>{
                //console.log(err)

                res.status(500).send({status : 500 , message : "Soemthing Went Wrong || Try Again" })

            })


        }
        else
        {
            res.status(400).send({status : 400 , message : "Invalid Email" })
 
        }
    }).catch((err)=>{
        //console.log(err)

        res.status(500).send({status : 500 , message : "Soemthing Went Wrong || Try Again" })

    })

    

  }


  exports.forgotPassword = (req,res)=>{

    const {u_mail } =  req.body;
    var otp = Math.floor(Math.random() *  567456).toString().padStart(6 , '0')


    UserSchema.find({email : u_mail}).then((d1)=>{

        if(d1.length > 0)
        {
            OtpSchema.insertMany({u_id : d1[0]._id , email :d1[0].email,  otp : otp , time : Number(new Date(Date.now())) }).then((o_data)=>{
                if(o_data.length > 0)
                {
                    transporter.sendMail({
                        from: '"Varun 👻" <webt5987@gmail.com>', // sender address
                        to: u_mail, // list of receivers
                        subject:  "Password Reset OTP" , // Subject line
                        text: `Hi , ${u_mail}  , Use this OTP : ${otp}  , to reset your Password`, // plain text body
                        html: `<b>Hi , ${u_mail}  , Use this OTP : ${otp}  , to reset your Password<b>`, // html body
                      }).then((result)=>{
                        //console.log(result)
                
                        res.status(200).send({status : 200 , message : "OTP  Sent Successfully on your Email" , mailId  : result.messageId})
                
                      }).catch((err)=>{
                        //console.log(err)
                        res.status(500).send({status : 500 , message : "Mail Sent Failed" , mailId  : null})
                
                      })
                }
                else
                {
                    res.status(500).send({status : 500 , message : "OTP Sent Failed || " , mailId  : null})
 
                }
            }).catch((err)=>{
                res.status(500).send({status : 500 , message : "OTP Sent Failed || Server Error" , mailId  : null})

            })

            
        }
        else{
            res.status(400).send({status : 400 , message : "You are not a registered User || Please Register Yourself First" })
  
        }

    }).catch((err)=>{
        res.status(500).send({status : 500 , message : "Something Went Wrong !! Please Try Again" })

    })

    

  

  }



exports.getApi =  (req,res) =>{
    ////console.log(req.query.number)
if(Number(req.query.number) % 2 == 0)
{

    res.send(`<h1>Hi || ${req.query.number} is  Even Number</h1>`)    
}
else
{

    res.send(`<h1>Hi || ${req.query.number} is  Odd Number</h1>`)    

}
}



exports.loginUser =  (req,res )=>{
    const {email , password} =  req.body;

    UserSchema.find({email :  email}).then((result)=>{
        ////console.log(result)
        if(result.length > 0)
        {
            
            bcrypt.compare(password ,  result[0].password ,  function(err, status){

                if(err)
                {
                    res.status(500).send({status : 500 , message :"Something Went Wrong || Try Again"})

                }
                else
                {
                    if(status == true)
                    {
                        res.status(200).send({status : 200 , message :"Login Sucessfully"  , data :  result[0]})
                    }
                    else
                    {
                        res.status(400).send({status : 400 , message :"Incorrect Password"})

                    }

                }

            })

        }
        else
        {
            res.status(400).send({status : 400 , message :"You Are not Registerd || Please Register First"})

        }
    }).catch((err)=>{
        res.status(500).send({status : 500 , message :"Something Went Wrong || Try Again"})

    })




}

exports.RegisterUser  = (req,res) =>{
  
    const {name , email , mobile , address, password, gender} =  req.body;

    bcrypt.genSalt(10, function(err ,  salt){
        if(err)
        {
            res.status(400).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})

        }
        else
        {
          
            bcrypt.hash(password ,  salt , function(err, hash){

                if(err)
                {
                    res.status(400).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})
        
                }
                else
                {
                    UserSchema.insertMany({name  : name , address : address ,  email : email ,  mobile : mobile ,  password :  hash , gender : gender}).then((result)=>{

                        if(result.length > 0)
                        {
                            res.status(200).send({status :  200 , message : "User Registered Successfully"})
                        }
                        else
                        {
                            res.status(400).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})
                
                        }
                
                    }).catch((err)=>{
                
                if(err.name == 'ValidationError')
                {
                
                    res.status(400).send({status :  400 , message : `${err.message.split('Path')[1]}`})
                }
                else if(err.name == 'MongoBulkWriteError' && err.code == 11000){
                
                    res.status(400).send({status :  400 , message : ` User Alreday exists with these details => ${err.message.split('{')[1].replace('}' , '')}`})
                
                }
                else
                {
                
                    res.status(500).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})
                }
                
                    })
                }

            }  )
        }
    })
}


exports.RemoveItemFromCart = (req,res) =>{
    const {c_id} =  req.query
    CartSchema.deleteOne({_id : c_id}).then((data3)=>{
        ////console.log(data3)
        if(data3.deletedCount == 1)
        {

            res.status(200).send({status :  200 , message : "Product Removed Successfully"})
        }else
        {
            res.status(400).send({status :  400 , message : "Unable to Remove Product !! Please Try Again"})

        }


    }).catch((err)=>{
        res.status(400).send({status :  400 , message : "Something Went Wrong !! Please Try Again"})

    })


}

exports.addAddress = (req,res) =>{
    const {u_id , addresses }  = req.body;

    UserSchema.updateOne({_id : u_id } , {$set : {  all_addresses :   addresses    }}).then((data2)=>{

        if(data2.modifiedCount == 1)
        {
            res.status(200).send({status :  200 , message : "Updated Successfully"})

        }
        else
        {
            res.status(400).send({status :  400 , message : "Not Updated !! Please Try Again"})

        }


    }).catch((err)=>{
        res.status(400).send({status :  400 , message : "Something Went Wrong !! Please Try Again"})

    })
  

}

function calculateSubtotal(el){
    var total  =  0

    if(Array.isArray(el) && el.length > 0)
      {
        for(let i = 0 ; i < el.length ;  i++)
        {
        total = total +  (el[i].pro_data.price - (el[i].pro_data.discount /  100) * el[i].pro_data.price)
        }
      
      
      }

      console.log(total)

      return total

  }

exports.addOrder = (req,res) =>{

const {u_id , order_data } =  req.body;
var ordn = Math.floor(Math.random() * 167859456).toString().padStart(6, 0);


OrdersSchema.insertMany({u_id : u_id , o_data : order_data , ord_number : ordn}).then((result1)=>{


    console.log(order_data)

    var sub_str = ""

    for(let i = 0 ; i < order_data.length ; i++)
    {

sub_str = sub_str + 
`  <tr>
      <th scope="row">${i+1}</th>
      <td>${order_data[i].pro_data.p_name}</td>
      <td>${order_data[i].quantity}</td>
      <td>${order_data[i].pro_data.price}</td>
      <td>${order_data[i].pro_data.discount}</td>
      <td>${(order_data[i].pro_data.price - (order_data[i].pro_data.discount /  100) * order_data[i].pro_data.price) }</td>
      <td><img src=${order_data[i].pro_data.image} style="width:100px;height:100px" /></td>
    </tr> 

  `
    }

    var str =  `
    <html>
    <head>
    <script src="https://kit.fontawesome.com/b1f8a69427.js" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/b1f8a69427.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </head>
    <body>
    <h1>Hi  Your Order has been Placed Successfully Just Now :)</h1> <br>
    <div class="card" style="width : "90%">
  <div class="card-body">
    <h5 class="card-title">Order Date : ${moment(new Date(Date.now())).format('MMMM Do YYYY, h:mm:ss a')}</h5>
    <h5 class="card-title">Order Number : ${ordn}</h5>
    <h5 class="card-title">Payement Mode : Cash</h5>
    <h5 class="card-title" style="color:orange">Order Status : Pending</h5>
    <p class="card-text">

    <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">SR#</th>
      <th scope="col">Product Name</th>
      <th scope="col">Qunatity</th>
      <th scope="col">MRP</th>
      <th scope="col">Discount</th>
      <th scope="col">Price After Discount</th>
      <th scope="col">Image</th>
    </tr>
  </thead>
  <tbody>
            ${sub_str}
  </tbody>
</table>

    </p>
    <a href="#" class="btn btn-success">Total Amount : ${calculateSubtotal(order_data)} </a>

  </div>
</div>
</body>
</html>
`;

   
    if(result1.length > 0)
    {

        CartSchema.deleteMany({u_id : u_id}).then((re_2)=>{

           //console.log(re_2)
            if(re_2.deletedCount > 0)
            {


                // res.status(200).send({status: 200, message : "Order Placed Successfully"})
                transporter.sendMail({
                    from: '"Bhanu Chouhan 👻" <webt5987@gmail.com>', // sender address
                    to: req.body.email, // list of receivers
                    subject:  "Order Placed Successfully" , // Subject line
                    text: `Hi  Your Order been Placed Successfully Just Now :)`, // plain text body
                    html: str, // html body
                  }).then((result)=>{
                    //console.log(result)
            
                    res.status(200).send({status : 200 , message : "Order Has Been Placed Successfully" , mailId  : result.messageId})
            
                  }).catch((err)=>{
                    console.log(err)
                    res.status(500).send({status : 500 , message : "Order Placed  Failed" , mailId  : null})
            
                  })

            }else
            {
                res.status(400).send({status: 400, message : "Order No Placed || Try Again"})

            }
                
        }).catch((err)=>{
           console.log(err)
            res.status(500).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})

        })

    }
    else
    {
        res.status(400).send({status: 400, message : "Order No Placed || Try Again"})

    }
}).catch((err)=>{
   console.log(err)
    res.status(500).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})

})




}


exports.getUserAddresses = (req,res) =>{

    const {u_id }  = req.query;

    UserSchema.find({_id : u_id}).then((result1)=>{
        if(result1.length > 0)
        {
//console.log(result1[0].hasOwnProperty('all_addresses') )
//console.log( Array.isArray(result1[0]['all_addresses']))
//console.log(result1[0]['all_addresses'].length > 0)

            if(Array.isArray(result1[0]['all_addresses']) && result1[0]['all_addresses'].length > 0)
            {
               ////console.log("A")
                res.status(200).send({status : 200 , message : "Adrress Found", data : result1[0]['all_addresses']  })
            }
            else
            {
               ////console.log("B")

                res.status(400).send({status : 400 , message : "No Address Found to Deliver"  })

            }
        }
        else
        {
            res.status(400).send({status :  400 , message : "Something Went Wrong !! Please Try Again"})

        }
    }).catch((err)=>{
        res.status(500).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})

    })

}


exports.updateCartQuantity = (req,res)=>{
    var {c_id ,type} =  req.body;

    CartSchema.find({_id  :c_id }).then((data1)=>{

        if(data1.length > 0)
        { 


            if(type == "INCRE")
            {

            
            CartSchema.updateOne({_id : c_id } , {$set : {  quantity :   data1[0].quantity + 1  }}).then((data2)=>{

                if(data2.modifiedCount == 1)
                {
                    res.status(200).send({status :  200 , message : "Updated Successfully"})

                }
                else
                {
                    res.status(400).send({status :  400 , message : "Not Updated !! Please Try Again"})

                }


            }).catch((err)=>{
                res.status(400).send({status :  400 , message : "Something Went Wrong !! Please Try Again"})

            })

        }
        else
        {

            ////console.log("Quantity" , data1[0].quantity > 1)
            if(type == 'DECRE' && data1[0].quantity > 1)
            {

            
            CartSchema.updateOne({_id : c_id } , {$set : {  quantity :   data1[0].quantity - 1  }}).then((data2)=>{

                if(data2.modifiedCount == 1)
                {
                    res.status(200).send({status :  200 , message : "Updated Successfully"})

                }
                else
                {
                    res.status(400).send({status :  400 , message : "Not Updated !! Please Try Again"})

                }


            }).catch((err)=>{
                res.status(400).send({status :  400 , message : "Something Went Wrong !! Please Try Again"})

            })
        }else
        {

            CartSchema.deleteOne({_id : c_id}).then((data3)=>{
                ////console.log(data3)
                if(data3.deletedCount == 1)
                {

                    res.status(200).send({status :  200 , message : "Product Removed Successfully"})
                }else
                {
                    res.status(400).send({status :  400 , message : "Unable to Remove Product !! Please Try Again"})

                }


            }).catch((err)=>{
                res.status(400).send({status :  400 , message : "Something Went Wrong !! Please Try Again"})

            })


        }
        }

        }
        else
        {
            res.status(400).send({status :  400 , message : "Something Went Wrong !! Please Try Again"})

        }

    }).catch((err)=>{
        res.status(500).send({status :  500 , message : "Something Went Wrong !! Please Try Again"})

    })




}


exports.addToCart =(req,res)=>{
const {u_id ,  p_id  ,  quantity } = req.body;

CartSchema.insertMany({u_id : u_id , p_id ,  quantity : quantity}).then((result)=>{
    if(result.length > 0)
    {
        res.status(200).send({status : 200 , message : "Product Added into Cart"})
    }
    else
    {
        res.status(400).send({status : 400 , message : "Product Not Added into Cart || Please Try Again"})

    }


}).catch((err)=>{
    res.status(500).send({status : 400 , message : "Something Went Wrong || Please Try Again"})

})

}

async function getProductFromID(id){

    var pd =  await ProductSchema.find({_id : id});
    // ////console.log("PD" , pd)
    return pd[0]


}

exports.getCartProducts2 =async (req,res) =>{
    var data_final =  []
    try{

        const {u_id} = req.query;

        // Call the first API (api1)
    const response1 = await   CartSchema.find({u_id : u_id});
    const data1 = response1;
    for( let i = 0 ; i < data1.length ;  i++  )
    {
        data_final.push({...data1[i]._doc , pro_data : {}})
        const response2 = await ProductSchema.findOne({_id : data1[i].p_id});
        const data2 = response2;
        // ////console.log("Data-2" , data2)
        data_final[i].pro_data =  data2
        
    }
    res.status(200).send({data : data_final})



    }catch(err)
    {
        ////console.log(err)
        res.status(500).send({status : 500 ,   message : "Something Went Wrong || Please Try Again"})
 
    }

}




exports.getCartProducts =  async (req,res) =>{
    const {u_id} = req.query;
    CartSchema.find({u_id : u_id}).then((c_result)=>{
        var cart_arr  =  c_result;
        ////console.log(c_result.length)



        if(cart_arr.length > 0)
        {
           

            ProductSchema.find({}).then((pr_res)=>{
                var new_data  =  []
                if(pr_res.length > 0)
                {

                        for(let i  =  0  ; i < c_result.length ; i++)
                        {
                            // ////console.log("A")
                            for(let j =  0  ;  j  <  pr_res.length ;  j++)
                            {
                                // ////console.log("B")
                                if(c_result[i].p_id == pr_res[j]._id)
                                {
                                    // ////console.log("C")
                                    new_data.push({...c_result[i]._doc , pro_data : pr_res[j]   })
                                    // ////console.log(new_data)
                                }
                            }
                        }

                        res.status(200).send({status : 200 , data : new_data,  count : cart_arr.length,  message : "Something Went Wrong || Please Try Again"})

                }
                else
                {
                    res.status(200).send({status : 200 , data : [],  count : 0 ,  message : "Something Went Wrong || Please Try Again"})

                }
            }).catch((err)=>{
                res.status(500).send({status : 500 ,   message : "Something Went Wrong || Please Try Again"})

            })

            


        }
        else
        {
            res.status(200).send({status : 200 , data : [],  count : 0 ,  message : "Something Went Wrong || Please Try Again"})

        }

    }).catch((err)=>{
        res.status(500).send({status : 500 ,   message : "Something Went Wrong || Please Try Again"})

    })
}

exports.getCartCountByUserID = (req,res) =>{
    ////console.log(req.query)
    const {u_id} = req.query

    CartSchema.find({u_id : u_id}).then((result)=>{
        ////console.log(result)
        if(result.length > 0)
        {
            res.status(200).send({status : 200 , data : result,  count : result.length ,  message : "Something Went Wrong || Please Try Again"})

        }
        else
        {
            res.status(200).send({status : 200 , data : result,  count : result.length , message : "Something Went Wrong || Please Try Again"})

        }
    }).catch((err)=>{
        res.status(500).send({status : 500 ,   message : "Something Went Wrong || Please Try Again"})

    })

}


exports.addProduct  =  (req,res)=>{
    var image  = "http://localhost:8909/static/" +  req.files[0].originalname
const {p_name , price , category , discount} = req.body;



ProductSchema.insertMany({p_name : p_name, price : price , image : image , category  : category , discount : discount}).then((result)=>{
    if(result.length > 0)
    {
        res.status(200).send({status : 200 , message : "Product Added Successfully"})
    }
    else
    {
        res.status(400).send({status : 400 , message : "Product Not Added || Try Again"})

    }

}).catch((err)=>{
    res.status(500).send({status : 500 , message : "Something Went Wrong || Try Again"})

})




}


exports.FetchAllOrders  = (req,res)=>{

    const {u_id} =  req.query

    OrdersSchema.find({u_id  :u_id}).then((res1)=>{

        if(res1.length > 0)
        {
            res.status(200).send({status : 200 , data : res1, message : "Product Added Successfully"})

        }
        else{
            res.status(400).send({status : 400 , data : [], message : "Something Went Wrong || Try Again"})

        }



    }).catch((err)=>{
        res.status(500).send({status : 500 , message : "Something Went Wrong || Try Again"})

    })


}



exports.getAllProducts  =  (req,res) =>{

    ProductSchema.find({}).then((result)=>{
        res.status(200).send({status : 200 , data  :  result})
    }).catch((err)=>{
        res.status(500).send({status : 500 , data  :  []})

    })

}