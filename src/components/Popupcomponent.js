import {React, useMemo} from 'react';
import Addaddress from '../containers/useradmin/address/Addaddress';
import Passcode from '../containers/main/Passcode';
import Resetpassword from '../containers/main/Resetpassword';
import Signin from '../containers/main/Signin';
import Signup from '../containers/main/Signup';
import Useraddresses from '../containers/useradmin/address/Useraddresses';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { getInview, setTrigger } from '../Redux/Main/userAuthForm';

export default function Popupcomponent(){
    const inview=useSelector(getInview);
    const dispatch=useDispatch()


      
    function inviews(){
        if (inview.view==='useraddress') {
            return (
            <div className='popupaddress'>
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
        else if (inview.view==='resetpassword') {
           return <Resetpassword/>   
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