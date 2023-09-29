import { useState, useEffect } from "react"
import { Base_URL } from "../Config/BaseURL"
import axios from "axios"
import {toast} from 'react-toastify'
import moment from 'moment'



function  MyOrders(){

    const [data , setData] =  useState([])



    function fetchOrders(){

        var uid = localStorage.getItem('auth-id')


        axios.get(Base_URL+'/fetch_orders' , {params : {u_id  :uid}} ).then((res)=>{

console.log(res.data.data) ;          

setData(res.data.data.reverse())



        }).catch((err)=>{
            toast.error(err.response.data.message)
        })

    }


    useEffect(()=>{
        fetchOrders()

    },[])



    function calculateSubtotal(el){
      var total  =  0

      if(Array.isArray(el.o_data) && el.o_data.length > 0)
        {
          for(let i = 0 ; i < el.o_data.length ;  i++)
          {
          total = total +  (el.o_data[i].pro_data.price - (el.o_data[i].pro_data.discount /  100) * el.o_data[i].pro_data.price)
          }
        
        
        }

        console.log(total)

        return total

    }



return(

    <>
    {Array.isArray(data) && data.length > 0? 
    <>
    {data.map((el,i)=>(
<>

<div class="card" style={{width : "90%"}}>
  <div class="card-body">
    <h5 class="card-title">Order Date : {moment(el.date).format('MMMM Do YYYY, h:mm:ss a')}</h5>
    <h5 class="card-title">Order Number : {el.ord_number}</h5>
    <h5 class="card-title">Payement Mode : {el.payment_mode}</h5>
    <h5 class="card-title" style={{color: el.status == "Pending" ? "orange" : "green"}}>Order Status : {el.status}</h5>
    <p class="card-text">

    <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">SR#</th>
      <th scope="col">Product Name</th>
      <th scope="col">MRP</th>
      <th scope="col">Discount</th>
      <th scope="col">Price After Discount</th>
      <th scope="col">Image</th>
    </tr>
  </thead>
  <tbody>

     { el.o_data && Array.isArray(el.o_data) && el.o_data.length > 0 ?
    <>
    {el.o_data.map((d, i)=>(

<tr>
      <th scope="row">{i+1}</th>
      <td>{d.pro_data.p_name}</td>
      <td>{d.pro_data.price}</td>
      <td>{d.pro_data.discount}</td>
      <td>{(d.pro_data.price - (d.pro_data.discount /  100) * d.pro_data.price) }</td>
      <td><img src={d.pro_data.image} style={{width:100, height:100}} /></td>
    </tr> 
    ))}
    
    </>
    : null}

  </tbody>
</table>

    </p>
    <a href="#" class="btn btn-success">Total Amount : {calculateSubtotal(el)} </a>
  </div>
</div>


</>
    ))}
   
    </>
    : null}
   </>
)


}

export default MyOrders