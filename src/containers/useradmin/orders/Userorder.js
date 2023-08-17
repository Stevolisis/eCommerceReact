import { useEffect } from 'react';
import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { completeOrder, getOrder, orderDetails } from '../../../Redux/Admin/orders';
import { setRedirectPath } from '../../../Redux/Auth/userAuthForm';
import { addAddress } from '../../../Redux/UserDashboard/userAddress';

export default function Userorder({origin}){
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const location=useLocation();
  const {id}=useParams();
  const userOrder=useSelector(orderDetails);

  useEffect(()=>{
      dispatch(getOrder({id:id,page:'userOrders'}))
      .then(res=>{
          console.log('res.payload.status',res.payload.status)
          if(res.payload.status!=='success'){
              console.log('res.payload',res.payload.status)
              dispatch(setRedirectPath('/auth/login?next='+location.pathname))            
          }
      })
  },[]);

    // const completeOrder=()=>{
    //     dispatch(completeOrder({
    //         id:userOrder?._id,
    //         payment_gateway:userOrder?.payment_gateway,
    //         delivery_note:userOrder?.delivery_note,
    //         address:[userOrder?.address]
    //     }))
    //     .then(res=>{
    //       if(res.payload.status==='success'){
    //         window.location.assign(res.payload.payment_link);
    //       }else if(res.payload.status==='getaddrinfo ENOTFOUND api.flutterwave.com'){
    //         return;
    //       }else{
    //         return navigate('/auth/login?next='+location.pathname);
    //       }
    //   })
    // }


    const confirmspec=(()=>{
      Swal.fire({
          title: 'Confirm Delivery',
          text: `Product Delivered on ${Date()}`,
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Successful!',
              'Product Delivered.',
              'success'
            )
          }
        })
    })

    return(
        <>
        <div className='usermaincon'>
        <div className='userorderheading'><p>ORDER DETAILS</p></div>

        <div className='orderdetailcon'>
        <div className='orderdetailheading'><p>Order Id: {userOrder?.tracking_number}</p></div>  
        <div className='orderdetail'>
        <p><span>Quantity:</span> {userOrder?.products?.length} items</p>
        <p><span>Date: </span> {userOrder?.createdAt?.split('T')[0]}</p>
        <p><span>Sub total: </span> N{userOrder?.sub_total}</p>
        <p><span>Total delivery fee: </span> N{userOrder?.total_delivery_fee}</p>
        <p><span>Total Cost: </span> N{userOrder?.total_cost}</p>
        <p><span>Payment Status: </span> {userOrder?.payment_status}</p>
        {userOrder?.payment_status==='not Paid' ? 
            <button onClick={()=>navigate(`/checkout/${userOrder?._id}`)}>Complete Order</button> : 
            <p><span>Delivery Status: </span> {userOrder?.status}</p>
        }
        {/* <p><span>Status: </span> {origin==='user' ? 'Successful' :
        <> <button onClick={()=>confirmspec()}>Delivered</button></>}</p> */}
        </div>  
        </div>

        <div className='userorderscon'>
        {Object.keys(userOrder).length===0 ? '' :userOrder?.products.map((order,i)=>{
                return (
                    <div className='userorder' key={i}>

                        <div className='userorderimg'>
                            <img src={userOrder?.products[0]?.img_link} alt='UserOrderImg'/>
                        </div>

                        <div className='userorderinfo'>
                        <div className='orderinfo1'>
                        <p>{order.name}</p>
                        <p>Price: N{order.price} <br/>Delivery fee: N{order.delivery_fee}</p>
                        </div>
                        {/* <div className='orderinfo2'>
                            <p>{userOrder?.createdAt.split('T')[0]}</p>
                            <button onClick={()=>navigate(`/user/order/${order._id}`)}>View</button>
                        </div> */}
                        </div>

                    </div>
                )
            })}
        </div>

        {userOrder?.address && <div className='detailscon'>
        <div className='orderdetailcon2'>
        <div className='orderdetailheading'><p>PAYMENT METHOD</p></div>  
        <div className='orderdetail'>
        <p><span>Gateway: </span>{userOrder?.payment_gateway}</p>
        <p><span>Currency: </span>{userOrder?.currency}</p>
        </div>  
        </div>

        <div className='orderdetailcon2'>
        <div className='orderdetailheading'><p>ADDRESS</p></div>  
        <div className='orderdetail'>
        <p><span>Name: </span>{userOrder?.address?.name}</p>
        <p><span>Address: </span>{userOrder?.address?.address}</p>
        <p><span>Location: </span>{userOrder?.address?.location?.city} / {userOrder?.address?.location?.state}, {userOrder?.address?.location?.country}</p>
        <p><span>Phone Number: </span>{userOrder?.address?.phone_number}</p>
        {userOrder?.address?.phone_number2 ? 
        <p><span>Phone Number2: </span>{userOrder?.address?.phone_number2}</p> : ''}
        </div>  
        </div>
        </div>}

        </div>    
        </>

    )
}