import {React} from 'react';
import PaymentGateway from '../../../components/general_settings/payment_method';
import Support from '../../../components/general_settings/support';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export default function Adminpayment(){
    const { section }=useParams();

    useMemo(()=>{

    },[section])

    return(
        <>
        <div className='admindashcon'>
            <div className='userorderheading'>
                <p>Payment Methods</p>
            </div>

            {
                {
                    'index':<div>Index</div>,
                    'payment_gateway':<PaymentGateway/>,
                    'support':<Support/>
                }[section]
            }
        </div>
        </>

    )
}