import {React,useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { editUser, fetchUser } from '../../../Redux/Admin/users';

export default function Edituser(){
    const {id}=useParams();
    const [first_name,setFirst_name]=useState('');
    const [last_name,setLast_name]=useState('');
    const [email,setEmail]=useState('');
    const [phone_number,setPhone_number]=useState('');
    const [status,setStatus]=useState('');
    const dispatch=useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "Confirm Action On User",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5972b9',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Edit it!'
          }).then((result) => {
            if (result.isConfirmed) {
                const formData=new FormData(e.target);
                formData.append('id',id);

                dispatch(editUser(formData));
            }
          })
   
    }




    useEffect(()=>{
        dispatch(fetchUser(id))
        .then(res=>{
            let data=res.payload;
            setFirst_name(data.first_name);
            setLast_name(data.last_name);
            setEmail(data.email);
            setPhone_number(data.phone_number);
            setStatus(data.status);
        }).catch(err=>{Swal.fire('Error Occured', `${err.message}`,'error')});
    },[dispatch,id])




    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
        <p>Edit User</p>
        </div>
        <div className='addcategcon'>
            <form onSubmit={handleSubmit}>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>First Name</p>
            <input type='text' name='first_name' value={first_name} onChange={(e)=> setFirst_name(e.target.value)}/>
            </div>
        </div>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Last Name</p>
            <input type='text' name='last_name' value={last_name} onChange={(e)=> setLast_name(e.target.value)}/>
            </div>
        </div>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Phone Number</p>
            <input type='number' name='phone_number' value={phone_number} onChange={(e)=> setPhone_number(e.target.value)}/>
            </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Email Address</p>
            <input type='email' name='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
        </div>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Status</p>
            <select name='status' value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value='active'>Activate</option>
            <option value='inactive'>Deactivate</option>
            </select>
            </div>
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