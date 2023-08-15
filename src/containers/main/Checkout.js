import {React, useState} from 'react';
import Swal from 'sweetalert2';
import Mainheader from '../../components/main_page_layouts/Mainheader';
import Mainfooter from '../../components/Mainfooter'
import { useDispatch, useSelector } from 'react-redux';
import {  setRedirectPath } from '../../Redux/Auth/userAuthForm';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchAddresses, getAddresses } from '../../Redux/UserDashboard/userAddress';
import { useEffect } from 'react';
import { getOrder,completeOrder, orderDetails } from '../../Redux/Admin/orders';

export default function Checkout(){
    const dispatch=useDispatch();
    const location=useLocation();
    const userAddresses=useSelector(fetchAddresses);
    const order=useSelector(orderDetails)
    const navigate=useNavigate();
    const [navStat,setNavStat]=useState('')
    const [delivery_stat,setDelivery_stat]=useState(false)
    const [delivery_note,setDelivery_note]=useState('');
    const [payment_gateway,setPayment_gateway]=useState('');
    const {id}=useParams();


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
  });

  function completeOrders(){
    if(!payment_gateway){
      Swal.fire(
        'Complete Details',
        'Choose payment gateway',
        'warning'
      )
    }else if(userAddresses.length==0){
      Swal.fire(
        'Complete Details',
        'Please add address',
        'warning'
      )
    }else{
      dispatch(completeOrder({id,payment_gateway,delivery_note}))
        .then(res=>{
          if(res.payload.status==='success'){
            window.location.assign(res.payload.payment_link);
          }
      })
    }
  }


  
  useEffect(()=>{
    dispatch(getAddresses())
    .then(res=>{
      if(res.payload.status!=='success'){
          dispatch(setRedirectPath('/auth/login?next='+location.pathname))            
      }
    })
  },[]);

  useEffect(()=>{
    if(id){
      dispatch(getOrder(id))
      .then(res=>{
        if(res.payload.status!=='success'){
          dispatch(setRedirectPath('/auth/login?next='+location.pathname))            
        }
      })
    }
  },[id])

  useEffect(()=>{
    userAddresses&&userAddresses.length==0 ? setNavStat('/user/addAddress?next=/checkout')
    : setNavStat('/user/address?next=/checkout')
  },[userAddresses]);





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
        {
          navStat==='/user/addAddress?next=/checkout' ? 
          <button onClick={()=>navigate(`${'/user/addAddress?next=/checkout'}${id}`)}>ADD</button>
          :
          <button onClick={()=>navigate(`${'/user/address?next=/checkout/'}${id}`)}>CHANGE</button>
        }
    </div>
        
      {
        userAddresses&&userAddresses.length!==0 ?
        userAddresses
          .filter((address,i)=>address.default==true)
          .map((addressDefault,i)=>{
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

    <div className='checkoutaddress'>
        <div className='delivery_notesBtn'>
          <button onClick={()=>setDelivery_stat(!delivery_stat)}>Add Notes</button>
        </div>
        {delivery_stat&&<div className='delivery_note'>
        <textarea placeholder='if you want to add extra information e.g delivery instructions' name='delivery_notes' value={delivery_note} onChange={(e)=>setDelivery_note(e.target.value)}/>
        </div>}
    </div>

</div>

<div className='checkoutpaymentcon'>
<div className='userorderheading'><p>PAYMENT METHOD</p></div>
<div className='checkoutpayment'>

<form>
<div className='paymentmethods'>
<input type='radio' required onChange={(e)=>setPayment_gateway(e.target.value)} name='paymentgateway' value='flutterwave' id='Flutterwave'/>
<p ><label htmlFor='Flutterwave'>Flutterwave</label></p>
</div>
<div className='paymentmethods'>
<input type='radio' required onChange={(e)=>setPayment_gateway(e.target.value)} name='paymentgateway' value='payment_on_delivery' id='Payment on delivery'/>
<p><label htmlFor='Payment on delivery'>Payment on delivery</label></p>
</div>
<div className='paymentmethods'>
<input type='radio' required onChange={(e)=>setPayment_gateway(e.target.value)} name='paymentgateway' value='paypal' id='Paypal'/>
<p><label htmlFor='Paypal'>Paypal</label></p>
</div>
<div className='paymentmethods'>
<input type='radio' required onChange={(e)=>setPayment_gateway(e.target.value)} name='paymentgateway' value='stripe' id='Stripe'/>
<p><label htmlFor='Stripe'>Stripe</label></p>
</div>
</form>

</div>
<div>

</div>

</div>

</div>

<div className='checkoutsummarycon'>

  <div className='ordersCon'>
    {order&&order.products&&order.products.map((item,i)=>{
      return <div className='order' key={i}>
              <div className='orderImg'>
                <img src={item.img_link} alt='order'/>
              </div>

              <div className='orderDetails'>
                <div className='orderTitle'>
                  <p>{item.name}</p>
                </div>
                <div className='ordePrice'>
                <p>N{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                </div>
              </div>
          </div>
    })
  }
  </div>

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
  <div><p>Subtotal</p><p>N{order&&order.sub_total}</p></div>
  <div><p>Delivery Fee</p><p>N{order&&order.total_delivery_fee}</p></div>
  <div><p>Total</p><p>N{order&&order.total_delivery_fee+order.sub_total}</p></div>
  <div><button onClick={()=>completeOrders()}>Pay</button></div>
  </div>

</div>
</div>


</div>

<Mainfooter/>
</div>
        </>
    )
}