import {React} from 'react';
import axios from 'axios'
import Swal from 'sweetalert2';
import { setInview, setTrigger } from '../../Redux/Main/userAuthForm';
import { useDispatch } from 'react-redux';

export default function Signin(){
    const dispatch=useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target);
        axios.post('http://localhost:80/auth/signin',formData,{withCredentials:true})
        .then(res=>{
            let data=res.data.data;
            if(data==='success'){
            setTrigger(false);
            }else{
            Swal.fire(
                'Alert!',
                `${data}`,
                'info'
                )
            }
        }).catch(e=>{
            alert(e);
        })
     }
    


     return(
        <>
        <div className='signincon'>
            <div className='siginheading'><p>Sign In</p></div>
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
        <div className='signlink'><p onClick={()=>(dispatch(setInview({view:'resetpassword'})),dispatch(setTrigger(true)))}>Forgot Password?</p></div>
        <div className='signlink'><p onClick={()=>(dispatch(setInview({view:'passcode'})),dispatch(setTrigger(true)))}>Pass Code</p></div>
        <div className='usereditbtn'>
        <button>SUBMIT</button>
        <div className='signlink2'>Don't have an account?  <span onClick={()=>(dispatch(setInview({view:'signup'})),dispatch(setTrigger(true)))}>Sign Up</span></div>
        </div>
        </form>
        </div>
        </>
    )
}