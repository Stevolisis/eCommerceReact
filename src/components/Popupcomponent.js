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

 useMemo(()=>{

    if(inview !=='signin'){
        $(window).click((e)=>{
            if(e.target.className==='popupaddresscon'||e.target.className==='popupaddress'){
                dispatch(setTrigger(false))
            }
        });  
    }else{
        $(window).click((e)=>{
            if(e.target.className==='popupaddresscon'||e.target.className==='popupaddress'){
                dispatch(setTrigger(true))
            }

        });  
    } 

},[inview]);

      
    function inviews(){
        if (inview==='useraddress') {
            return (
            <div className='popupaddress'>
            <Useraddresses popup='true'/>
            </div>
            ) 
        }else if (inview==='adduseraddress') {
            return (
            <div className='popupaddress'>
            <Addaddress/> 
            </div>
            )  
        }else if (inview==='signin') {
            return <Signin/>   
        }
        else if (inview==='signup') {
            return <Signup/>   
        }
        else if (inview==='resetpassword') {
           return <Resetpassword/>   
        }else if (inview==='passcode') {
            return <Passcode/>   
        }
    }


    return(
        <>
        <div className='popupaddresscon' >
       {inviews()} 
        </div>
        </>
    )
}