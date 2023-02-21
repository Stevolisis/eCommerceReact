import {React} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import Mainheader from '../../components/main_page_layouts/Mainheader';
import Mainfooter from '../../components/Mainfooter'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCartItems } from '../../Redux/Main/cart';

export default function Cart(){
   const navigate=useNavigate();
   const cartItems=useSelector(getCartItems);
   const dispatch=useDispatch();
   
   const deletecartitem=(()=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Removed!',
            'Product removed from cart.',
            'success'
          )
        }
      })
   })

    return(
        <>
<div className='main'>

<Mainheader/>



<div className='submain'>


<div className='cartcon'>

<div className='cartproductcon2'>
<div className='cartheading'>
  <h2>Cart (2)</h2>
  <button onClick={()=>dispatch(clearCart())}>Clear Cart</button>
  </div>


{
 cartItems.length===0 ? 
  <div className='cartEmpty'>No Item in Cart</div>
  :
  cartItems.map((product,i)=>{
    return <div className='cartproductcon' key={i}>
    <div className='cartproduct'>
    <div className='cartimg'>
    <div className='cartdiscount'><p>{(product.regular_price-product.sale_price)/100}%</p></div>
    <img src={product.img_gallery[0].url} alt={product.name} />
    </div>
    
    <div className='cartinfo'>
    <div>
    <div className='cartproductname'><p>{product.name}</p></div>
    <div className='cartproductprice'><span>₦ {product.sale_price}</span> <span>₦ {product.regular_price}</span></div>
    </div>
    
    <div className='quantityCon'>
    <button>+</button>    
    <span>{product.quantity}</span>    
    <button>-</button>    
    </div>
    
    
    </div>
    </div>
    
    <div className='cartactions'>
    <button onClick={()=>deletecartitem(product._id)}>Remove</button>
    </div>
    
    </div>
  })
}



</div>




<div className='cartsummarycon'>
<div className='cartsummary'>
<div className='cartsummaryheading'>CART SUMMARY</div>
<div className='cartsummaryinfo'>
<div><p>Subtotal</p></div>
<div><p>₦ 3,690</p></div>
</div>
<div className='cartsummarybutton'>
    <button onClick={()=>navigate('/checkout')}>CHECKOUT (₦3,690)</button>
</div>
</div>
</div>


</div>




<div className='section3'>
<div className='specialcateg'>

<div className='specialcateghead' style={{background:'#191a1c'}}>
<div className='specialhead1'>
<p>Related Products</p>
</div>
<div className='specialhead1'>
<Link to='/'>See All</Link>
</div>

</div>

<div className='specialcategproducts'>
{[1,2,3,4,5,6,7,8].map((specprod,i)=>{
  return <div className='specialproduct' key={i}>

<Link to='/'>
<div className='specialproductimg'>
<div className='discount'><p>-20%</p></div>
<div className='productimg'><img src='/media3/advert6.jpg' alt='productimg' /></div>
</div>

<div className='specialproductinfo'>

<div className='productname'>
<p>Heinz Salad Cream 285 Kg</p>
</div>

<div className='productprices'>
<span>₦ 500</span> <span>₦ 550</span>
</div>


</div>
</Link>
</div>
 
})}


</div>
</div>
</div>





</div>

<Mainfooter/>

</div>
        </>
    )
}