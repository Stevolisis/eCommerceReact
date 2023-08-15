import {React} from 'react';
import { customerLogin, setInview, setTrigger } from '../../Redux/Auth/userAuthForm';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Signin(){
    const navigate=useNavigate();
    const [searchParams]=useSearchParams();
    const dispatch=useDispatch();
    // console.log('next ',window.location.search)

    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target);
        if(searchParams.get('next')&&searchParams.get('tx_ref')&&searchParams.get('transaction_id')){
            dispatch(customerLogin({next:`${searchParams.get('next')}&tx_ref=${searchParams.get('tx_ref')}&transaction_id=${searchParams.get('transaction_id')}}`,data:formData}));
        }else{
            dispatch(customerLogin({next:searchParams.get('next'),data:formData}));
        }
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
        <div className='signlink'><p onClick={()=>navigate(`/auth/passwordreset`)}>Forgot Password?</p></div>
        <div className='usereditbtn'>
        <button>SUBMIT</button>
        <div className='signlink2'>Don't have an account?  <span onClick={()=>navigate(`/auth/signup`)}>Sign Up</span></div>
        </div>
        </form>
        </div>
        </>
    )
}