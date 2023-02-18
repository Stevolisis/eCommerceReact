import {React, useState} from 'react'
import {  useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Mainheader from '../../components/main_page_layouts/Mainheader';
import Mainfooter from '../../components/Mainfooter'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategory, fetchEvent, filterProducts, filterRatings, priceRange } from '../../Redux/Main/mainRedux';
import Category_products_Listing_layout from '../../components/main_page_layouts/category_products_listing_layout';
import Ratings from '../../components/Ratings';

export default function Products(){
    const [togglefilter,setTogglefilter]=useState(false);
    const [min,setMin]=useState(0);
    const [max,setMax]=useState(0);
    const dispatch=useDispatch();
   const {category}=useParams();
   const {slug}=useParams();
   let ry=3;



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



<div className='sort2'>
<div className='sortheading'>Product Rating</div>
<div className='sortref'>
<input name='lk' value='0'  type='radio' id='0star' onChange={(e)=>dispatch(filterRatings(e.target.value))}/>
    <label htmlFor='0star'><Ratings value={0}/></label>
</div>
<div className='sortref'>
<input name='lk' value='1'  type='radio' id='1star' onChange={(e)=>dispatch(filterRatings(e.target.value))}/>
    <label htmlFor='1star'><Ratings value={1}/></label>
</div>
<div className='sortref'>
<input name='lk' value='2'  type='radio' id='2star' onChange={(e)=>dispatch(filterRatings(e.target.value))}/>
    <label htmlFor='2star'><Ratings value={2}/></label>
</div>
<div className='sortref'>
<input name='lk' value='3'  type='radio' id='3star' onChange={(e)=>dispatch(filterRatings(e.target.value))}/>
    <label htmlFor='3star'><Ratings value={3}/></label>
</div>
<div className='sortref'>
<input name='lk' value='4'  type='radio' id='4star' onChange={(e)=>dispatch(filterRatings(e.target.value))}/>
    <label htmlFor='4star'><Ratings value={4}/></label>
</div>
<div className='sortref'>
<input name='lk' value='5'  type='radio' id='5star' onChange={(e)=>dispatch(filterRatings(e.target.value))}/>
    <label htmlFor='5star'><Ratings value={5}/></label>
</div>
</div>

<div className='sort1'>
 <div className='sortheading'>Price ($)</div>
 <div className='sortref'>
    <input type='number' placeholder='Min' value={min} onChange={(e)=>setMin(e.target.value)} /> - <input type='number' placeholder='Max' value={max} onChange={(e)=>setMax(e.target.value)} />
 </div>
</div>


<div className='sort4'>
 <div className='sortheading'><button onClick={()=>dispatch(priceRange(min+'***'+max))} >Filter</button></div>
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




<div className='sort2'>
<div className='sortheading'>Product Rating</div>
<div className='sortref'>
<input name='lk' value='0'  type='radio' id='0star' onChange={(e)=>dispatch(filterRatings(e.target.value))}/>
    <label htmlFor='0star'><Ratings value={0}/></label>
</div>
<div className='sortref'>
<input name='lk' value='1'  type='radio' id='1star' onChange={(e)=>dispatch(filterRatings(e.target.value))}/>
    <label htmlFor='1star'><Ratings value={1}/></label>
</div>
<div className='sortref'>
<input name='lk' value='2'  type='radio' id='2star' onChange={(e)=>dispatch(filterRatings(e.target.value))}/>
    <label htmlFor='2star'><Ratings value={2}/></label>
</div>
<div className='sortref'>
<input name='lk' value='3'  type='radio' id='3star' onChange={(e)=>dispatch(filterRatings(e.target.value))}/>
    <label htmlFor='3star'><Ratings value={3}/></label>
</div>
<div className='sortref'>
<input name='lk' value='4'  type='radio' id='4star' onChange={(e)=>dispatch(filterRatings(e.target.value))}/>
    <label htmlFor='4star'><Ratings value={4}/></label>
</div>
<div className='sortref'>
<input name='lk' value='5'  type='radio' id='5star' onChange={(e)=>dispatch(filterRatings(e.target.value))}/>
    <label htmlFor='5star'><Ratings value={5}/></label>
</div>
</div>




<div className='sort1'>
 <div className='sortheading'>Price ($)</div>
 <div className='sortref'>
    <input type='number' placeholder='Min' value={min} onChange={(e)=>setMin(e.target.value)} /> - <input type='number' placeholder='Max' value={max} onChange={(e)=>setMax(e.target.value)} />
 </div>
</div>


<div className='sort4'>
 <div className='sortheading'><button onClick={()=>dispatch(priceRange(min+'***'+max))} >Filter</button></div>
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