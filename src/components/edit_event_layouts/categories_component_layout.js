import {React, useEffect, useRef, useState} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function CategoryLayout({selected,setSelected}){
    const [options,setOptions]=useState([]);
    const cancelalert=useRef(true);

       const loadCategories=()=>{
        axios.get('http://localhost:80/categories/getCategories?o')
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
                console.log(option)
                setOptions(oldOption=>[...oldOption,{value:option._id, label:option.name}])
               })
               console.log(options)

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