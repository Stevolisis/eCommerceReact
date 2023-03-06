import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRedirectPath } from "../../Redux/Auth/userAuthForm";

export default function Navigate(){
    const navigate=useNavigate();
    const redirectPath=useSelector(getRedirectPath);

    useEffect(()=>{
        if(redirectPath){
            navigate(redirectPath)
        }
    },[redirectPath])

    return null
}