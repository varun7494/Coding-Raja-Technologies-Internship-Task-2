const express = require('express');
const app = express();
const PORT  = 8909
const bodyParser = require('body-parser')
const MyRoutes  = require('./Routes/Routes')
const db  = require('./DB/DB')

const cors = require('cors')


app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended :  true}))

app.use((req , res , next )=> {
    res.setHeader('Access-Control-Allow-Origin' ,'*');
	res.setHeader('Access-Control-Allow-Methods' ,'GET , POST , PUT , PATCH , DELETE');
	res.setHeader('Access-Control-Allow-Headers' ,'Content-Type, X-Requested-With , Accept , Origin, authorization'  );
	res.setHeader('Access-Control-Expose-Headers' , 'authorization');
	next();
    
});
app.use('/' ,  MyRoutes)

app.use("/static",express.static(__dirname+ '/Uploads'));







app.listen(PORT , ()=>{
    console.log(`Server is Running on PORT : ${PORT}`)
})




