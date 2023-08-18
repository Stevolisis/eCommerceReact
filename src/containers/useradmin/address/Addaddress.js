import { useLayoutEffect } from 'react';
import {React} from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { customerAuthStatus, setRedirectPath } from '../../../Redux/Auth/userAuthForm';
import { addAddress } from '../../../Redux/UserDashboard/userAddress';

export default function Adduseraddress(){
    const dispatch=useDispatch();
    const location=useLocation();
    const [queryString]=useSearchParams();
    console.log(location)

    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target)
        dispatch(addAddress(formData))
        .then(res=>{
            
            if(res.payload.status!=='success'){
                if(queryString.get('next')) dispatch(setRedirectPath('/auth/login?next='+queryString.get('next')))
                if(!queryString.get('next')) dispatch(setRedirectPath('/auth/login?next='+location.pathname))            
            }else{
                if(queryString.get('next')) dispatch(setRedirectPath(queryString.get('next')))
            }
        })
    };

    useLayoutEffect(()=>{
        if(location.search){
            dispatch(customerAuthStatus(location.pathname+location.search))
        }else{
            dispatch(customerAuthStatus(location.pathname))
        }
    },[])






    
    return(
        <>
          <div className='usermaincon'>
        <div className='userorderheading'><p>Add Address</p></div>
        <div className='userorderscon'>
         
        <form onSubmit={handleSubmit}>
        <div className='usereditnamecon'>
        <div className='usereditname'>
            <p>First Name</p>
            <input required='required' name='first_name' type='text'/>
        </div>
        <div className='usereditname'>
            <p>Last Name</p>
            <input required='required' name='last_name' type='text' />
        </div>

        </div>

        <div className='usereditnumbercon'>

        <div className='usereditnumber'>
        <div className='usereditprefix'>
            <p>Prefix</p>
            <select name='prefix1' required='required'>
                <option defaultValue='selected' value='+234'>Nigeria (+234)</option>
                <option defaultValue='selected' value='+144'>Ghana (+144)</option>
                <option defaultValue='selected' value='+231'>Liberia (+231)</option>
            </select>
        </div>
        <div className='usereditphonenumber'>
            <p>Phone Number</p>
            <input required='required' name='phone_number1' type='number' />
        </div>
        </div>

        <div className='usereditnumber'>
        <div className='usereditprefix'>
            <p>Prefix</p>
            <select name='prefix2'>
                <option defaultValue='selected' value='+234'>Nigeria (+234)</option>
                <option defaultValue='selected' value='+144'>Ghana (+144)</option>
                <option defaultValue='selected' value='+231'>Liberia (+231)</option>
            </select>
        </div>
        <div className='usereditphonenumber'>
            <p>Phone Number 2</p>
            <input name='phone_number2' type='number' />
        </div>
        </div>

        </div>

        <div className='usereditnamecon'>
        <div className='usereditname'>
            <p>Address</p>
            <input required='required' name='address' type='text' placeholder='Street address, P.O.box...'/>
        </div>
        <div className='usereditname'>
            <p>Zip/Postal Code</p>
            <input required='required' name='postal_code' type='text'/>
        </div>

        </div>

        <div className='usereditadditionalinfocon'>
            <div className='usereditadditionalinfo'>
            <p>Additional Information</p>
            <input name='additional_info' type='text' />
            </div>
        </div>

        <div className='usereditloactioncon'>
            <div className='usereditloaction'>
            <p>Country</p>
            <select name='country' required='required'>
            <option defaultValue='selected' value='Afghanistan'>Afghanistan</option>
            <option value='Angola'>Angola</option>
            <option value='Ethopia'>Ethopia</option>
            <option value='Germany'>Germany</option>
            </select>
            </div>

            <div className='usereditloaction'>
            <p>State</p>
            <select name='state' required='required'>
            <option defaultValue='selected' value='Abia'>Abia</option>
            <option value='Adamawa'>Adamawa</option>
            <option value='Bauchi'>Bauchi</option>
            <option value='Plateau'>Plateau</option>
            </select>
            </div>

            <div className='usereditloaction'>
            <p>City</p>
            <select name='city' required='required'>
            <option defaultValue='selected' value='Yelwa'>Yelwa</option>
            <option value='Darazo'>Darazo </option>
            <option value='Wunti'>Wunti </option>
            <option value='ATBU'>ATBU </option>
            </select>
            </div>
        </div>

        <div className='paymentmethods' style={{padding:'0 10px 20px 10px'}}>
        <input type='checkbox' name='defaultAddress' id='Stripe'/>
        <p><label htmlFor='Stripe'>Set as default Address</label></p>
        </div>

        <div className='usereditbtn'>
        <button onClick={()=>addAddress()}>ADD</button>
        </div>

        </form>

        </div>    
        </div>    
        </>
    )
}