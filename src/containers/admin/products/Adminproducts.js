import {React, useRef, useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProductList from '../../../components/ProductList';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchProducts, searchProducts, filterByCategory, filterProducts, deleteProduct} from '../../../Redux/Admin/products';

export default function Adminproducts(){
    const navigate=useNavigate();
    const [categories,setcategories]=useState([]);
    const cancelalert=useRef(true);
    let limit=useRef(10);
    const dispatch=useDispatch();


    const loadCategories=()=>{
        axios.get('http://localhost:80/categories/getcategories')
        .then(res=>{
            let status=res.data.status;
            let data=res.data.data||'';
            // console.log(data);

            if(status==='success'){

            data.forEach(categ=>{
            setcategories(oldCateg=>[...oldCateg,categ.name])
            });

            }else{
                Swal.fire(
                    'Error Occured',
                    `${status}`,
                    'warning'
                  )                
            }

        }).catch(e=>{
            Swal.fire(
                'Error Occured',
                `${e.message}`,
                'error'
              )
        })
    }



    const deleteproduct=((id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Confirm Action On Product",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5972b9',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(id));
            }
        });
    })




    


       useEffect(()=>{
        if(cancelalert.current){
            cancelalert.current=false;
            loadCategories();
        }
       },[]);

       useEffect(()=>{
        dispatch(fetchProducts(10));
       },[dispatch]);




    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
            <p>Products</p>
            <button onClick={()=>navigate('/admin/addproduct')}>ADD</button>
            </div>
        <div className='admincategcon'>



            <div className='adminfilterscon'>
            <div className='adminfilters'>
                    <input type='text' placeholder='Search...' onChange={(e)=>dispatch(searchProducts(e.target.value))}/>
                </div>
                <div className='adminfilters'>
                    <select onChange={(e)=>dispatch(filterByCategory(e.target.value))}>
                    <option value='all'>All Category</option>
                    {categories.map((categ,i)=>{
                        return <option key={i} value={categ}>{categ}</option>
                    })}
                    </select>
                    <select onChange={(e)=>dispatch(filterProducts(e.target.value))}>
                    <option value='ascend'>Recently Added</option>
                    <option value='descend'>Descending Order</option>
                    <option value='mostSold'>Most Sold</option>
                    <option value='hPrice'>Highest Price</option>
                    <option value='lPrice'>Lowest Price</option>
                    </select>
                </div>
            </div>



            <div className='adminstat3con'>
        <div className='adminstat3'>
            <div className='adminstat3info2'>
            <table>
              <ProductList deleteproduct={deleteproduct} />
            </table>
            </div>
        </div>
        <div className='adminmorebtn'>
        <button onClick={()=>dispatch(fetchProducts(limit.current+10))}>See More</button>
        </div>
        </div>


        </div>
        </div>
        </>
    )
}