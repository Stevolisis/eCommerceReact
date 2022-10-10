import {React, useRef, useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProductList from '../../../components/ProductList';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loadProducts } from '../../../Redux/Admin/products/productList';

export default function Adminproducts(){
    const navigate=useNavigate();
    const [products,setProducts]=useState([]);
    const [backup,setbackup]=useState([]);
    const [total,settotal]=useState('');
    const [categories,setcategories]=useState([]);
    const filterData=Array.from(products);
    const cancelalert=useRef(true);
    let limit=useRef(10);
    const dispatch=useDispatch();



    const loadCategories=()=>{
        axios.get('http://localhost:80/categories/getcategories')
        .then(res=>{
            let status=res.data.status;
            let data=res.data.data||'';
            console.log(data);

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


    const loadProducts2=()=>{
        axios.get(`http://localhost:80/products/getProducts?limit=${limit.current}`,{withCredientials:true})
        .then(res=>{
            let status=res.data.status;
            let data=res.data.data||"";
            
            if(status==='success'){
            setProducts(data);
            setbackup(data);
            settotal(data.length);
            console.log('Redux Products',dispatch(loadProducts(data)))
            }else{
                Swal.fire(
                    'Error Occured',
                    status,
                    'warning'
                  )
            }

        }).catch(e=>{
            Swal.fire(
                'Error Occured',
                e.message,
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

            axios.delete(`http://localhost:80/products/deleteProduct/${id}`,{withCredientials:true})
            .then(res=>{
                let status=res.data.status;
                if(status==='success'){
                Swal.fire(
                    'Deleted!',
                    'Producted Delete Successful',
                    'success'
                  )  
                 return loadProducts();                  
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
    });
        })


    function loadLimit(){
    limit.current=limit.current+10;
    loadProducts2()
    }


    
  function filter(e){
    console.log(categories);

    if(e==='ascend'){
        setProducts(filterData.sort((a,b)=>a._id < b._id ? 1:-1));
    }else if(e==='descend'){
        setProducts(filterData.sort((a,b)=>a._id < b._id ? -1:1));
    }else if(e==='mostSold'){
        setProducts(filterData.sort((a,b)=>a.sold < b.sold ? 1:-1));
    }else if(e==='hPrice'){
        setProducts(filterData.sort((a,b)=>a.sale_price < b.sale_price ? 1:-1));
    }else if(e==='lPrice'){
        setProducts(filterData.sort((a,b)=>a.sale_price < b.sale_price ? -1:1));
    }
  }


    function filterByName(e){
        console.log(e);
        let filterdata2=[];
        for (let i = 0; i < backup.length; i++) {
        if(backup[i].name.toLowerCase().includes(e.toLowerCase())){
        filterdata2.push(backup[i]);
        }      
        }
        setProducts(filterdata2);
    }

    function filterByNameArray(e){
        let arr1=[];
        let searchData=e.split(',');

        if(e==='all'){
            setProducts(backup);
        }else{
        for (let i = 0; i < backup.length; i++) {
            if(backup[i].category.some(arr=>searchData.includes(arr.name))){
                arr1.push(backup[i])
            }
        }
        setProducts(arr1);
        }

        
    }

    


       useEffect(()=>{
        if(cancelalert.current){
            cancelalert.current=false
            loadProducts2();
            loadCategories();
        }
       },[]);


    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
            <p>Products ({total})</p>
            <button onClick={()=>navigate('/admin/addproduct')}>ADD</button>
            </div>
        <div className='admincategcon'>



            <div className='adminfilterscon'>
            <div className='adminfilters'>
                    <input type='text' placeholder='Search...' onChange={(e)=>{filterByName(e.target.value)}}/>
                </div>
                <div className='adminfilters'>
                    <select onChange={(e)=>filterByNameArray(e.target.value)}>
                    <option value='all'>All Category</option>
                    {categories.map((categ,i)=>{
                        return <option key={i} value={categ}>{categ}</option>
                    })}
                    </select>
                    <select onChange={(e)=>filter(e.target.value)}>
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
              <ProductList deleteproduct={deleteproduct} products={products}/>
            </table>
            </div>
        </div>
        <div className='adminmorebtn'>
        <button onClick={loadLimit}>See More</button>
        </div>
        </div>


        </div>
        </div>
        </>
    )
}