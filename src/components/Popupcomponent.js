import { React } from 'react';
import Addaddress from '../containers/useradmin/address/Addaddress';
import Passcode from '../containers/main/Passcode';
import Signin from '../containers/main/Signin';
import Signup from '../containers/main/Signup';
import Useraddresses from '../containers/useradmin/address/Useraddresses';
import { useSelector } from 'react-redux';
import { getInview } from '../Redux/Main/userAuthForm';
import PasswordReset from '../containers/main/PasswordReset';

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