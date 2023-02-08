import { useEffect } from 'react';
import { useRef } from 'react';
import {React} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function PopUp_layout({data}){
    const navigate=useNavigate();
    const cancelalert=useRef(true)

    useEffect(()=>{
        if(cancelalert.current){
            cancelalert.current=false;
           setTimeout(()=>{
            Swal.fire({
                title: data.name,
                text: data.message,
                imageUrl: data.img.url,
                imageHeight: 230,
                imageWidth: 540,
                imageAlt: data.name,
                padding:10,
                confirmButtonText:'View',
                denyButtonText:'Ok',
                confirmButtonColor:'#5972b9',
                denyButtonColor:'#fa568d',
                showDenyButton:true
              }).then((result) => {
                if (result.isConfirmed) {
               navigate(data.slug);
              }
              })
           },2000) 
        }
},[navigate])

return(<></>)
}