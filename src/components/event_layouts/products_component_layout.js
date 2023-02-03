import {React, useEffect, useRef, useState} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../Redux/Admin/products';

export default function ProductsLayout({selected6,setSelected6}){
    const [options,setOptions]=useState([]);
    const cancelalert=useRef(true);
    const dispatch=useDispatch();


    const loadProducts=()=>{
        dispatch(fetchProducts())
        .then(response=>{
               response.payload.filter(option=>option.status==='active').map(option=>{
                setOptions(oldOption=>[...oldOption,{value:option._id, label:option.name}])
               })
        })
    }


    useEffect(()=>{
        if(cancelalert.current){
            cancelalert.current=false;
            loadProducts();
        }
    
       },[])

    return(
        <>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Banner Color</p>
            <input type='color' style={{height:'50px'}} name='banner_color'/>
            </div>
        </div>
        <div className='admineditnamecon2'>
            <div className='admineditname'>
            <p>Products</p>
            <MultiSelect
            options={options}
            value={selected6}
            onChange={setSelected6}
            labelledBy='Select'
            />
            </div>
        </div>
        {/* <div className='admineditnamecon'>
        <div className='admineditname'>
            <p>Valid from</p>
            <input type='datetime-local' name='start'/>
        </div>
        <div className='admineditname'>
            <p>to</p>
            <input type='datetime-local'  name='end'/>
        </div>
        </div> */}
        </>
    )
}