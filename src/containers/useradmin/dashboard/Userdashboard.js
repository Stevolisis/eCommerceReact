import {React} from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getCustomerdetails } from '../../../Redux/UserDashboard/customerDetails';

export default function Useraccount(){
  const customer=useSelector(getCustomerdetails);

    const confirmchangepassword=(()=>{
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
              Swal.fire(
                'Email Sent!',
                'Reset link sent to your email.',
                'success'
              )
            }
          })
       })
    return(
        <>
        <div className='usermaincon'>
        <div className='userorderheading'>
            <p>Account Overview</p>
        </div>
<div className='username'><p>Hi, {customer.first_name}</p></div>


<div className='overviewcon'>
<div className='overview'>

<div className='overviewdetails'>
<div><p>ACCOUNT DETAILS</p></div>
<div>
<p><b>{customer.first_name+' '+customer.last_name}</b></p>
<p>{customer.email}</p>
</div>
<div><button onClick={()=>confirmchangepassword(customer._id)}>CHANGE PASSWORD</button></div>
</div>

</div>

<div className='overview'>

{customer.addresses.length!==0 ?<div className='overviewdetails'>
<div><p>ADDRESS BOOK</p></div>
<div>
<p><b>Your default shipping address:</b></p>
<p>Steven Joseph
Abubakar tafawa balewa university,yelwa canpus
Yelwa / Fed. Poly, Bauchi
+234 8103987495 </p>
</div>
<div><button>EDIT ADDRESS</button></div>
</div>

:

<div className='overviewdetails'>
<div><p>ADDRESS BOOK</p></div>
<div>
<p>No Address Found</p>
</div>
<div><button>ADD ADDRESS</button></div>
</div>
}

</div>


</div>
</div>
        </>
    )
}