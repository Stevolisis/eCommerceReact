import {React, useState} from 'react';
import Popupcomponent from '../../components/Popupcomponent';
import Swal from 'sweetalert2';
import Mainheader from '../../components/main_page_layouts/Mainheader';
import Mainfooter from '../../components/Mainfooter'
import { useDispatch, useSelector } from 'react-redux';
import { setInview, setRedirectPath, setTrigger } from '../../Redux/Auth/userAuthForm';
import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { fetchAddresses, getAddresses } from '../../Redux/UserDashboard/userAddress';

export default function Checkout(){
    const dispatch=useDispatch();
    const location=useLocation();
    const userAddresses=useSelector(fetchAddresses);


   const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  const vouchervalidate=(()=>{
  Toast.fire({
      icon: 'success',
      title: 'Congrats Voucher Validated'
    })
  })




  
  useLayoutEffect(()=>{
    dispatch(getAddresses())
    .then(res=>{
      if(res.payload.status!=='success'){
          dispatch(setRedirectPath('/auth/login?next='+location.pathname))            
      }
    })
  },[]);





return(
        <>

<div className='main'>

<Mainheader/>

<div className='submain'>

<div className='checkoutcon'>

<div className='checkoutinfocon'>
<div className='checkoutaddresscon'>
    <div className='userorderheading'>
        <p>ADDRESS DETAILS</p>
        <button onClick={()=>(dispatch(setInview({view:'useraddress'}),dispatch(setTrigger(true))))}>CHANGE</button>
    </div>
        
      {
        userAddresses&&userAddresses.length!==0 ?
        userAddresses
          .filter(address=>{
            console.log('ffc',address.default==true)
            return address.default==true
          })
          .map((addressDefault,i)=>{
            console.log('addressDefault',addressDefault)
            return <div className='checkoutaddress' key={i}>
              <p>{addressDefault.first_name+' '+addressDefault.last_name}</p>
            <p>{addressDefault.address}</p>
            <p>{addressDefault.location.city+', '+addressDefault.location.state+', '+addressDefault.location.country}</p>
            <p>{addressDefault.phone_number1} </p>
            {addressDefault.phone_number2&&<p>{addressDefault.phone_number2}</p>} 
            </div>
          })
      
        :
        <div className='overview'>No Address Found</div>
      }

</div>

<div className='checkoutpaymentcon'>
<div className='userorderheading'><p>PAYMENT METHOD</p></div>
<div className='checkoutpayment'>

<div className='paymentmethods'>
<input type='radio' name='paymentgateway' value='Payment On Delivery' id='Flutterwave'/>
<p ><label htmlFor='Flutterwave'>Flutterwave</label></p>
</div>
<div className='paymentmethods'>
<input type='radio' name='paymentgateway' value='Payment On Delivery' id='Payment on delivery'/>
<p><label htmlFor='Payment on delivery'>Payment on delivery</label></p>
</div>
<div className='paymentmethods'>
<input type='radio' name='paymentgateway' value='Payment On Delivery' id='Paypal'/>
<p><label htmlFor='Paypal'>Paypal</label></p>
</div>
<div className='paymentmethods'>
<input type='radio' name='paymentgateway' value='Payment On Delivery' id='Stripe'/>
<p><label htmlFor='Stripe'>Stripe</label></p>
</div>

</div>
<div>

</div>

</div>

</div>

<div className='checkoutsummarycon'>

<div className='checkoutvouchercon'>
<div className='checkoutvoucherheading'>
<p>Use a voucher</p>
</div>
<div className='checkoutvoucher'>
    <input type='text' placeholder='Enter Voucher Code'/>
    <button onClick={()=>vouchervalidate()}>Apply</button>
</div>
</div>

<div className='checkoutsummary'>
<div><p>Subtotal</p><p>N2,167</p></div>
<div><p>Shipping</p><p>N1,490</p></div>
<div><p>Total</p><p>N3,657</p></div>
<div><button>Pay</button></div>
</div>
</div>
</div>


</div>

<Mainfooter/>
</div>
        </>
    )
}