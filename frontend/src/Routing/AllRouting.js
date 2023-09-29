import {Routes , Route , Link} from 'react-router-dom';
import Home from '../Screens/Home';
import About from '../Screens/About';
import Contacts from '../Screens/Contacts';
import Products from '../Screens/Products';
import Navbar from '../Layout/Navbar';
import ViewProduct from '../Screens/ViewProduct';
import Cart from '../Screens/Cart';
import Checkout from '../Screens/Checkout';
import MyOrders from '../Screens/MyOrders';
import MyProfile from '../Screens/MyProfile';





const AllRouting  =  ({countOfCart})=>{

    return(

            <>
            <Navbar countOfCart={countOfCart} />
        <Routes>
            <Route path='/'  element={<Home/>}  />
            <Route path='/home'  element={<Home/>}  />
            <Route path='/about'  element={<About/>}  />
            <Route path='/contact'  element={<Contacts/>}  />
            <Route path='/products'  element={<Products/>}  />
            <Route path='/mycart'  element={<Cart/>}  />
            <Route path='/products/:id'  element={<ViewProduct/>}  />
            <Route path='/checkout'  element={<Checkout/>}  />
            <Route path='/my_orders'  element={<MyOrders/>}  />
            <Route path='/my_profile'  element={<MyProfile/>}  />
            <Route path='*'  element={<Home/>}  />
        </Routes>

            {/* <h1><Link  to='/home' >Go To Home</Link></h1>
            <h1><Link  to='/about' >Go To About</Link></h1>
            <h1><Link  to='/contact' >Go To Contacts</Link></h1>
            <h1><Link  to='/products' >Go To Products</Link></h1> */}

        </>


    )


}

export default AllRouting