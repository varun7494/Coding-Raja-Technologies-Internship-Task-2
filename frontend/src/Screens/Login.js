

import '../Styles/Login.css'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { Base_URL } from '../Config/BaseURL'
import {useNavigate} from 'react-router-dom'
function Login(){

    
    const [values , setValues] =  useState({
        email : "",
        password : "",
    })

    function handleInputs(e){
        setValues({...values , [e.target.name] : e.target.value})
    }

    function handleSubmit(){
        console.log("hi")
       
        var ref_email  =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(!ref_email.test(values.email))
        {
            toast.error('Pelase Enter a valid Email')

        }
        else if(values.password.trim().length  < 7)
        {
            toast.error('Pelase Enter a 6 Digit Password')

        }
        else{
            axios.post(Base_URL + '/login-user' , values).then((res)=>{
                console.log(res)
                toast.success(res.data.message)
                localStorage.setItem('auth-id'  , res.data.data._id)
                localStorage.setItem('email'  , res.data.data.email)
                window.location.reload()

            }).catch((err)=>{
                console.log(err)
                toast.error(err.response.data.message)

            })

        }
    }


    return(

        <>
        <div className="container">
        {/* <form> */}
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" name='email' value={values.email} onChange={handleInputs}  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" name='password' value={values.password} onChange={handleInputs} class="form-control" id="exampleInputPassword1" placeholder="Password" />
  </div>
  <div class="form-group form-check">
    <h5>Don't have an account <Link  to='/register'>Register Here</Link> </h5>
  </div>
  <div class="form-group form-check">
    <h5>Forgot Your Password <Link  to='/forgotPassword'>Reset Now</Link> </h5>
  </div>
  <button onClick={handleSubmit}  type="submit" class="btn btn-primary">Submit</button>
{/* </form> */}
        </div>

        </>
    )


}

export default Login