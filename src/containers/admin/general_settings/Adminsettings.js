import {React} from 'react';
import PaymentGateway from '../../../components/general_settings/payment_method';
import Support from '../../../components/general_settings/support';

export default function Adminpayment(){

    return(
        <>
        <div className='admindashcon'>
            <div className='userorderheading'>
                <p>Payment Methods</p>
            </div>
            
            <div className='admincategcon'>

                <PaymentGateway/>
                <Support/>

            </div>


        </div>
        </>

    )
}