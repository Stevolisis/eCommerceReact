import {React, useEffect} from 'react'
import Swal from 'sweetalert2';
import Mainheader from '../../components/main_page_layouts/Mainheader';
import Mainfooter from '../../components/Mainfooter'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, decrement, deleteCartProduct, getCartcount, getCartId, getCartItems, getCartTotal, getSubAmount, increment } from '../../Redux/Main/cart';
import { placeOrder } from '../../Redux/Admin/orders';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loading } from '../../Loaders/setMainLoader';



export default function Cart(){
  const cartId=useSelector(getCartId);
  const cartItems=useSelector(getCartItems);
  const cartCount=useSelector(getCartcount);
  const cartSubAmount=useSelector(getSubAmount);
  const dispatch=useDispatch();
  const [searchParams]=useSearchParams();
  const navigate=useNavigate();
  console.log('next ',searchParams.get('checkout'));

   const deletecartitem=((id)=>{
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
          dispatch(deleteCartProduct(id))
        }
      })
   });

   function handleSubmit(){
    const formData=new FormData();
    formData.append('products',JSON.stringify(cartItems))
    formData.append('cartId',JSON.stringify(cartId))

    dispatch(placeOrder(formData))
    .then(res=>{
      loading(false)
      if(res.payload.status==='Invalid Cart'){
        Swal.fire(
          'Invalid Cart',
          'Unknown cart number',
          'error'
        )
      }else if(res.payload.status==='success'){
        navigate('/checkout/'+res.payload.orderId);
      }else{
        // eslint-disable-next-line no-useless-concat
        return navigate('/auth/login?next='+'cart?checkout=true');
      }
    })
   }

   
   useEffect(()=>{
    if(searchParams.get('checkout')){
      handleSubmit();
    }
   },[]);









    return(
        <>
<div className='main'>

<Mainheader/>



<div className='submain'>


<div className='cartcon'>

<div className='cartproductcon2'>
<div className='cartheading'>
  <h2>Cart ({cartCount})</h2>
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
    <button onClick={()=>dispatch(decrement(product._id))}>-</button>     
    <span>{product.quantity}</span>    
    <button onClick={()=>dispatch(increment(product._id))}>+</button>    
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
<div><p>₦{cartSubAmount}</p></div>
</div>
<div className='cartsummarybutton'>
    <button onClick={()=>handleSubmit()}>CHECKOUT</button>
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