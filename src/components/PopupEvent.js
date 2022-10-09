import {React, useEffect, useRef, useState} from 'react';
import Select  from 'react-select';
import Swal from 'sweetalert2';
import axios from 'axios';
import $ from 'jquery';

export default function PopupEvent({selected2,setSelected2}){
    const [options,setOptions]=useState([]);
    const cancelalert=useRef(true)
    const defaultVal=[{value:'l',label:'ss'}];
       const loadProducts=()=>{
        axios.get('http://localhost:80/products/getProducts')
        .then(res=>{
            let response=res.data.data;
            //console.log(response);
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

    useEffect(()=>{
        if(cancelalert.current){
            cancelalert.current=false;
            loadProducts();
            loadCategories();
        }
    
       },[]);

    function gui(){
        console.log(selected2)
    }

    

    return(
        <>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p className='css-6j8wv5-Input' data-value='leopard'>Category Name</p>
            <input type='text' name='name'/>
            </div>
        </div>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Image</p>
            <input type='file' name='popup_img'/>
            </div>
        </div>
        <div className='admineditnamecon2'>
            <div className='admineditname'>
            <p>Products</p>
        <Select
            options={options}
            value={selected2}
            name='Select'
            onChange={(e)=>(setSelected2(e),gui())}
            isSearchable={true}
            />
            {/* style at adminaddcateg.scss */}
            {/* <select>
                {options.map((option,i)=>{
                    return <option value={option.value}>{option.label}</option>
                })}
            </select> */}
            <p onClick={()=>console.log($('.css-6j8wv5-Input').data('value'))}>Select Category or product where the user will be directed to after clicking View on the Pop Up Event.</p>
            </div>
        </div>
        <div className='admineditnamecon'>
        <div className='admineditname'>
            <p>Valid from</p>
            <input type='datetime-local' name='start'/>
        </div>
        <div className='admineditname'>
            <p>to</p>
            <input type='datetime-local' name='end'/>
        </div>
        </div>
        </>
    )
}