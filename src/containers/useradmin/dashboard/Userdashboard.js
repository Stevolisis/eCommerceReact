import { useEffect } from 'react';
import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { sendPasswordResetLink } from '../../../Redux/Auth/userAuthForm';
import { getCustomer, getCustomerdetails } from '../../../Redux/UserDashboard/customerDetails';

export default function Useraccount(){
  const customer=useSelector(getCustomerdetails);
  const navigate=useNavigate();
  const dispatch=useDispatch();

    const confirmchangepassword=((email)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Reset link will be sent to your email!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
              const formdata=new FormData();
              formdata.append('email',email);
              dispatch(sendPasswordResetLink(formdata));
            }
          })
       });

    useEffect(()=>{
        dispatch(getCustomer());
    },[])




  
    return(
        <>
        <div className='usermaincon'>
        <div className='userorderheading'>
            <p>Account Overview</p>
        </div>

{customer.first_name&&<div className='username'><p>Hi, {customer.first_name}</p></div>}


<div className='overviewcon'>
<div className='overview'>

{customer.first_name&&<div className='overviewdetails'>
<div><p>ACCOUNT DETAILS</p></div>
<div>
<p><b>{customer.first_name+' '+customer.last_name}</b></p>
<p>{customer.email}</p>
</div>
<div><button onClick={()=>confirmchangepassword(customer.email)}>CHANGE PASSWORD</button></div>
</div>}

</div>

<div className='overview'>

{
   customer.addresses&&customer.addresses.length!==0 ?
  customer.addresses
  .filter(address=>address.default==true)
  .map((addressDefault,i)=>{
    return <div className='overviewdetails' key={i}>
    <div><p>ADDRESS BOOK</p></div>
    <div>
    <p><b>Your default shipping address:</b></p>
    <p>{addressDefault.first_name+' '+addressDefault.last_name}</p>
    <p>{addressDefault.address+' /'+addressDefault.location.city+','+addressDefault.state+','+addressDefault.country}</p>
    <p>{addressDefault.phone_number1} </p>
    {addressDefault.phone_number2&&<p>{addressDefault.phone_number2}</p>} 
    </div>
    <div><button onClick={()=>navigate(`/user/editaddress`)}>EDIT ADDRESS</button></div>
    </div>
  })

  :

  <div className='overviewdetails'>
  <div><p>ADDRESS BOOK</p></div>
  <div>
  <p>No Default Address Found</p>
  </div>
  <div><button onClick={()=>navigate(`/user/addaddress`)}>ADD ADDRESS</button></div>
  </div>
}

</div>


</div>
</div>
        </>
    )
}