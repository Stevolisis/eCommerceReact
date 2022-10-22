import {React, useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CategoryList from '../../../components/listings/CategoryList';
import { deleteCategory, fetchCategories, filterCategories, searchCategories } from '../../../Redux/Admin/categories';
import { useDispatch } from 'react-redux';

export default function Admincategories(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    let [limit,setlimit]=useState(10);


    const deletecateg=((id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Confirm Action On Category",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5972b9',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCategory(id));
            }
        });
    })


        useEffect(()=>{
        dispatch(fetchCategories(limit));
        },[dispatch,limit]);

        
    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
            <p>Categories</p>
            <button onClick={()=>navigate('/admin/addcategory')}>ADD</button>
            </div>

            
        <div className='admincategcon'>

            <div className='adminfilterscon'>
            <div className='adminfilters'>
                    <input type='text' placeholder='Search...' onChange={(e)=>dispatch(searchCategories(e.target.value))}/>
                </div>
                <div className='adminfilters'>
                    <select onChange={(e)=>dispatch(filterCategories(e.target.value))}>
                    <option value='ascend'>Recent Added</option>
                    <option value='descend'>Descending Order</option>
                    <option value='mostProduct'>Most Products</option>
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                    </select>
                </div>
            </div>



            <div className='adminstat3con'>
        <div className='adminstat3'>
            <div className='adminstat3info2'>
            <table>
            <CategoryList deletecateg={deletecateg}/>
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