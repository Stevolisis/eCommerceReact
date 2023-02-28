import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { customerAuthStatus } from "./Redux/Main/userAuthForm";


export default function ProtectedRoute({children}) {
  const dispatch=useDispatch();
  const location=useLocation();
  const [authStat,setAuthStat]=useState(true);

  // useLayoutEffect(()=>{
  //   dispatch(customerAuthStatus())
  //   .then(res=>{
  //     if(res.payload.status==='success') setAuthStat(true);
  //   });
  // },[location.pathname])

  return authStat&&children;
}

