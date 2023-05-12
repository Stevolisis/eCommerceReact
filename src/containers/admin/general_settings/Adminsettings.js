import {React, useMemo, useState} from 'react';
import PaymentGateway from '../../../components/general_settings/payment_method';
import Support from '../../../components/general_settings/support';
import { useNavigate, useParams } from 'react-router-dom';

export default function Adminpayment(){
    const { section }=useParams();
    const navigate=useNavigate();
    const [active,setActive]=useState(0);

    function SwitchScreen(id,route){
        navigate(`/admin/general_settings/${route}`); 
        setActive(id);
    }
    
    
    useMemo(()=>{
        if(section==='index') setActive(1)
        if(section==='payment_gateway') setActive(2)
        if(section==='support') setActive(3)
    },[section])

    return(
        <>
        <div className='admindashcon'>
            <div className='userorderheading'>
                <p>Payment Methods</p>
            </div>
            <div className='settingsNavigateCon'>
                <button className='settingsNavigateBtn' 
                    style={{borderBottom:`${active===1 ? '3px solid #758db9' : 'none'}`,background:`${active===1 ? 'white' : '#faf9f9'}`}} 
                onClick={()=>SwitchScreen(1,'index')}>
                General Settings</button>
                <button className='settingsNavigateBtn' 
                    style={{borderBottom:`${active===2 ? '3px solid #758db9' : 'none'}`,background:`${active===2 ? 'white' : '#faf9f9'}`}} 
                onClick={()=>SwitchScreen(2,'payment_gateway')}>Payment Gateway</button>
                <button className='settingsNavigateBtn' 
                    style={{borderBottom:`${active===3 ? '3px solid #758db9' : 'none'}`,background:`${active===3 ? 'white' : '#faf9f9'}`}}
                onClick={()=>SwitchScreen(3,'support')}>Support</button>
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