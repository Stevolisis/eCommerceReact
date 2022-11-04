import {React, useEffect, useRef, useState} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function ProductsLayout({selected6,setSelected6}){
    const [options,setOptions]=useState([]);
    const cancelalert=useRef(true);

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
                setOptions(oldOption=>[...oldOption,{value:option._id, label:option.name}])
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