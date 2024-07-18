import { useEffect } from 'react';
import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserOrder, getUserOrders } from '../../../Redux/Admin/orders';
import { setRedirectPath } from '../../../Redux/Auth/userAuthForm';

export default function Userorders(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    const userOrders=useSelector(getUserOrder);

    useEffect(()=>{
        dispatch(getUserOrders())
        .then(res=>{
            console.log('res.payload.status',res.payload.status)
            if(res.payload.status!=='success'){
                console.log('res.payload',res.payload.status)
                dispatch(setRedirectPath('/auth/login?next='+location.pathname.slice(1)))            
            }
        })
    },[])



    return(
        <>
        <div className='usermaincon'>
        <div className='userorderheading'><p>Orders({userOrders.length})</p></div>
        <div className='userorderscon'>


        {userOrders.length===0 ? 
               
               <div className='overview'>
               <div className='overviewdetails'>
                    No Orders Found
               </div>
               </div>
      
            : userOrders.map((order,i)=>{
                return (
                    <div className='userorder' key={i}>

                        <div className='userorderimg'>
                            <img src={order.products[0].img_link} alt='UserOrderImg'/>
                        </div>

                        <div className='userorderinfo'>
                        <div className='orderinfo1'>
                        <p>{order.products.length} Items : {
                            order?.products.map(product=>{
                                return product.name + ' | '
                            })
                        }</p>
                        <p>Price: N{order.total_cost}</p>
                            {order.payment_status==='Paid' ? 
                                <p style={{background:order.status==='Delivered' ?'dodgerblue':'black'}}>STATUS: {order.status}</p>
                            :
                                <p style={{background:'red'}}>STATUS: {order.status==='In Cart'&& `(${order.status})`} {order.payment_status} </p>
                            }
                        </div>
                        <div className='orderinfo2'>
                            <p>{order.createdAt.split('T')[0]}</p>
                            <button onClick={()=>navigate(`/user/order/${order._id}`)}>View</button>
                        </div>
                        </div>

                    </div>
                )
            })
        }
        



        </div>
        </div>
        </>
    )
}