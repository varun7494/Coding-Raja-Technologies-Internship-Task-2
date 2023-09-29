
import { useState  , useEffect} from "react"
import axios from "axios"
import { Base_URL } from "../Config/BaseURL"
import {toast} from 'react-toastify'
import  {useNavigate , useLocation} from 'react-router-dom'
import Lottie from 'react-lottie';
import * as LoadingAnimation from '../Lottie/Loading.json'

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: LoadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

function Checkout(){

    const navigate = useNavigate()

    const {state } = useLocation()
    console.log(state)

    var [addressFlag , setAddressFlag] = useState(false)
    var [getAddress , setGetAddress] = useState([])
    var [loading , setLoading ]  = useState(false)

    var [new_address, setNewAddress] = useState({
        house : "",
        street : "",
        landmark  :"",
        pincode : "",
        alter_mobile  :"",
        primary  : true
    })


    function checkAddress (){
        var id  = localStorage.getItem('auth-id')

        axios.get(Base_URL + '/get-user-addresses' , {params : {u_id  :id}}).then((res)=>{
            console.log(res.data.data)
            setGetAddress(res.data.data)
            toast.success(res.data.message)
            setAddressFlag(false)


        }).catch((err)=>{
            setAddressFlag(true)
            toast.error(err.response.data.message)
        })
    }


    useEffect(()=>{
        checkAddress()

    },[])



    const hanldeInput = (e) =>{
        setNewAddress({...new_address , [e.target.name]  :e.target.value})
    }


    const handleAddNewAddressButton = () =>{

        var data  =  {

            u_id : localStorage.getItem('auth-id'),
            addresses  : [new_address]

        }

        axios.post(Base_URL+'/update-addresses' , data).then((res)=>{
            toast.success(res.data.message)
            checkAddress()
            
        }).catch((err)=>{
            toast.error(err.response.data.message)

        })

    }


    
const calculateSubtotal = () =>{

    var temp   =  state;
    var subt = 0
  
    for(let i = 0 ; i < temp.length ; i++)
    {
        subt =  subt + (Number(temp[i].pro_data.price)  - (Number(temp[i].pro_data.discount) / 100) * Number(temp[i].pro_data.price))
    }
  
    console.log(subt)
    return subt
  
  }

  const placeMyOrder =  ()=>{

    var data = {
        u_id  :localStorage.getItem('auth-id'),
        order_data  : state,
        email : localStorage.getItem('email')
    }

    axios.post(Base_URL+'/place_order' , data).then((res)=>{
        toast.success(res.data.message)

        navigate('/mycart')
        
    }).catch((err)=>{
      console.log(err)
        toast.error(err.response.data.message)

    })
  }


  const handleAddNewAddress= ()=>{
    setAddressFlag(true)
  }
    return(

      <>
      {loading == false ?
    

        <>
        {addressFlag == true  ?  
        <div style={{  width:'80%' ,  margin:'auto'}}>
        <div class="form-group">
          <label for="exampleFormControlInput1">House No.</label>
          <input type="text" name="house" value={new_address.house} onChange={hanldeInput} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Street.</label>
          <input type="text" name="street" value={new_address.street} onChange={hanldeInput} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Landmark</label>
          <input type="text" name="landmark" value={new_address.landmark} onChange={hanldeInput} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Pincode</label>
          <input type="text" name="pincode" value={new_address.pincode} onChange={hanldeInput} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Alternate Mobile.</label>
          <input type="number" name="alter_mobile" value={new_address.alter_mobile} onChange={hanldeInput} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <button type="submit" class="btn btn-primary mb-2"  onClick={handleAddNewAddressButton} >Add Address</button>

      
      </div>
         :
    
         <div style={{  width:'80%' , display:"flex" ,  justifyContent  :"center" , alignItems : "center", margin:'auto'}}>
          <div class="card" style={{width:'18rem'}}>
  <div class="card-body">
    <p class="card-text"><i class="fa fa-circle-check" style={{fontSize : 20 , color:"green"  ,marginRight : 5}}></i>Your order is eligible for FREE Delivery. Select this option at checkout. Details</p>
    <h5 style={{fontSize:15}} class="card-title">Subtotal : ( {`${state.length} Items`} : {calculateSubtotal()} )</h5>
    <a onClick={placeMyOrder} class="btn btn-primary"  style={{borderRadius : 10 , backgroundColor : "#F7CA00" ,  width : "100%"}} >Place Order</a>
    <a onClick={()=>{handleAddNewAddress()}} class="btn btn-primary" style={{width  :"100%" ,  borderRadius:10 ,  marginTop  :10}}>Add New Address</a>
  </div>
</div>
 
       
       </div>
}

<hr></hr>

<>
{Array.isArray(getAddress) && getAddress.length > 0 ?

<>
{getAddress.map((el,i)=>(

<div class="card" style={{width: '18rem'}}>
  <div class="card-body">
    <h5 class="card-title">Primary Address</h5>
    <p class="card-text">
        <h5>{el.house}</h5>
        <h5>{el.street}</h5>
        <h5>{el.landmark}</h5>
        <h5>{el.pincode}</h5>
    </p>
 
  </div>
</div> 

))}

</>
: null }
        
        </>


</> :
 <>

 <Lottie options={defaultOptions}
 height={400}
 width={400}
 isStopped={false}
 isPaused={false}/>
 <h4 style={{textAlign:"center" ,  color:"red"}}>Please Wait While we are fetching Data</h4>
   
 </>
} 


</>
    )


}

export default Checkout