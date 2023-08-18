import { useState } from 'react';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setRedirectPath } from '../../../Redux/Auth/userAuthForm';
import { editAddress, fetchAddress, getAddress } from '../../../Redux/UserDashboard/userAddress';

export default function Editaddress(){
    const {id}=useParams();
    const [first_name,setFirst_name]=useState('')
    const [last_name,setLast_name]=useState('')
    const [prefix1,setPrefix1]=useState('')
    const [prefix2,setPrefix2]=useState('')
    const [phone_number1,setPhone_number1]=useState('')
    const [phone_number2,setPhone_number2]=useState('')
    const [address,setAddress]=useState('')
    const [postal_code,setPostal_code]=useState('')
    const [additional_info,setAdditional_info]=useState('')
    const [city,setCity]=useState('')
    const [state,setState]=useState('')
    const [country,setCountry]=useState('')
    const [defaultAddress,setDefaultAddress]=useState(false);
    const dispatch=useDispatch();
    const location=useLocation();
    const addressEdit=useSelector(fetchAddress);


    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target)
        formData.append('id',id);

        Swal.fire({
            title: 'Confirm?',
            text: "Edit address",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(editAddress(formData))
              .then(res=>{
                if(res.payload.status!=='success'){
                   dispatch(setRedirectPath('/auth/login?next='+location.pathname))            
                }
            })
            }
        })
    }

    useLayoutEffect(()=>{
        dispatch(getAddress(id))
        .then(res=>{
            if(res.payload.status!=='success'){
                dispatch(setRedirectPath('/auth/login?next='+location.pathname))            
            }
        })
    },[])

    useEffect(()=>{
        if(addressEdit.first_name){
            setFirst_name(addressEdit.first_name);
            setLast_name(addressEdit.last_name);
            setPrefix1(addressEdit.phone_number1.split(' ')[0]);
            setPhone_number1(parseInt(addressEdit.phone_number1.split(' ')[1]));
            addressEdit.phone_number2&&setPrefix2(addressEdit.phone_number2.split(' ')[0]);
            addressEdit.phone_number2&&setPhone_number2(parseInt(addressEdit.phone_number2.split(' ')[1]));
            setAddress(addressEdit.address)
            setPostal_code(addressEdit.postal_code);
            setAdditional_info(addressEdit.additional_info);
            setCountry(addressEdit.location.country);
            setState(addressEdit.location.state);
            setCity(addressEdit.location.city);
            setDefaultAddress(addressEdit.default);
        }
    },[addressEdit])







    return(
        <>
          <div className='usermaincon'>
        <div className='userorderheading'><p>Edit Address</p></div>
        <div className='userorderscon'>
         
        <form onSubmit={handleSubmit}>
        <div className='usereditnamecon'>
        <div className='usereditname'>
            <p>First Name</p>
            <input required='required' name='first_name' type='text' value={first_name} onChange={(e)=>setFirst_name(e.target.value)}/>
        </div>
        <div className='usereditname'>
            <p>Last Name</p>
            <input required='required' name='last_name' type='text' value={last_name} onChange={(e)=>setLast_name(e.target.value)}/>
        </div>

        </div>

        <div className='usereditnumbercon'>

        <div className='usereditnumber'>
        <div className='usereditprefix'>
            <p>Prefix</p>
            <select name='prefix1' required='required' value={prefix1} onChange={(e)=>setPrefix1(e.target.value)}>
            <option defaultValue='selected' value='+234'>Nigeria (+234)</option>
            <option defaultValue='selected' value='+144'>Ghana (+144)</option>
            <option defaultValue='selected' value='+231'>Liberia (+231)</option>
            </select>
        </div>
        <div className='usereditphonenumber'>
            <p>Phone Number</p>
            <input required='required' name='phone_number1' type='number' value={phone_number1} onChange={(e)=>setPhone_number1(e.target.value)}/>
        </div>
        </div>

        <div className='usereditnumber'>
        <div className='usereditprefix'>
            <p>Prefix</p>
            <select name='prefix2' value={prefix2} onChange={(e)=>setPrefix2(e.target.value)}>
                <option defaultValue='selected' value='+234'>Nigeria (+234)</option>
                <option defaultValue='selected' value='+144'>Ghana (+144)</option>
                <option defaultValue='selected' value='+231'>Liberia (+231)</option>
            </select>
        </div>
        <div className='usereditphonenumber'>
            <p>Phone Number 2</p>
            <input name='phone_number2' type='number' value={phone_number2} onChange={(e)=>setPhone_number2(e.target.value)}/>
        </div>
        </div>

        </div>

        <div className='usereditnamecon'>
        <div className='usereditname'>
            <p>Address</p>
            <input required='required' name='address' type='text' placeholder='Street address, P.O.box...' value={address} onChange={(e)=>setAddress(e.target.value)}/>
        </div>
        <div className='usereditname'>
            <p>Zip/Postal Code</p>
            <input required='required' name='postal_code' type='text' value={postal_code} onChange={(e)=>setPostal_code(e.target.value)}/>
        </div>

        </div>

        <div className='usereditadditionalinfocon'>
            <div className='usereditadditionalinfo'>
            <p>Additional Information</p>
            <input name='additional_info' type='text' value={additional_info} onChange={(e)=>setAdditional_info(e.target.value)}/>
            </div>
        </div>

        <div className='usereditloactioncon'>
            <div className='usereditloaction'>
            <p>Country</p>
            <select name='country' required='required' value={country} onChange={(e)=>setCountry(e.target.value)}>
            <option defaultValue='selected' value='Afghanistan'>Afghanistan</option>
            <option value='Angola'>Angola</option>
            <option value='Ethopia'>Ethopia</option>
            <option value='Germany'>Germany</option>
            </select>
            </div>

            <div className='usereditloaction'>
            <p>State</p>
            <select name='state' required='required' value={state} onChange={(e)=>setState(e.target.value)}>
            <option defaultValue='selected' value='Abia'>Abia</option>
            <option value='Adamawa'>Adamawa</option>
            <option value='Bauchi'>Bauchi</option>
            <option value='Plateau'>Plateau</option>
            </select>
            </div>

            <div className='usereditloaction'>
            <p>City</p>
            <select name='city' required='required' value={city} onChange={(e)=>setCity(e.target.value)}>
            <option defaultValue='selected' value='Yelwa'>Yelwa</option>
            <option value='Darazo'>Darazo </option>
            <option value='Wunti'>Wunti </option>
            <option value='ATBU'>ATBU </option>
            </select>
            </div>
        </div>

        <div className='paymentmethods' style={{padding:'0 10px 20px 10px'}}>
        <input type='checkbox' name='defaultAddress' id='Stripe' onChange={(e)=>setDefaultAddress(!defaultAddress)}/>
        <p><label htmlFor='Stripe'>Set as default Address</label></p>
        </div>

        <div className='usereditbtn'>
        <button>EDIT</button>
        </div>

        </form>

        </div>    
        </div>    
        </>
    )
}