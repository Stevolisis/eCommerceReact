import { useDispatch } from "react-redux";
import { setAlert } from "../Redux/swalNotify";

const dispatch=useDispatch();

export const swalAlert=(status,heading,message,icon)=>{

    dispatch(setAlert({status:status,head:heading,body:message,icon:icon}));

}