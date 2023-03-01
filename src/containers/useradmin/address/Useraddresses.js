import { useEffect } from 'react';
import {React} from  'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getCustomer, getCustomerdetails } from '../../../Redux/UserDashboard/customerDetails';
import { setDefaultAddress } from '../../../Redux/UserDashboard/userAddress';

export default function Useraddresses(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const customer=useSelector(getCustomerdetails);


    useEffect(()=>{
        dispatch(getCustomer());
    },[])

    return(
        <>
        <div className='usermaincon'>
        <div className='userorderheading'>
            <p>Address(3)</p>
           {/* {popup==='true'? 
            <button onClick={()=>setInview('adduseraddress')}>Add Address</button>
           :
             <button onClick={()=>navigate('/user/addaddress')}>Add</button>}  */}
             <button onClick={()=>navigate('/user/addaddress')}>Add</button>
        </div>

        <div className='userorderscon'>
            <div className='useraddresscon'>

               {customer.addresses&&customer.addresses.length===0 ? 
               
                  <div className='overview'>
                  <div className='overviewdetails'>
                  No Address Found
                  </div>
                  </div>
         
               : customer.addresses&&customer.addresses.map(address=>{
                  return <div className='overview'>

                  <div className='overviewdetails'>
                  <div><p>ADDRESS BOOK</p></div>
                  <div>
                  <p><b>Your default shipping address:</b></p>
                  <p>{address.first_name+' '+address.last_name}</p>
                  <p>{address.address}</p>
                  <p>{address.location.city+' / '+address.location.state+','+address.location.country}</p>
                  <p>{address.phone_number1} </p>
                  {address.phone_number2&&<p>{address.phone_number2}</p>} 
                  </div>
                  <div>
                  {/* {popup==='true'? 
                  ''
                  :
                  <button onClick={()=>navigate(`/user/editaddress/${customer._id}`)}>EDIT ADDRESS</button>
                  } */}

                  <button onClick={()=>navigate(`/user/editaddress/${address._id}`)}>EDIT ADDRESS</button>
                
                  {!address.default&&<button onClick={()=>dispatch(setDefaultAddress(address._id))}>SET AS DEFAULT ADDRESS</button>}
                  </div>
                  </div>
      
                  </div>
               })}

            </div>
        </div>    
        </div>    
        </>
    )
}