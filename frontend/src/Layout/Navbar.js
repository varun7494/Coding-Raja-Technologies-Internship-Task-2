import {useNavigate} from 'react-router-dom'
import '../Styles/Badge.css'

import axios from 'axios'
import { Base_URL } from '../Config/BaseURL'
import { useEffect, useState } from 'react'




function Navbar({countOfCart}){

  console.log("Hello-Carrt" ,  countOfCart)

    const navigate = useNavigate()

    


    const handleLogout = () =>{
        localStorage.removeItem('auth-id')
        window.location.reload()
    }


return(


    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class={`nav-item  ${window.location.href.includes('/home') ? 'active' : "" } `}>
        <a style={{cursor : "pointer"}} class="nav-link"  onClick={()=>{navigate('/home')}}>Home <span class="sr-only">(current)</span></a>
      </li>
      <li class={`nav-item  ${window.location.href.includes('/about') ? 'active' : "" } `} >
        <a style={{cursor : "pointer"}} class="nav-link"   onClick={()=>{navigate('/about')}}>About</a>
      </li>
      <li class={`nav-item  ${window.location.href.includes('/contact') ? 'active' : "" } `}>
        <a style={{cursor : "pointer"}} class="nav-link" onClick={()=>{navigate('/contact')}}>Contacts</a>
      </li>
      <li class={`nav-item  ${window.location.href.includes('/products') ? 'active' : "" } `}>
        <a style={{cursor : "pointer"}} class="nav-link" onClick={()=>{navigate('/products')}}>Products</a>
      </li>
      <li class={`nav-item  ${window.location.href.includes('/my_orders') ? 'active' : "" } `}>
        <a style={{cursor : "pointer"}} class="nav-link" onClick={()=>{navigate('/my_orders')}}>Orders History</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <div style={{marginRight : 20}}>

    <i onClick={()=> navigate('/mycart')} class="fa" style={{fontSize:'24px' ,  cursor:'pointer'}}>&#xf07a;</i>
    <span class='badge badge-warning' id='lblCartCount'>{countOfCart} </span>
      </div>
      <div style={{marginRight : 20}}>

    <i onClick={()=> navigate('/my_profile')} class="fa" style={{fontSize:'24px' ,  color:'green', cursor:'pointer'}}>&#xf4fc;</i>
      </div>


      {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={handleLogout} >Logout</button>
    </form>
  </div>
</nav>
)

}

export default Navbar