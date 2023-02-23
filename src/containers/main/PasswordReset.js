import React, { useRef, useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

export default function PasswordReset({setTrigger}){
   const {passwordResetLink}=useParams();
   const navigate=useNavigate();
   const password=useRef();
   const confirmpassword=useRef();
   const [checkLength,setcheckLength]=useState('');
   const [checkMatch,setcheckMatch]=useState('');



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
        axios.post('http://localhost:80/auth/resetPassword',formData,{withCredentials:true})
        .then(res=>{
            let status=res.data.status;
            if(status==='success'){
            navigate('/');
            }else{
            Swal.fire(
                'Alert!',
                `${status}`,
                'info'
                )
            }
        }).catch(e=>{
            alert(e);
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
            <p style={{color:'black'}}>New Pacssword</p>
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