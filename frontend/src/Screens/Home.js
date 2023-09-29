
import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { Base_URL } from '../Config/BaseURL'
import '../Styles/Home.css'
import {useNavigate} from 'react-router-dom'

import Lottie from 'react-lottie';
import * as NoDataFound from '../Lottie/NDF.json'
 

function Home({color}){
    const navigate = useNavigate()

    var [data , setData] = useState([])
    var [copyData  , setCopyData]  = useState([])

    function getProductsData(){

        axios.get(Base_URL + '/get-products').then((res_of_products)=>{
            let u_id =  localStorage.getItem('auth-id')
            axios.get(Base_URL + '/get-cart-count' , {params : {u_id : u_id} }).then((res_of_cart)=>{
                
            let prod_arr =  res_of_products.data.data;
            let cart_arr  = res_of_cart.data.data;

            for(let i =  0 ; i< prod_arr.length ;  i++)
            {
                for(let j  = 0 ;j < cart_arr.length  ; j ++)
                {
                   if(prod_arr[i]._id == cart_arr[j].p_id)
                   {
                    prod_arr[i]['disable'] =  true
                   }
                }
            }

                console.log(prod_arr)
            setData(prod_arr)
            setCopyData(prod_arr)


            }).catch((err)=>{
              
                  setData([])

            })

           


        }).catch((err)=>{
            setData([])

        })

    }


    

    useEffect(()=>{

    getProductsData()
       

    },[])


    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: NoDataFound,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };


 const addToCart =  (item) =>{
    console.log(item)
    var u_id =  localStorage.getItem('auth-id')
   let data  = {
    u_id : u_id,
    p_id : item._id,
    quantity : 1

    }
    axios.post(Base_URL + '/add-to-cart' , data).then((res)=>{
        toast.success(res.data.message)
        window.location.reload()
    }).catch((err)=>{
        toast.error(err.response.data.message)

    })
 }   

const handleViewMore = (item)=>{
    console.log(item)

    navigate(`/products/${item._id}` ,  {state : item})
}

 


const handleSearch = (e)=>{
   if(e.target.value)
   {
    var temp = copyData;
  var f_data =   temp.filter((el,i)=>{
        return  el.p_name.toLowerCase().includes(e.target.value.toLowerCase())
    })


    console.log(f_data)

    setData(f_data)
   }
   else{
    setData(copyData)
   }

   

}


    return(
        <>




        <div style={{marginTop:10}}>

     <div  style={{width:"80%" ,  margin:"auto" }} class="input-group">
  <input  onChange={handleSearch} type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="button" class="btn btn-outline-primary">search</button>
</div>
        </div>
        {Array.isArray(data) && data.length > 0 ?
        <>
        {data.map((el,i)=>(
            
            
            <div class="card" style={{width : "18rem" }}>
            <img class="card-img-top" src={el.image} alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title">{el.p_name}</h5>
              <p class="card-text"><span style={{color:'red' , fontWeight : "bold"  , fontSize : "20px"}} >{`-${el.discount}%`}</span><span style={{marginLeft : 20 ,fontSize:20}} >&#x20B9;</span>{ ( el.price  - (el.discount / 100) * el.price) }<span></span></p>
              <p class="card-text"> M.R.P. <span>&#x20B9;</span>  <del>{el.price}</del></p>
              
              <a onClick={()=>{handleViewMore(el)}} class="btn btn-primary"  style={{marginRight : 10}} >View More</a>
              <button  disabled={el.disable == true ? true : false} onClick={()=>{addToCart(el)}} class="btn btn-success">{  el.disable == true ? "Already Aded" : 'Add To Cart'}</button>
            </div>
          </div>
           
        ))}
       
                </> :  
                

                <Lottie options={defaultOptions}
              height={400}
              width={400}
              isStopped={false}
              isPaused={false}/>
                
                }
        </>

    )


}
export default Home;