import {React} from 'react';
import Swal from 'sweetalert2';

export default function Addcoupon(){
    const addcoupon=(()=>{
        Swal.fire(
          'Successful!',
          'Coupon Added.',
          'success'
        )
        });

    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
        <p>Add Coupon</p>
        </div>
        <div className='addcategcon'>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Title</p>
            <input type='text' name='title'/>
            </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Description</p>
            <input type='text' name='description'/>
            </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Category</p>
            <input type='text' name='category' value='Discount' disabled/>
            </div>
        </div>
        
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Offer Value</p>
            <input type='text' name='offer_value'/>
            </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>CODE</p>
            <input type='text' name='code'/>
            </div>
        </div>

        <div className='admineditnamecon'>
        <div className='admineditname'>
            <p>Valid from</p>
            <input type='datetime-local' name='start'/>
        </div>
        <div className='admineditname'>
            <p>to</p>
            <input type='datetime-local' name='end'/>
        </div>
        </div>

        <div className='admineditnamecon'>
        <div className='admineditname'>
            <p>Status</p>
            <select name='status'>
                <option defaultValue='discount'>Active</option>
                <option>Inactive</option>
            </select>
            </div>
        </div>

        <div className='usereditbtn'>
        <button onClick={()=>addcoupon()}>Add</button>
        </div>
        </div>            
        </div>
        </>
    )
}