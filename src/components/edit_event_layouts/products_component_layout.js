import {React, useEffect, useRef, useState} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function ProductsLayout({event,selected,setSelected}){
    const [options,setOptions]=useState([]);
    const [banner_color,setBanner_Color]=useState([]);
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


       useEffect(()=>{
        if(event){
        setBanner_Color(event.product_component.banner_color)
        setSelected(oldOption=>[...oldOption,{value:event.product_component.products.id, label:event.product_component.products.name}]);

        {
            let slide=[]
            event.product_component.products.forEach(option=>{
            slide.push({value:option._id, label:option.name})
            });
            setSelected(slide);
        }
        console.log(selected)

    }

    },[event])

    return(
        <>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Banner Color</p>
            <input type='color' style={{height:'50px'}} name='banner_color' value={banner_color} onChange={(e)=>setBanner_Color(e.target.value)}/>
            </div>
        </div>
        <div className='admineditnamecon2'>
            <div className='admineditname'>
            <p>Products</p>
            <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
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