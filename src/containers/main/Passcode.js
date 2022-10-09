import {React} from 'react';
import axios from 'axios'
import Swal from 'sweetalert2';

export default function Passcode({setInview}){

    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target);
        axios.post('http://localhost:80/auth/passcode',formData,{withCredentials:true})
        .then(res=>{
            let data=res.data.data;
            if(data==='success'){
                Swal.fire(
                    'Account Created!',
                    `${data}`,
                    'success'
                  )
                  setInview('signin');
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