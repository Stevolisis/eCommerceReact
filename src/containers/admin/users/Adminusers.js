import {React,useEffect, useState,useRef} from 'react';
import Swal from 'sweetalert2';
import UsersList from '../../../components/UsersList';
import axios from 'axios';

export default function Adminusers(){
    const [users,setUsers]=useState([])
    const cancelalert=useRef(true)
   
   const loadUsers=()=>{
    axios.get('http://localhost:80/users/getusers',{withCredientials:true})
    .then(res=>{
        let data=res.data.data;
        setUsers(data);
        console.log(data);
    }).catch(err=>{
        Swal.fire(
            'Error Occured!!',
            'Updated Error.',
            'warning'
          )
    })
}

    const deleteuser=((id)=>{
        axios.delete(`http://localhost:80/users/deleteuser/${id}`,{withCredientials:true})
        .then(res=>{
            let data=res.data.data;
            Swal.fire(
                'Deleted!',
                data,
                'success'
              )
        }).catch(err=>{
            Swal.fire(
                'Error Occured!!',
                'Error at Axios.',
                'warning'
              )
        })
    })

   useEffect(()=>{
    if(cancelalert.current){
        cancelalert.current=false;
        loadUsers();
    }
   },[]);


    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
            <p>Users</p>
            </div>
        <div className='admincategcon'>

            <div className='adminfilterscon'>
            <div className='adminfilters'>
                    <input type='text' placeholder='Search...'/>
                </div>
                <div className='adminfilters'>
                    <select>
                    <option defaultValue='All Category'>All Category</option>
                    <option>Phones</option>
                    <option>Shirts</option>
                    <option>Home Appliances</option>
                    <option>Underwears</option>
                    </select>
                    <select>
                    <option defaultValue='All Category'>Recent Added</option>
                    <option>High product</option>
                    <option>Desc</option>
                    <option>Home Appliances</option>
                    </select>
                </div>
            </div>



            <div className='adminstat3con'>
        <div className='adminstat3'>
            <div className='adminstat3info2'>
            <table>
                <UsersList users={users} deleteuser={deleteuser}/>
            </table>
            </div>
        </div>
        <div className='adminmorebtn'>
            <button>See More</button>
        </div>
        </div>


        </div>
        </div>
        </>
    )
}