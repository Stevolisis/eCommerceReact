import {React} from 'react';
import { customerLogin, setInview, setTrigger } from '../../Redux/Main/userAuthForm';
import { useDispatch } from 'react-redux';

export default function Signin(){
    const dispatch=useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target);
        dispatch(customerLogin(formData));
    }
    


    return(
        <>
        <div className='signincon'>
            <div className='siginheading'><p>Log In</p></div>
            <form onSubmit={handleSubmit}>
            <div className='admineditnamecon'>
            <div className='admineditname'>
            <p style={{color:'black'}}>Email Address</p>
            <input type='email' name='email'/>
            </div>
        </div>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p style={{color:'black'}}>Password</p>
            <input type='password' name='password'/>
            </div>
        </div>
        <div className='signlink'><p onClick={()=>(dispatch(setInview({view:'passwordreset'})),dispatch(setTrigger(true)))}>Forgot Password?</p></div>
        <div className='usereditbtn'>
        <button>SUBMIT</button>
        <div className='signlink2'>Don't have an account?  <span onClick={()=>(dispatch(setInview({view:'signup'})),dispatch(setTrigger(true)))}>Sign Up</span></div>
        </div>
        </form>
        </div>
        </>
    )
}