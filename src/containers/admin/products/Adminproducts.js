import {React, useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProductList from '../../../components/listings/ProductList';
import { useDispatch } from 'react-redux';
import { fetchProducts, searchProducts, filterByCategory, filterProducts, deleteProduct} from '../../../Redux/Admin/products';
import { fetchCategories } from '../../../Redux/Admin/categories';


export default function Adminproducts(){
    const navigate=useNavigate();
    const [categories,setcategories]=useState([]);
    let [limit,setlimit]=useState(10);
    const dispatch=useDispatch();

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
    dispatch(fetchCategories())
    .then(res=>setcategories(res.payload))
    .catch(err=>{
        Swal.fire(
            'Error Occured',
            `${err.message}`,
            'error'
          )
    });
    },[dispatch]);

    useEffect(()=>{
    dispatch(fetchProducts(limit))
    },[dispatch,limit]);




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
                    {categories&&categories.map((categ,i)=>{
                        return <option key={i} value={categ.name}>{categ.name}</option>
                    })}
                    </select>
                    <select onChange={(e)=>dispatch(filterProducts(e.target.value))}>
                    <option value='ascend'>Recently Added</option>
                    <option value='descend'>Descending Order</option>
                    <option value='mostSold'>Most Sold</option>
                    <option value='hPrice'>Highest Price</option>
                    <option value='lPrice'>Lowest Price</option>
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
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
        <button onClick={()=>setlimit(limit+10)}>See More</button>
        </div>
        </div>


        </div>
        </div>
        </>
    )
}