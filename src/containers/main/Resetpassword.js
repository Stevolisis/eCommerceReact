import {React} from 'react';
import { useDispatch } from 'react-redux';
import { sendPasswordResetLink } from '../../Redux/Main/userAuthForm';



export default function Resetpassword(){
    const dispatch=useDispatch();


    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target);
        dispatch(sendPasswordResetLink(formData));
    }

    return(
        <>
        <div className='signincon'>
            <div className='siginheading'><p>Reset Password</p></div>
            <div className='signlink3'><i className='fa fa-bell'/>
            Insert your registered email address where an email will be sent to you.</div>
            <form onSubmit={handleSubmit}>
            <div className='admineditnamecon'>
            <div className='admineditname'>
            <p style={{color:'black'}}>Email Address</p>
            <input type='email' name='email'/>
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