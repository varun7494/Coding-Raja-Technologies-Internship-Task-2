import {useLocation} from 'react-router-dom';



function ViewProduct(){

    const {state} =  useLocation()
    console.log(state)


    return(

        
        <div class="card" style={{width : "18rem" }}>
        <img class="card-img-top" src={state.image} alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{state.p_name}</h5>
          <p class="card-text"><span style={{color:'red' , fontWeight : "bold"  , fontSize : "20px"}} >{`-${state.discount}%`}</span><span style={{marginLeft : 20 ,fontSize:20}} >&#x20B9;</span>{ ( state.price  - (state.discount / 100) * state.price) }<span></span></p>
          <p class="card-text"> M.R.P. <span>&#x20B9;</span>  <del>{state.price}</del></p>
          
          {/* <a onClick={()=>{handleViewMore(el)}} class="btn btn-primary"  style={{marginRight : 10}} >View More</a> */}
          <a href="#" class="btn btn-success">Add To Cart</a>
        </div>
      </div>

    )


}


export default ViewProduct