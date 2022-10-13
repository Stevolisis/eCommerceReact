import Swal from "sweetalert2";

export const baseUrl='http://localhost:80';

export const swalAlert=(heading,message,status)=>{
   return(
     Swal.fire(
        `${heading}`,
        `${message}`,
        `${status}`
    )
   )
}