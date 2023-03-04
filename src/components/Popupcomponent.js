import { React } from 'react';
import Addaddress from '../containers/useradmin/address/Addaddress';
import Passcode from '../components/auth/Passcode';
import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';
import Useraddresses from '../containers/useradmin/address/Useraddresses';
import { useSelector } from 'react-redux';
import { getInview } from '../Redux/Main/userAuthForm';
import PasswordReset from '../components/auth/PasswordReset';

export default function Popupcomponent(){
    const inview=useSelector(getInview);

      
    function inviews(){
        if (inview.view==='useraddress') {
            return (
            <div className='popup'>
            <Useraddresses popup='true'/>
            </div>
            ) 
        }else if (inview.view==='adduseraddress') {
            return (
            <div className='popup'>
            <Addaddress/> 
            </div>
            )  
        }else if (inview.view==='signin') {
            return <Signin/>   
        }
        else if (inview.view==='signup') {
            return <Signup/>   
        }
        else if (inview.view==='passwordreset') {
           return <PasswordReset/>   
        }else if (inview.view==='passcode') {
            return <Passcode/>   
        }
    }


    return(
        <>
        <div className='popupCon' >
       {inviews()} 
        </div>
        </>
    )
}