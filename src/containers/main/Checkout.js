import {React, useState} from 'react';
import Popupcomponent from '../../components/Popupcomponent';
import Swal from 'sweetalert2';
import Mainheader from '../../components/Mainheader'
import Mainfooter from '../../components/Mainfooter'

export default function Checkout(){
    const [trigger,setTrigger]=useState(false);
    const [inview,setInview]=useState('useraddress');

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



return(
        <>
        {trigger && <Popupcomponent setTrigger={setTrigger} inview={inview} setInview={setInview}/>}

<div className='main'>

<Mainheader/>

<div className='submain'>

<div className='checkoutcon'>

<div className='checkoutinfocon'>
<div className='checkoutaddresscon'>
    <div className='userorderheading'>
        <p onClick={()=>(setTrigger(true), setInview('signin'))}>ADDRESS DETAILS</p>
        <button onClick={()=>(setTrigger(true), setInview('useraddress'))}>CHANGE</button>
        </div>
    <div className='checkoutaddress'>
        <p>Steven Joseph</p>
        <p>Abubakar tafawa balewa university,yelwa canpus, Yelwa / Fed. Poly, Bauchi
+2348103987495</p>
    </div>
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