import {React, useRef, useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Signup({setInview}){
    const password=useRef()
    const confirmpassword=useRef()
    const [checkLength,setcheckLength]=useState('')
    const [checkMatch,setcheckMatch]=useState('')

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
    axios.post('http://localhost:80/auth/signup',formData,{withCredentials:true})
    .then(res=>{
        let data=res.data.data;
        if(data==='Please verify your account.'){
            Swal.fire(
                'Account Created!',
                `${data}`,
                'success'
              )
              setInview('passcode');
        }else{
            Swal.fire(
                'Account SignUp Process Interrupted!',
                `${data}`,
                'success'
              )
        }
    }).catch(e=>{
        alert(e);
    })
 }
    return(
        <>
        <div className='signincon'>
            <div className='siginheading'><p>Sign Up</p></div>
            <form onSubmit={handleSubmit}>
            <div className='admineditnamecon'>
            <div className='admineditname'>
            <p style={{color:'black'}}>First Name</p>
            <input type='text' name='first_name'/>
            </div>
        </div>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p style={{color:'black'}}>Last Name</p>
            <input type='text' name='last_name'/>
            </div>
        </div>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p style={{color:'black'}}>Phone Number</p>
            <input type='text' name='phone_number'/>
            </div>
        </div>
            <div className='admineditnamecon'>
            <div className='admineditname'>
            <p style={{color:'black'}}>Email Address</p>
            <input type='email' name='email'/>
            </div>
        </div>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p style={{color:'black'}}>Password</p>
            <input type='password' name='password' ref={password}
            onChange={()=>(passwordMatch(),passwordLength())}/>
            <p style={{color:checkLength === 'Password must be more than 8 characters'? 'red' : 'green'}}>{checkLength}</p>
            </div>
        </div>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p style={{color:'black'}}>Confirm Password</p>
            <input type='password' name='confirm_password' ref={confirmpassword} onChange={passwordMatch}/>
            <p style={{color:checkMatch === 'Password Mismatched'? 'red' : 'green'}}>{checkMatch}</p>
            </div>
        </div>
        <div className='usereditbtn'>
        <button>SUBMIT</button>
        <div className='signlink2'>Already have an account?  <span onClick={()=>setInview('signin')}>Sign In</span></div>
        </div>
        </form>
        </div>
        </>
    )
}