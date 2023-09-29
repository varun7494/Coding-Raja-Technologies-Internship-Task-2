import CombineRouting from "./Routing/CombineRouting";
import { useState } from "react";
import axios from "axios";
import { Base_URL } from "./Config/BaseURL";
import { useEffect } from "react";

function App(){


 
  
  const [cartCount, setCartCount] = useState(0)
   
  function getCartCount(){
      let u_id =  localStorage.getItem('auth-id')
      axios.get(Base_URL + '/get-cart-count' , {params : {u_id : u_id} }).then((res)=>{
          console.log(res.data)
          console.log("hi")
        setCartCount(res.data.count)
        localStorage.setItem('count' ,res.data.count ) 
      }).catch((err)=>{
        setCartCount(0)

      })
    }


    useEffect(()=>{
      getCartCount()
    },[])



  
  return(
    <CombineRouting  countOfCart = {cartCount} />
  )


}

export default App;
