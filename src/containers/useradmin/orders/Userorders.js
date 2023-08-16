import { useEffect } from 'react';
import {React} from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrders } from '../../../Redux/Admin/orders';
import { setRedirectPath } from '../../../Redux/Auth/userAuthForm';

export default function Userorders(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();

    useEffect(()=>{
        dispatch(getOrders())
        .then(res=>{
            if(res.payload.status!=='success'||res.payload.status!=='no Cookie'){
                dispatch(setRedirectPath('/auth/login?next='+location.pathname))            
            }
        })
    },[])



    return(
        <>
        <div className='usermaincon'>
        <div className='userorderheading'><p>Orders(3)</p></div>
        <div className='userorderscon'>
        
        <div className='userorder'>
        <div className='userorderimg'><img src='/media3/advert6.jpg' alt='UserOrderImg'/></div>
        <div className='userorderinfo'>
        <div className='orderinfo1'>
        <p>Bluetooth Headset - Extra Bass -MDR-XB950BT- Red</p>
        <p>Price: N34,000</p>
        <p>STATUS: Cancelled</p>
        </div>
        <div className='orderinfo2'>
            <p>On 14-11-2019</p>
            <button onClick={()=>navigate('/user/order')}>View</button>
        </div>
        </div>
        </div>


        </div>
        </div>
        </>
    )
}