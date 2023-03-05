import React, { useRef, useState } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../Redux/Auth/userAuthForm';

export default function ResetPassword(){
   const {passwordResetLink}=useParams();
   const password=useRef();
   const confirmpassword=useRef();
   const [checkLength,setcheckLength]=useState('');
   const [checkMatch,setcheckMatch]=useState('');
   const dispatch=useDispatch();
   const navigate=useNavigate();


   function passwordLength(){
    console.log((password.current.value).length)
    if ((password.current.value).length <= 8) {
        setcheckLength('Password must be more than 8 characters')
    }else{
        setcheckLength('')
    }
 }
 function passwordMatch(){
    if (password.current.value===confirmpassword.current.value) {
        setcheckMatch('Password Matched')
    }else{
        setcheckMatch('Password Mismatched')
    }

 }


    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target);
        dispatch(resetPassword(formData)).then(res=>{
            if(res.payload.status=='success') navigate('/');
        })
    }
    


    return(
        <>
        <div style={{width:'100vw',height:'100vh',display:'flex',
        justifyContent:'center',alignItems:'center',background:'linear-gradient(90deg,#5972b9,#fa568d)'}}>
        <div className='signincon'>
            <div className='siginheading'><p>Reset Password</p></div>
            <form onSubmit={handleSubmit}>
            <div className='admineditnamecon'>

            <div className='admineditname'>
            <p style={{color:'black'}}>New Password</p>
            <input required='required' type='password' name='password' ref={password} onChange={()=>(passwordMatch(),passwordLength())}/>
            <p style={{color:checkLength === 'Password must be more than 8 characters'? 'red' : 'green'}}>{checkLength}</p>
            </div>

        </div>


        <div className='admineditnamecon'>

            <div className='admineditname'>
            <p style={{color:'black'}}>Confirm Password</p>
            <input required='required' type='password' name='confirm_password'  ref={confirmpassword} onChange={passwordMatch}/>
            <p style={{color:checkMatch === 'Password Mismatched'? 'red' : 'green'}}>{checkMatch}</p>
            <input type='hidden' name='passwordResetLink' value={passwordResetLink}/>
            </div>

        </div>
        <div className='usereditbtn'>
        <button>SUBMIT</button>
        </div>
        </form>
        </div>
        </div>
        </>
    )
}
