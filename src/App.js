import {React, useCallback, useMemo} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
//------------Main Pages------------
import Index from './containers/main/index';
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
import Addsupport from './containers/admin/supports/Addsupport';
import Editsupport from './containers/admin/supports/Editsupport';

import Admineventcoupon from './containers/admin/event&coupon/Admineventcoupon';
import Editcoupon from './containers/admin/event&coupon/Editcoupon';
import Addcoupon from './containers/admin/event&coupon/Addcoupon';
import Addevent from './containers/admin/event&coupon/Addevent';

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




function App() {


  return (
 

<>
    <BrowserRouter>
      <Routes>  
      {/* -------------Main Route------------- */}
        <Route path='/' element={<Index />} />
        <Route path='/passwordReset/:passwordResetLink' element={<PasswordReset />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product' element={<Product />} />
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
      <Route path='eventandcoupon' element={<Admineventcoupon />} />
      <Route path='orders' element={<Adminorders />} />
      <Route path='order' element={<Userorder origin='admin'/>} />

      <Route path='addcategory' element={<Addcategory />} />
      <Route path='addproduct' element={<Addproduct />} />
      <Route path='addstaff' element={<Addstaff />} />
      <Route path='addfaq' element={<Addsupport />} />
      <Route path='addcoupon' element={<Addcoupon />} />
      <Route path='addevent' element={<Addevent />} />

      <Route path='edituser/:id' element={<Edituser />} />
      <Route path='editproduct/:id' element={<Editproduct />} />
      <Route path='editcategory/:id' element={<Editcategory />} />
      <Route path='editcoupon/:id' element={<Editcoupon />} />
      <Route path='editstaff/:id' element={<Editstaff />} />
      <Route path='editfaq/:id' element={<Editsupport />} />

      <Route path='analytics' element={<Adminanalytics />} />
      </Route>
      
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
</>

  );
}

export default App;
