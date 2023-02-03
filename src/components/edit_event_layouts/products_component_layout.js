import {React, useEffect, useRef, useState} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux/Admin/products';

export default function ProductsLayout({selected,setSelected}){
    const [options,setOptions]=useState([]);
    const [banner_color,setBanner_Color]=useState([]);
    const cancelalert=useRef(true);
    const event=useSelector(state=>state.eventReducer.event);
    const dispatch=useDispatch();
    
    const loadProducts=()=>{
        dispatch(fetchProducts())
        .then(response=>{
               response.payload.filter(product=>product.status==='active').map(option=>{
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


       useEffect(()=>{
        if(event&&event.product_component){
        setBanner_Color(event.product_component.banner_color)

            let slide=[]
            event.product_component.products.forEach(option=>{
            slide.push({value:option._id, label:option.name})
            });
            setSelected(slide);

        }
        },[event]);



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