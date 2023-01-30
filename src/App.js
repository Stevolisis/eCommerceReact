import {React} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
//------------Main Pages------------
import Index from './containers/main/index';
import Index2 from './containers/main/index2';
import Products from './containers/main/Products';
import Product from './containers/main/Product';
import Cart from './containers/main/Cart';
import Checkout from './containers/main/Checkout';
import Help from './containers/main/Help';
import PasswordReset from './containers/main/PasswordReset';
//-----------Main Css----------
import './containers/main/styles/index.scss';
import './containers/main/styles/searchbar.scss';
import './containers/main/styles/products.scss';
import './containers/main/styles/product.scss';
import './containers/main/styles/cart.scss';
import './containers/main/styles/checkout.scss';
import './containers/main/styles/checkoutaddress.scss';
import './containers/main/styles/help.scss';
import './containers/main/styles/signin.scss';

//------------User Admin Pages---------
import Usercontainer from './containers/useradmin/index';
import Userdashboard from './containers/useradmin/dashboard/Userdashboard';
import Useraddresses from './containers/useradmin/address/Useraddresses';
import Editaddress from './containers/useradmin/address/Editaddress';
import Addaddress from './containers/useradmin/address/Addaddress';
import Userorders from './containers/useradmin/orders/Userorders';
import Userorder from './containers/useradmin/orders/Userorder';
import Userwishlist from './containers/useradmin/wishlist/Userwishlist';
//-----------User Admin Css--------
import './containers/useradmin/styles/usercontainer.scss';
import './containers/useradmin/styles/orders.scss';
import './containers/useradmin/styles/usereditaddress.scss';
import './containers/useradmin/styles/usersaveditems.scss';
import './containers/useradmin/styles/orderdetails.scss';

//--------------Admin Pages-------------
import Admin from './containers/admin/index';
import Admindashboard from './containers/admin/dashboard/Admindashboard';

import Adminproducts from './containers/admin/products/Adminproducts';
import Addproduct from './containers/admin/products/Addproduct';
import Editproduct from './containers/admin/products/Editproduct';

import Admincategories from './containers/admin/categories/Admincategories';
import Addcategory from './containers/admin/categories/Addcategory';
import Editcategory from './containers/admin/categories/Editcategory';

import Adminstaffs from './containers/admin/staffs/Adminstaffs';
import Addstaff from './containers/admin/staffs/Addstaff';
import Editstaff from './containers/admin/staffs/Editstaff';


import Adminusers from './containers/admin/users/Adminusers';
import Edituser from './containers/admin/users/Edituser';

import Adminsupport from './containers/admin/supports/Adminsupport';
import Addfaq from './containers/admin/supports/Addfaq';
import Editfaq from './containers/admin/supports/Editfaq';

import Adminevents from './containers/admin/events/Adminevents';
import Addevent from './containers/admin/events/Addevent';
import Editevent from './containers/admin/events/Editevent';

import Admincoupons from './containers/admin/coupons/Admincoupons';
import Editcoupon from './containers/admin/coupons/Editcoupon';
import Addcoupon from './containers/admin/coupons/Addcoupon';

import Adminbannerimg from './containers/admin/banners/Adminbannerimg';
import Adminpayment from './containers/admin/payments/Adminpayment';
import Adminorders from './containers/admin/orders/Adminorders';
import Adminsales from './containers/admin/sales/Adminsales';
import Adminanalytics from './containers/admin/analytics/Adminanalytics';
//------------Admin Css-------------
import './containers/admin/styles/admin.scss';
import './containers/admin/styles/admindashboard.scss';
import './containers/admin/styles/admincategories.scss';
import './containers/admin/styles/adminaddcateg.scss';

//---------Fontawesome-----------
import 'font-awesome/css/font-awesome.min.css';

//------------Loaders------------
import MainLoader from './Loaders/MainLoader';

//------------Loader Styles------------
import './Loaders/styles/mainLoader.scss';



function App() {


  return (
 

<>
 <MainLoader/> 
    <BrowserRouter>
      <Routes>  
      {/* -------------Main Route------------- */}
      <Route path='/' element={<Index />} />
      <Route path='/index2' element={<Index2 />} />
        <Route path='/passwordReset/:passwordResetLink' element={<PasswordReset />} />
        <Route path='/category/:id' element={<Products />} />
        <Route path='/products/:id' element={<Products />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='help' element={<Help />} />

      {/* --------------User Admin Route------------ */}
      <Route path='/user' element={<Usercontainer/>} >
        <Route path='dashboard' element={<Userdashboard />} />
        <Route path='address' element={<Useraddresses/>} />
        <Route path='editaddress/:id' element={<Editaddress/>} />
        <Route path='addaddress' element={<Addaddress/>} />
        <Route path='wishlist' element={<Userwishlist/>} />
        <Route path='orders' element={<Userorders />} />
        <Route path='order' element={<Userorder origin='user'/>} />
      </Route>

      {/* ----------------Admin Route--------------- */}
      <Route path='/admin' element={<Admin/>}>
      <Route path='dashboard' element={<Admindashboard />} />
      <Route path='products' element={<Adminproducts />} />
      <Route path='categories' element={<Admincategories />} />
      <Route path='sales' element={<Adminsales />} />
      <Route path='users' element={<Adminusers />} />
      <Route path='staffs' element={<Adminstaffs />} />
      <Route path='support' element={<Adminsupport />} />
      <Route path='bannerimg' element={<Adminbannerimg />} />
      <Route path='payment' element={<Adminpayment />} />
      <Route path='events' element={<Adminevents />} />
      <Route path='coupons' element={<Admincoupons />} />
      <Route path='orders' element={<Adminorders />} />
      <Route path='order' element={<Userorder origin='admin'/>} />

      <Route path='addcategory' element={<Addcategory />} />
      <Route path='addproduct' element={<Addproduct />} />
      <Route path='addstaff' element={<Addstaff />} />
      <Route path='addfaq' element={<Addfaq />} />
      <Route path='addcoupon' element={<Addcoupon />} />
      <Route path='addevent' element={<Addevent />} />

      <Route path='edituser/:id' element={<Edituser />} />
      <Route path='editproduct/:id' element={<Editproduct />} />
      <Route path='editcategory/:id' element={<Editcategory />} />
      <Route path='editevent/:id' element={<Editevent />} />
      <Route path='editcoupon/:id' element={<Editcoupon />} />
      <Route path='editstaff/:id' element={<Editstaff />} />
      <Route path='editfaq/:id' element={<Editfaq />} />

      <Route path='analytics' element={<Adminanalytics />} />
      </Route>
      
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
</>

  );
}

export default App;
