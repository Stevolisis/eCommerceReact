import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Mainheader from '../../components/Mainheader'
import Mainfooter from '../../components/Mainfooter'

export default function Products(){
   const navigate=useNavigate();
   const [togglefilter,setTogglefilter]=useState(false);

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
 <div className='sortref'><p>Popularity</p></div>
 <div className='sortref'><p>New in</p></div>
 <div className='sortref'><p>Best Rating</p></div>
 <div className='sortref'><p>Lowest Price</p></div>
 <div className='sortref'><p>Highest Price</p></div>
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
 <div className='sortref'><p>Popularity</p></div>
 <div className='sortref'><p>New in</p></div>
 <div className='sortref'><p>Best Rating</p></div>
 <div className='sortref'><p>Lowest Price</p></div>
 <div className='sortref'><p>Highest Price</p></div>
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




<div className='categproductscon'>
<div className='categproducts'>

<div className='specialproduct2'>

<div className='specialproductimg2' onClick={()=>navigate('/product')}>
<div className='discount2'><p>-20%</p></div>
<div className='productimg2'><img src='/media3/advert6.jpg' alt='productimg' /></div>
</div>

<div className='specialproductinfo2'>

<div className='productname2'>
<p>Heinz Salad Cream 285 Kg</p>
</div>

<div className='productprices2'>
<span>₦ 500</span> <span>₦ 550</span>
</div>

<div className='productprices2'>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <span className='productvolume2'>50 items left</span>
</div>

<div className='productprices2'>
<button onClick={()=>addcart()}>ADD TO CART</button>
</div>

</div>

</div>


<div className='specialproduct2'>

<div className='specialproductimg2' onClick={()=>navigate('/product')}>
<div className='discount2'><p>-20%</p></div>
<div className='productimg2'><img src='/media3/advert6.jpg' alt='productimg' /></div>
</div>

<div className='specialproductinfo2'>

<div className='productname2'>
<p>Heinz Salad Cream 285 Kg</p>
</div>

<div className='productprices2'>
<span>₦ 500</span> <span>₦ 550</span>
</div>

<div className='productprices2'>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <span className='productvolume2'>50 items left</span>
</div>

<div className='productprices2'>
<button onClick={()=>addcart()}>ADD TO CART</button>
</div>

</div>

</div>


<div className='specialproduct2'>

<div className='specialproductimg2' onClick={()=>navigate('/product')}>
<div className='discount2'><p>-20%</p></div>
<div className='productimg2'><img src='/media3/advert6.jpg' alt='productimg' /></div>
</div>

<div className='specialproductinfo2'>

<div className='productname2'>
<p>Heinz Salad Cream 285 Kg</p>
</div>

<div className='productprices2'>
<span>₦ 500</span> <span>₦ 550</span>
</div>

<div className='productprices2'>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
</div>

<div className='productprices2'>
<button onClick={()=>addcart()}>ADD TO CART</button>
</div>

</div>

</div>


<div className='specialproduct2'>

<div className='specialproductimg2' onClick={()=>navigate('/product')}>
<div className='discount2'><p>-20%</p></div>
<div className='productimg2'><img src='/media3/advert6.jpg' alt='productimg' /></div>
</div>

<div className='specialproductinfo2'>

<div className='productname2'>
<p>Heinz Salad Cream 285 Kg</p>
</div>

<div className='productprices2'>
<span>₦ 500</span> <span>₦ 550</span>
</div>

<div className='productprices2'>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
</div>

<div className='productprices2'>
<button onClick={()=>addcart()}>ADD TO CART</button>
</div>

</div>

</div>


<div className='specialproduct2'>

<div className='specialproductimg2' onClick={()=>navigate('/product')}>
<div className='discount2'><p>-20%</p></div>
<div className='productimg2'><img src='/media3/advert6.jpg' alt='productimg' /></div>
</div>

<div className='specialproductinfo2'>

<div className='productname2'>
<p>Heinz Salad Cream 285 Kg</p>
</div>

<div className='productprices2'>
<span>₦ 500</span> <span>₦ 550</span>
</div>

<div className='productprices2'>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
</div>

<div className='productprices2'>
<button onClick={()=>addcart()}>ADD TO CART</button>
</div>

</div>

</div>


<div className='specialproduct2'>

<div className='specialproductimg2' onClick={()=>navigate('/product')}>
<div className='discount2'><p>-20%</p></div>
<div className='productimg2'><img src='/media3/advert6.jpg' alt='productimg' /></div>
</div>

<div className='specialproductinfo2'>

<div className='productname2'>
<p>Heinz Salad Cream 285 Kg</p>
</div>

<div className='productprices2'>
<span>₦ 500</span> <span>₦ 550</span>
</div>

<div className='productprices2'>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
    <i className='fa fa-star'/>
</div>

<div className='productprices2'>
<button onClick={()=>addcart()}>ADD TO CART</button>
</div>

</div>

</div>


</div>
</div>



</div>
</div>

<Mainfooter/>


</div>
        </>
    )
}