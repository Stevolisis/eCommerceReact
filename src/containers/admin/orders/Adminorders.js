import { useEffect } from 'react';
import { useState } from 'react';
import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterOrders, getOrders, getOrdersAdmin, searchOrders } from '../../../Redux/Admin/orders';

export default function Adminorders(){
    const dispatch=useDispatch();
    const orders=useSelector(getOrdersAdmin);
    let [limit,setlimit]=useState(10);

    useEffect(()=>{
        dispatch(getOrders(limit));
    },[dispatch,limit]);

    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
            <p>Orders({orders.length})</p>
            </div>
        <div className='admincategcon'>

            <div className='adminfilterscon'>
                <div className='adminfilters'>
                    <input type='text' placeholder='Search...' onChange={(e)=>dispatch(searchOrders(e.target.value))}/>
                </div>
                <div className='adminfilters'>
                    <select onChange={(e)=>dispatch(filterOrders(e.target.value))}>
                    <option defaultValue='ascend' value='ascend'>Ascending Order</option>
                    <option value='descend'>Descending Order</option>
                    <option value='payment_paid'>Payment Status Status(Paid)</option>
                    <option value='payment_notpaid'>Payment Status Status(Not Paid)</option>
                    <option value='order_delivered'>Delivery Status(Delivered)</option>
                    <option value='order_notdelivered'>Delivery Status(Not Delivered)</option>
                    </select>
                </div>
            </div>



            <div className='adminstat3con'>
        <div className='adminstat3'>
            <div className='adminstat3info2'>
            <table>
            <tbody>

            <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
            <th>Date</th>
            <th>View</th>
            </tr>

            {
                orders.map((order,i)=>{
                    return  <tr key={i}>
                                <td><span style={{whiteSpace:'nowrap'}}>{`${order?.customerId?.first_name} ${order?.customerId?.last_name}`}</span></td>
                                <td>{order?.customerId?.email}</td>
                                <td>{order?.products.length}</td>
                                <td>N{order?.total_cost}</td>
                                <td><span style={{background:`${order.payment_status==='Paid' ? 'LimeGreen' : 'Crimson'}`, padding:'3px 5px', borderRadius:'0 5px 0 5px', whiteSpace:'nowrap', color: 'white'}}>{order?.payment_status}</span></td>
                                <td><span style={{background:`${order.status==='Delivered' ? 'LimeGreen' : order.status==='In Cart' ? 'Crimson' : 'black'}`, padding:'3px 5px', borderRadius:'0 5px 0 5px', whiteSpace:'nowrap', color: 'white'}}>{order?.status}</span></td>
                                <td>{order?.createdAt.split('T')[0]}</td>
                            <td><Link to={`/admin/order/${order?._id}`}><i className='fa fa-eye'/></Link></td>
                    </tr>
                })
            }

            </tbody>
            </table>
            </div>
        </div>
        <div className='adminmorebtn'>
            <button onClick={()=>setlimit(limit+10)}>See More</button>
        </div>
        </div>


        </div>
        </div>
        </>

    )
}