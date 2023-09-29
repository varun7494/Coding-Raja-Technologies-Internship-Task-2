import {Routes , Route , Link} from 'react-router-dom';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import ForgtoPassword from '../Screens/ForgotPassword';






const AuthRouting  =  ()=>{

    return(

            <>
        <Routes>
            <Route path='/'  element={<Login/>}  />
            <Route path='/login'  element={<Login/>}  />
            <Route path='/register'  element={<Register/>}  />
            <Route path='/forgotPassword'  element={<ForgtoPassword/>}  />
            <Route path='*'  element={<Login/>}  />

        </Routes>
        </>


    )


}

export default AuthRouting