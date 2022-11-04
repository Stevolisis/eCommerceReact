import {React, useEffect, useRef, useState} from 'react';
import Select  from 'react-select';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function PopupEvent({event,selected,setSelected}){
    const [options,setOptions]=useState([]);
    const [message,setMessage]=useState('');
    const [imggallerypreview,setImggallerypreview]=useState('');
    const cancelalert=useRef(true)

    const loadProducts=()=>{
        axios.get('http://localhost:80/products/getProducts')
        .then(res=>{
            let response=res.data.data;
            if(!Array.isArray(response)){
                Swal.fire(
                    'Error After Fetch!',
                    `Error Occured: ${response}`,
                    'warning'
                  )
            }else{
               response.forEach(option=>{
                setOptions(oldOption=>[...oldOption,{value:`product/${option.slug}`, label:`${option.name} (Product)`}])
               })

            }
        }).catch(err=>{
            Swal.fire(
                'Error At Axios2!',
                `Error Occured: ${err}`,
                'warning'
              )
        })
    }


    const loadCategories=()=>{
        axios.get('http://localhost:80/categories/getcategories')
        .then(res=>{
            let response=res.data.data;
            //console.log(response);
            if(response==='Error Occured'){
                Swal.fire(
                    'Error After Fetch!',
                    `Error Occured: ${response}`,
                    'warning'
                  )
            }else{
               response.forEach(option=>{
                setOptions(oldOption=>[...oldOption,{value:`products/${option.slug}`, label:`${option.name} (category)`}])
               })

            }
        }).catch(err=>{
            Swal.fire(
                'Error At Axios2!',
                `Error Occured: ${err}`,
                'warning'
              )
        })
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
        if(event){
            setMessage(event.pop_up.message);
            setImggallerypreview(event.pop_up.img_link);
            setSelected(oldOption=>[...oldOption,{value:`products/${event.pop_up.link}`, label:event.pop_up.name}])
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