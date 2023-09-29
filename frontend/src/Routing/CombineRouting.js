import AuthRouting from "./AuthRouting";
import AllRouting from "./AllRouting";




function CombineRouting({countOfCart}){


   

return(
    <>
    { !localStorage.getItem('auth-id')  ?  <AuthRouting/> : <AllRouting  countOfCart = {countOfCart} />  }
    </>


)


}

export default CombineRouting