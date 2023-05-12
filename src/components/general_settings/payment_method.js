import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editPayments } from '../../Redux/Admin/payments';

export default function PaymentGateway(){
    const dispatch=useDispatch();

    const handleSubmit=((e)=>{
        e.preventDefault();
        // Swal.fire(
        //   'Successful!',
        //   'Payments Saved.',
        //   'success'
        // )
        console.log('target',e.target.value)
        dispatch(editPayments(e.target.value));
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
                                    <td>Paypal</td>
                                    <td><input type='checkbox' value='Paypal' name='paymentGateway'/></td>
                                    <td><Link to={`/admin/editcategory/${1}`}><i className='fa fa-edit'/></Link></td>
                                    </tr>

                                    <tr>
                                    <td>Stripe</td>
                                    <td><input type='checkbox' value='Stripe' name='paymentGateway'/></td>
                                    <td><Link to={`/admin/editcategory/${1}`}><i className='fa fa-edit'/></Link></td>
                                    </tr>

                                    <tr>
                                    <td>Razorpay</td>
                                    <td><input type='checkbox' value='Razorpay' name='paymentGateway'/></td>
                                    <td><Link to={`/admin/editcategory/${1}`}><i className='fa fa-edit'/></Link></td>
                                    </tr>

                                    <tr>
                                    <td>Flutterwave</td>
                                    <td><input type='checkbox' value='Flutterwave' name='paymentGateway'/></td>
                                    <td><Link to={`/admin/editcategory/${1}`}><i className='fa fa-edit'/></Link></td>
                                    </tr>

                                    <tr>
                                    <td>Monnify</td>
                                    <td><input type='checkbox' value='Monnify' name='paymentGateway'/></td>
                                    <td><Link to={`/admin/editcategory/${1}`}><i className='fa fa-edit'/></Link></td>
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