import React from 'react';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

export default function PasswordReset({setTrigger}){
   const {passwordResetLink}=useParams();
   const navigate=useNavigate()
   alert(passwordResetLink)
    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target);
        axios.post('http://localhost:80/auth/resetPassword',formData,{withCredentials:true})
        .then(res=>{
            let data=res.data.data;
            if(data==='success'){
            navigate('/');
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
        <div style={{width:'100vw',height:'100vh',display:'flex',
        justifyContent:'center',alignItems:'center',background:'rgb(107, 107, 107)'}}>
        <div className='signincon'>
            <div className='siginheading'><p>Reset Password</p></div>
            <form onSubmit={handleSubmit}>
            <div className='admineditnamecon'>
            <div className='admineditname'>
            <p style={{color:'black'}}>New Password</p>
            <input type='password' name='password'/>
            </div>
        </div>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p style={{color:'black'}}>Confirm Password</p>
            <input type='password' name='confirm_password'/>
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