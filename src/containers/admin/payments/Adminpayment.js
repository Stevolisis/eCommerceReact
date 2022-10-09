import {React} from 'react';
import Swal from 'sweetalert2';

export default function Adminpayment(){
    const handleSubmit=((e)=>{
        e.preventDefault();
        console.log(e.target)
        Swal.fire(
          'Successful!',
          'Payments Saved.',
          'success'
        )
        });

    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
            <p>Payment Methods</p>
            </div>
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
            </tr>

            <tr>
            <td>Paypal</td>
            <td><input type='checkbox' value='Paypal' name='paymentGateway'/></td>
            </tr>

            <tr>
            <td>Stripe</td>
            <td><input type='checkbox' value='Stripe' name='paymentGateway'/></td>
            </tr>

            <tr>
            <td>Razorpay</td>
            <td><input type='checkbox' value='Razorpay' name='paymentGateway'/></td>
            </tr>

            <tr>
            <td>Flutterwave</td>
            <td><input type='checkbox' value='Flutterwave' name='paymentGateway'/></td>
            </tr>

            <tr>
            <td>Monnify</td>
            <td><input type='checkbox' value='Monnify' name='paymentGateway'/></td>
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
        </div>
        </>

    )
}