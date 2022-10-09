import {React,useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Edituser(){
    const {id}=useParams();
    const [first_name,setFirst_name]=useState('');
    const [last_name,setLast_name]=useState('');
    const [email,setEmail]=useState('');
    const [phone_number,setPhone_number]=useState('');
    const [status,setStatus]=useState('');

    const loadUser=()=>{
        axios.get(`http://localhost:80/users/getuser/${id}`)
        .then(res=>{
            let data=res.data.data;
            if(data==='Error Occured'){
                Swal.fire(
                    'Error After Fetch!',
                    `Error Occured: ${data}`,
                    'warning'
                  )
            }else{
                setFirst_name(data.first_name);
                setLast_name(data.last_name);
                setEmail(data.email);
                setPhone_number(data.phone_number);
                setStatus(data.status);
            }

        }).catch(err=>{
            Swal.fire(
                'Error At Axios Pro!',
                `Error Occured: ${err}`,
                'warning'
              )
        })
    }


    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target);
        axios.put(`http://localhost:80/users/edituser/${id}`,formData,{withCredentials:true})
        .then(res=>{
            let data=res.data.data;
            if(data==='success'){
                
            Swal.fire(
                'Successful!',
                `Data Done: ${data}`,
                'success'
              )
            }else{
            Swal.fire(
                'Error!',
                `${data}`,
                'info'
              )
            }
        }).catch(err=>{

            Swal.fire(
                'Error At Axios!',
                `Error Occured: ${err}`,
                'success'
              )
        });
    }




    useEffect(()=>{
    loadUser();
    },[]);

    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
        <p>Edit User ({id})</p>
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
            <option value='Activate'>Activate</option>
            <option value='Deactivate'>Deactivate</option>
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