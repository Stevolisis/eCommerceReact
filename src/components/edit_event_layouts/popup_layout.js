import {React, useEffect, useRef, useState} from 'react';
import Select  from 'react-select';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux/Admin/products';
import { fetchCategories } from '../../Redux/Admin/categories';

export default function PopupEvent({selected,setSelected}){
    const [options,setOptions]=useState([]);
    const [message,setMessage]=useState('');
    const [imggallerypreview,setImggallerypreview]=useState('');
    const cancelalert=useRef(true)
    const event=useSelector(state=>state.eventReducer.event);
    const dispatch=useDispatch();

    const loadProducts=()=>{
        dispatch(fetchProducts())
        .then(response=>{
               response.payload.filter(option=>option.status==='active').map(option=>{
                setOptions(oldOption=>[...oldOption,{value:`${option.slug}`, label:`${option.name} (Product)`}])
               });
            });
    }

    const loadCategories=()=>{
        dispatch(fetchCategories())
        .then(response=>{
               response.payload.filter(option=>option.status==='active').map(option=>{
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



    useEffect(()=>{
        if(event&&event.pop_up){
            setMessage(event.pop_up.message);
            setImggallerypreview(event.pop_up.img_link);
            setSelected(oldOption=>[...oldOption,{value:`products/${event.pop_up.slug}`, label:event.pop_up.name}])
        }
    },[event]);




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
            <input type='text' name='message' value={message} onChange={(e)=>setMessage(e.target.value)}/>
            </div>
        </div>

        <div className='admineditnamecon2'>
            <div className='admineditname'>
            <p>Categories/Products</p>
        <Select
            options={options}
            value={selected}
            name='Select'
            onChange={(e)=>(setSelected(e))}
            isSearchable={true}
            />
            <p>Select Category or product where the user will be directed to after clicking View on the Pop Up Event.</p>
            </div>
        </div>
        {/* <div className='admineditnamecon'>
        <div className='admineditname'>
            <p>Valid from</p>
            <input type='datetime-local' name='start'/>
        </div>
        <div className='admineditname'>
            <p>to</p>
            <input type='datetime-local' name='end'/>
        </div>
        </div> */}
        </>
    )
}