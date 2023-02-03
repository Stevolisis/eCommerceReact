import {React, useEffect, useRef, useState} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../Redux/Admin/categories';

export default function CategoryLayout({selected,setSelected}){
    const [options,setOptions]=useState([]);
    const cancelalert=useRef(true);
    const dispatch=useDispatch();


    
    const loadCategories=()=>{
        dispatch(fetchCategories())
        .then(response=>{
               response.payload.filter(option=>option.status==='active').map(option=>{
                setOptions(oldOption=>[...oldOption,{value:option._id, label:option.name}])
               })
            });
    }


    useEffect(()=>{
        if(cancelalert.current){
            cancelalert.current=false;
            loadCategories();
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
            <p>Categories</p>
            <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy='Select'
            />
            </div>
        </div>
        </>
    )
}