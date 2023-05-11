import {React} from 'react';
import PaymentGateway from '../../../components/general_settings/payment_method';
import Support from '../../../components/general_settings/support';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

export default function Adminpayment(){
    const { section }=useParams();
    const navigate=useNavigate();

    useMemo(()=>{

    },[section])

    return(
        <>
        <div className='admindashcon'>
            <div className='userorderheading'>
                <p>Payment Methods</p>
            </div>
            <div>
                <button onClick={()=>navigate('/admin/general_settings/index')}>General Settings</button>
                <button onClick={()=>navigate('/admin/general_settings/payment_gateway')}>Payment Gateway</button>
                <button onClick={()=>navigate('/admin/general_settings/support')}>Support</button>
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