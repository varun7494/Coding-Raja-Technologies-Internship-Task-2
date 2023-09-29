import { useState  ,  useEffect} from "react"

import Lottie from 'react-lottie';
import * as LoadingAnimation from '../Lottie/Loading.json'
import { Base_URL } from "../Config/BaseURL";
import axios from 'axios'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
 





function ForgtoPassword(){
    const navigate = useNavigate()





    const [values , setValues ] = useState({
        email : "",
        loading : false,
        otp_flag :  false,
        otp : "",
        n_pass : ""
    })

    const handleInputs = (e)=>{
        setValues({...values , [e.target.name]  :e.target.value})

    }

    const handleSubmit = () =>{


setValues({...values , ['loading'] : true})
var temp  = {
    u_mail : values.email
}
        axios.post(Base_URL + '/forgot_password' ,  temp).then((res)=>{
            setValues({...values , ['loading'] : false , ['otp_flag'] : true})
            toast.success(res.data.message)
        }).catch((err)=>{
            setValues({...values , ['loading'] : false,['otp_flag'] : false})
            toast.error(err.response.data.message)

        })
        

    }


    const verifyOtp = ()=>{

        setValues({...values , ['loading'] : true})


        var temp  = {
            email : values.email,
            otp : values.otp,
            n_pass : values.n_pass
        }
                axios.post(Base_URL + '/verify_otp' ,  temp).then((res)=>{
                    setValues({...values , ['loading'] : false , ['otp_flag'] : false})
                    toast.success(res.data.message)
                    navigate('/login')
                    
                }).catch((err)=>{
                    setValues({...values , ['loading'] : false,['otp_flag'] : false})
                    toast.error(err.response.data.message)
        
                })

    }





 return(
     <>
        {values.loading == false && values.otp_flag == false ?

                <div className="container">
                    <h4><i>Reset Your Password Here</i></h4>
            
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" name='email' value={values.email} onChange={handleInputs}  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <button onClick={handleSubmit}  type="submit" class="btn btn-primary">GET OTP</button>

        </div> :

        values.loading == false && values.otp_flag == true ?

           <div>

<div className="container">
                    <h4><i>Validate Your OTP</i></h4>
            
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input disabled={true} type="email" name='email' value={values.email} onChange={handleInputs}  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">OTP</label>
                <input type="number" name='otp' value={values.otp} onChange={handleInputs}  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">New Password</label>
                <input type="text" name='n_pass' value={values.n_pass} onChange={handleInputs}  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <button onClick={verifyOtp}  type="submit" class="btn btn-primary">GET OTP</button>

        </div>

           </div> 
        
        :

        
        
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


export default ForgtoPassword