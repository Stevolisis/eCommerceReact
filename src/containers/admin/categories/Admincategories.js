import {React, useEffect, useState,useRef} from 'react';
import {  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CategoryList from '../../../components/CategoryList';
import axios from 'axios';

export default function Admincategories(){
    const [categs,setCategs]=useState([])
    const navigate=useNavigate();
    const cancelalert=useRef(true)

    // const deletecateg=(()=>{
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'question',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           Swal.fire(
    //             'Deleted!',
    //             'Category Deleted.',
    //             'success'
    //           )
    //         }
    //       })
    //    })


       const loadCategs=()=>{
        axios.get('http://localhost:80/categories/getcategories',{withCredientials:true})
        .then(res=>{
            let data=res.data.data;
            setCategs(data);
            console.log(data);
        }).catch(err=>{
            Swal.fire(
                'Error Occured!!',
                'Updated Error.',
                'warning'
              )
        })
    }

        const deletecateg=((id)=>{
            axios.delete(`http://localhost:80/categories/deleteCategory/${id}`,{withCredientials:true})
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
            loadCategs();
        }
       },[]);

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
            <CategoryList deletecateg={deletecateg} categs={categs}/>
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