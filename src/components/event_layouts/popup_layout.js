import {React, useEffect, useRef, useState} from 'react';
import Select  from 'react-select';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../Redux/Admin/products';
import { fetchCategories } from '../../Redux/Admin/categories';

export default function PopupEvent({selected2,setSelected2}){
    const [options,setOptions]=useState([]);
    const [imggallerypreview,setImggallerypreview]=useState('');
    const cancelalert=useRef(true);
    const dispatch=useDispatch();

    const loadProducts=()=>{
        dispatch(fetchProducts())
        .then(response=>{
               response.payload.forEach(option=>{
                setOptions(oldOption=>[...oldOption,{value:`${option.slug}`, label:`${option.name} (Product)`}])
               });
            });
    }

    const loadCategories=()=>{
        dispatch(fetchCategories())
        .then(response=>{
               response.payload.forEach(option=>{
                setOptions(oldOption=>[...oldOption,{value:`${option.slug}`, label:`${option.name} (category)`}])
               })

            });
    }

    function imggalleryPreview(e){
        setImggallerypreview('')
        setImggallerypreview(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(()=>{
        if(cancelalert.current){
            cancelalert.current=false;
            loadProducts();
            loadCategories();
        }
    
       },[]);



    

    return(
        <>
        <div className='previewimg' >
        {imggallerypreview&&<img src={imggallerypreview} alt='Pop Up'/>}
        </div>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Image</p>
            <input type='file' name='img_link' onChange={imggalleryPreview}/>
            </div>
        </div>

        <div className='usereditadditionalinfocon' style={{padding:'10px 0'}}>
            <div className='usereditadditionalinfo'>
            <p>Message</p>
            <input type='text' name='message'/>
            </div>
        </div>

        <div className='admineditnamecon2'>
            <div className='admineditname'>
            <p>Products</p>
        <Select
            options={options}
            value={selected2}
            name='Select'
            onChange={(e)=>(setSelected2(e))}
            isSearchable={true}
            />
            <p>Select Category or product where the user will be directed to after clicking View on the Pop Up Event.</p>
            </div>
        </div>
        </>
    )
}