import { useState } from 'react'
import '../Styles/Login.css'
import {Link , useNavigate} from 'react-router-dom'
import { Base_URL } from '../Config/BaseURL'
import axios from 'axios';
import {toast} from 'react-toastify'



function Register(){
    const navigate = useNavigate()

    const [values , setValues] =  useState({
        name :"",
        mobile : "",
        email : "",
        password : "",
        address : "",
        gender  :"male"
    })

    function handleInputs(e){
        setValues({...values , [e.target.name] : e.target.value})
    }

    function handleSubmit(){
        var reg_mobile  =  /^[6-9]\d{9}$/
        var ref_email  =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(values.name.trim() == "" || values.name.trim().length == 1)
        {
            toast.error('Please Enter Your Name')
        }
        else if(!reg_mobile.test(values.mobile)){
            toast.error('Pelase Enter a valid mobile Number')
            
        }
        else if(!ref_email.test(values.email))
        {
            toast.error('Pelase Enter a valid Email')

        }
        else if(values.address.trim() == "" || values.address.trim().length == 1){
            toast.error('Pelase Enter a valid Address')

        }
        else if(!values.gender){
            toast.error('Pelase Select Gender')


        }
        else{
            axios.post(Base_URL + '/add-user' , values).then((res)=>{
                console.log(res)
                toast.success(res.data.message)
                navigate('/login')

            }).catch((err)=>{
                console.log(err)
                toast.error(err.response.data.message)

            })

        }
    }

    function handleGenderSelect(e){
       setValues({...values ,  ['gender'] : e.target.value})

    }


    return(

        <>
         <>
        <div className="container">
        {/* <form> */}
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" name='name' onChange={handleInputs} class="form-control" id="exampleInputEmail1"  placeholder="Enter Your Name" />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" name='email' onChange={handleInputs} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Mobile</label>
    <input type="number" name='mobile' onChange={handleInputs} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mobile Number" />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Mobile</label>
    <input type="text" name='address' onChange={handleInputs} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Address" />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Gender</label>
    <select  onChange={handleGenderSelect} class="form-control">
  <option value={'male'}>Male</option>
  <option value={'female'} >Female</option>
</select>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="text" name='password' onChange={handleInputs} class="form-control" id="exampleInputPassword1" placeholder="Password" />
  </div>
  <div class="form-group form-check">
    <h5>Alreday have an account <Link  to='/login'>Login Here</Link> </h5>
  </div>
  <button type="submit"  onClick={handleSubmit} class="btn btn-primary">Submit</button>
{/* </form> */}
        </div>

        </>
        </>
    )


}

export default Register