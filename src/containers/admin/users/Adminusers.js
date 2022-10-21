import {React,useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import UsersList from '../../../components/listings/UsersList';
import axios from 'axios';
import { deleteUser, fetchUsers } from '../../../Redux/Admin/users';
import { useDispatch } from 'react-redux';

export default function Adminusers(){
    let [limit,setlimit]=useState(1);
    const dispatch=useDispatch();



    const deleteuser=((id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Confirm Action On User",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5972b9',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(id));
            }
        });
    })

    useEffect(()=>{
    dispatch(fetchUsers(limit));
    },[dispatch,limit]);


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
                    <option value='ascend'>Recent Added</option>
                    <option value='descend'>Descending Order</option>
                    <option value='mostOrders'>Most Orders</option>
                    <option value='mostWishist'>Most Wishlist</option>
                    <option value='verified'>Verified</option>
                    <option value='unverified'>Unverified</option>
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                    </select>
                </div>
            </div>



            <div className='adminstat3con'>
        <div className='adminstat3'>
            <div className='adminstat3info2'>
            <table>
                <UsersList deleteuser={deleteuser}/>
            </table>
            </div>
        </div>
        <div className='adminmorebtn'>
        <button onClick={()=>setlimit(limit+10)}>See More</button>
        </div>
        </div>


        </div>
        </div>
        </>
    )
}