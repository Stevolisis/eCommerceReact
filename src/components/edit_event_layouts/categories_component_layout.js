import {React, useEffect, useRef, useState} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../Redux/Admin/categories';

export default function CategoryLayout({selected,setSelected}){
    const [options,setOptions]=useState([]);
    const [banner_color,setBanner_Color]=useState([]);
    const cancelalert=useRef(true);
    const event=useSelector(state=>state.eventReducer.event);
    const dispatch=useDispatch();

    const loadCategories=()=>{
        dispatch(fetchCategories())
        .then(response=>{
               response.payload.forEach(option=>{
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


    useEffect(()=>{
        if(event&&event.category_slider){
        setBanner_Color(event.category_slider.banner_color)
        setSelected(oldOption=>[...oldOption,{value:event.category_slider.categories.id, label:event.category_slider.categories.name}]);
        let slide=[]
        event.category_slider.categories.forEach(option=>{
        slide.push({value:option._id, label:option.name})
        });
        setSelected(slide);
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