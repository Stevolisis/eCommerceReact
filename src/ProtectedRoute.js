import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { customerAuthStatus } from "./Redux/Main/userAuthForm";


export default function ProtectedRoute({children}) {
  const dispatch=useDispatch();
  const [authStat,setAuthStat]=useState(false);
  
  useEffect(()=>{
    dispatch(customerAuthStatus())
    .then(res=>{
      if(res.payload.status==='success') setAuthStat(true);
    });
  },[])

  return authStat&&children;
}

