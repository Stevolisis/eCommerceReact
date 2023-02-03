import {React, useState} from 'react'
import {  useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Mainheader from '../../components/main_page_layouts/Mainheader';
import Mainfooter from '../../components/Mainfooter'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategory, fetchEvent, filterProducts } from '../../Redux/Main/mainRedux';
import Category_products_Listing_layout from '../../components/main_page_layouts/category_products_listing_layout';

export default function Products(){
   const [togglefilter,setTogglefilter]=useState(false);
   const dispatch=useDispatch();
   const {category}=useParams();
   const {slug}=useParams();



   useEffect(()=>{
    if(category==='category') dispatch(fetchCategory(category+'***'+slug));
    if(category==='products') dispatch(fetchEvent(category+'***'+slug));
   },[]);


   const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

const addcart=(()=>{
Toast.fire({
    icon: 'success',
    title: 'Product added to cart'
})
})


    return(

        <>
<div className='main'>


<Mainheader route='products' setTogglefilter={setTogglefilter} togglefilter={togglefilter}/>





<div className='submain'>

<div className='section1categ'>


<div className='filtercon' style={{display: `${togglefilter===true ? 'block' : 'none'}`}}>

<div className='filter'>

<div className='sort1'>
 <div className='sortheading'>Sort by</div>
 <div className='sortref' onClick={()=>dispatch(filterProducts('popularity'))}><p>Popularity</p></div>
 <div className='sortref' onClick={()=>dispatch(filterProducts('new in'))}><p>New in</p></div>
 <div className='sortref' onClick={()=>dispatch(filterProducts('rating'))}><p>Best Rating</p></div>
 <div className='sortref' onClick={()=>dispatch(filterProducts('lowest price'))}><p>Lowest Price</p></div>
 <div className='sortref' onClick={()=>dispatch(filterProducts('highest price'))}><p>Highest Price</p></div>
</div>

<div className='sort1'>
 <div className='sortheading'>Price ($)</div>
 <div className='sortref'>
    <input type='number' placeholder='Min'/> - <input type='number' placeholder='Max'/>
 </div>
</div>

<div className='sort2'>
<div className='sortheading'>Product Rating</div>
<div className='sortref'>
    <input type='checkbox'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
</div>
<div className='sortref'>
    <input type='checkbox'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
</div>
<div className='sortref'>
    <input type='checkbox'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
</div>
<div className='sortref'>
    <input type='checkbox'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
</div>
<div className='sortref'>
    <input type='checkbox'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
</div>
</div>

<div className='sort4'>
 <div className='sortheading'><button>Save</button></div>
</div>



</div>
</div>


<div className='filtercon2'>

<div className='filter'>


<div className='sort3' >
 <div className='sortheading'><i className='fa fa-filter'/><span>Filter</span></div>
</div>

<div className='sort1'>
 <div className='sortheading'>Sort by</div>
 <div className='sortref' onClick={()=>dispatch(filterProducts('popularity'))}><p>Popularity</p></div>
 <div className='sortref' onClick={()=>dispatch(filterProducts('new in'))}><p>New in</p></div>
 <div className='sortref' onClick={()=>dispatch(filterProducts('rating'))}><p>Best Rating</p></div>
 <div className='sortref' onClick={()=>dispatch(filterProducts('lowest price'))}><p>Lowest Price</p></div>
 <div className='sortref' onClick={()=>dispatch(filterProducts('highest price'))}><p>Highest Price</p></div>
</div>

<div className='sort1'>
 <div className='sortheading'>Price ($)</div>
 <div className='sortref'>
    <input type='number' placeholder='Min'/> - <input type='number' placeholder='Max'/>
 </div>
</div>

<div className='sort2'>
<div className='sortheading'>Product Rating</div>
<div className='sortref'>
    <input type='checkbox'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
</div>
<div className='sortref'>
    <input type='checkbox'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
</div>
<div className='sortref'>
    <input type='checkbox'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
</div>
<div className='sortref'>
    <input type='checkbox'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
</div>
<div className='sortref'>
    <input type='checkbox'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
</div>
</div>

<div className='sort4'>
 <div className='sortheading'><button>Save</button></div>
</div>



</div>
</div>




<Category_products_Listing_layout addcart={addcart}/>



</div>
</div>

<Mainfooter/>


</div>
        </>
    )
}