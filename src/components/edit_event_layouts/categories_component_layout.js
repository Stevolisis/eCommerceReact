import {React, useEffect, useRef, useState} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function CategoryLayout({event,selected,setSelected}){
    const [options,setOptions]=useState([]);
    const [banner_color,setBanner_Color]=useState([]);
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


    useEffect(()=>{
        if(event){
        setBanner_Color(event.category_slider.banner_color)
        setSelected(oldOption=>[...oldOption,{value:event.category_slider.categories.id, label:event.category_slider.categories.name}]);

        {
            let slide=[]
            event.category_slider.categories.forEach(option=>{
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