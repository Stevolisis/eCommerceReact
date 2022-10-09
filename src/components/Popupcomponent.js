import {React, useMemo} from 'react';
import Addaddress from '../containers/useradmin/address/Addaddress';
import Passcode from '../containers/main/Passcode';
import Resetpassword from '../containers/main/Resetpassword';
import Signin from '../containers/main/Signin';
import Signup from '../containers/main/Signup';
import Useraddresses from '../containers/useradmin/address/Useraddresses';
import $ from 'jquery';

export default function Popupcomponent({inview,setTrigger,setInview}){

useMemo(()=>{

if(inview !=='passcode'){

$(window).click((e)=>{
if(e.target.className==='popupaddresscon'||e.target.className==='popupaddress'){
setTrigger(false)
}
});  

}else{
$(window).click((e)=>{
if(e.target.className==='popupaddresscon'||e.target.className==='popupaddress'){
setTrigger(true)
}

});  
} 

},[inview]);

      
    function inviews(){
        if (inview==='useraddress') {
            return (
            <div className='popupaddress'>
            <Useraddresses popup='true' setInview={setInview}/>
            </div>
            ) 
        }else if (inview==='adduseraddress') {
            return (
            <div className='popupaddress'>
            <Addaddress/> 
            </div>
            )  
        }else if (inview==='signin') {
            return <Signin setInview={setInview} setTrigger={setTrigger}/>   
        }
        else if (inview==='signup') {
            return <Signup setInview={setInview}/>   
        }
        else if (inview==='resetpassword') {
           return <Resetpassword setInview={setInview}/>   
        }else if (inview==='passcode') {
            return <Passcode setInview={setInview}/>   
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