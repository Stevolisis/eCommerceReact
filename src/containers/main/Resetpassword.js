import {React} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Resetpassword(){

    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target)

        axios.post('http://localhost:80/auth/passwordReset',formData,{withCredentials:true})
        .then(res=>{
            let data=res.data.data;
            if(data==='Password Reset Link has been sent to your email.'){
                
                Swal.fire(
                    'Successful!',
                    `Data Done: ${data}`,
                    'success'
                  )
                }else{
                Swal.fire(
                    'Error!',
                    `${data}`,
                    'info'
                  )
                }
            }).catch(err=>{
    
                Swal.fire(
                    'Error At Axios!',
                    `Error Occured: ${err}`,
                    'success'
                )
            })
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