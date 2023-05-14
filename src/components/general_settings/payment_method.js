import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editPayments } from '../../Redux/Admin/payments';
import { useState } from 'react';

export default function PaymentGateway(){
    const dispatch=useDispatch();
    const gatewayStatus=useState({flutterwave:false,stripe:false})

    const handleSubmit=((e)=>{
        e.preventDefault();
        // Swal.fire(
        //   'Successful!',
        //   'Payments Saved.',
        //   'success'
        // )
        const formData=new FormData(e.target);
        console.log('target',formData)
        dispatch(editPayments(formData));
    });




    return(
        <>
        <div className='admincategcon'>
            <div className='adminstat3con'>
                <form onSubmit={handleSubmit}>
                    <div className='adminstat3'>
                        <div className='adminstat3info2'>
                            <table>
                                <tbody>

                                    <tr>
                                    <th>Methods</th>
                                    <th>Enabled</th>
                                    <th>Edit</th>
                                    </tr>


                                    <tr>
                                    <td>Flutterwave</td>
                                    <td><input type='checkbox' value={true} name='flutterwave'/></td>
                                    <td><Link to={`/admin/editcategory/${1}`}><i className='fa fa-edit'/></Link></td>
                                    </tr>

                                    <tr>
                                    <td>Payment on Delivery</td>
                                    <td><input type='checkbox' value={true} name='payment_on_delivery' onClick={(e)=>console.log(e.target.value)}/></td>
                                    <td><Link to={`/admin/editcategory/${2}`}><i className='fa fa-edit'/></Link></td>
                                    </tr>

                                    <tr>
                                    <td>Paypal</td>
                                    <td><input type='checkbox' value={true} name='paypal'/></td>
                                    <td><Link to={`/admin/editcategory/${3}`}><i className='fa fa-edit'/></Link></td>
                                    </tr>

                                    
                                    <tr>
                                    <td>Razorpay</td>
                                    <td><input type='checkbox' value={true} name='razorpay'/></td>
                                    <td><Link to={`/admin/editcategory/${4}`}><i className='fa fa-edit'/></Link></td>
                                    </tr>

                                    <tr>
                                    <td>Stripe</td>
                                    <td><input type='checkbox' value={true} name='stripe'/></td>
                                    <td><Link to={`/admin/editcategory/${5}`}><i className='fa fa-edit'/></Link></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='adminmorebtn'>
                        <button>Save</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}