import {React} from 'react';
import { useDispatch } from 'react-redux';
import { verifyCustomer } from '../../Redux/Auth/userAuthForm';

export default function Passcode(){
    const dispatch=useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target);
        dispatch(verifyCustomer(formData));
    }




    return(
        <>
        <div className='signincon'>
            <div className='siginheading'><p>Account Verification</p></div>
            <div className='signlink3'><i className='fa fa-bell'/>
            Verify by inserting the 5 digit CODE sent to your email.</div>
            <form onSubmit={handleSubmit}>
            <div className='admineditnamecon'>
            <div className='admineditname'>
            <p style={{color:'black'}}>5-DIGIT-CODE</p>
            <input type='password' name='passcode'/>
            </div>
        </div>
        <div className='usereditbtn'>
        <button>SUBMIT</button>
        </div>
        </form>
        </div>
        </>
    )
}