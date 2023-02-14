import {React,useState,useEffect, useReducer} from 'react'
import { Link, useParams } from 'react-router-dom'
import Accordion from '../../components/accordions/Accordion'
import Reviews from '../../components/Reviews'
import Swal from 'sweetalert2';
// import { faHeart,faBell,faStar } from '@fortawesome/free-regular-svg-icons'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Ratings from '../../components/Ratings';
import Mainheader from '../../components/main_page_layouts/Mainheader';
import Mainfooter from '../../components/Mainfooter'
import ProductSlides from '../../components/ProductSlides';
import { fetchProduct, getProduct } from '../../Redux/Main/mainRedux';
import { useDispatch, useSelector } from 'react-redux';

export default function Product(){
    const[wishColor,setWishColor]=useState(false);
    const {slug}=useParams();
    const dispatch=useDispatch();
    const product=useSelector(getProduct);

    const [count, setCount] = useReducer((state, action) =>
        action.type === 'increment'? state < product.stock ? state + 1 
        : state: action.type === 'decrement'? state > 0 ? state - 1
        : state: (() => { throw new Error(`Unsupported action type: ${action.type}`) })()
    , 0);



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



    const addcart=((info)=>{
    Toast.fire({
        icon: 'success',
        title: info
      })
    })


    function addToWishList(){
        if(wishColor){
            setWishColor(!wishColor)
            addcart('Product Removed from Wishlist');
        }else{
            setWishColor(!wishColor)
            addcart('Product added to your Wishlist');
        }
    }


    useEffect(()=>{
        dispatch(fetchProduct('product***'+slug));
    },[]);






    return(
        <>
       <div className='main'>

       <Mainheader/>


<div className='submain'>


<div className='productcon'>

<div className='productimgslidercon'>



<ProductSlides/>

</div>

<div className='productinfocon'>
<div className='gproductname'><p>{product.name}</p></div>
<div className='gproductcateg'><p>Category : {product.category&&product.category.map(categ=> categ.name+' | ')}</p></div>
<div className='gproductratings'>
    <div className='gproductrating'>
        <Ratings value={product.rating} />
    </div>


    <div className='gratings2'>
    {/* <FontAwesomeIcon icon={faHeart}/> */}
    <i className='fa fa-heart' onClick={addToWishList} style={{color:`${wishColor===true ? '#fa568d' : 'lightgray'}`}}>
        <span>Add to wishlist</span>
    </i>
    </div>
</div>
<div className='gproductprice'><span>₦ {product.sale_price}</span> <span>₦ {product.regular_price}</span><span>-20%</span></div>
<div className='gproductshippinginfo'>{product.shipping&&'+ shipping : ₦'+product.shipping } </div>
<div className='gproductshippinginfo'>{product.stock&&'+ In Stock : '+product.stock } </div>
<div className='gproductshippinginfo'>

<div className='gproductData'>
{/* <div className='quantityCon' style={{boxShadow:'1px 2px transparent',border:'0'}}>
<select>
<option>L</option>
<option>XL</option>
<option>X</option>
</select>
</div> */}

<div className='quantityCon'>
<button onClick={()=>setCount({ type: 'decrement' })}>-</button>    
<span>{count}</span>    
<button onClick={()=>setCount({ type: 'increment' })}>+</button>    
</div>
</div>

</div>
<div className='gproductaction'><button onClick={()=>addcart('Product added to cart')}>ADD TO CART</button></div>
</div>
</div>



<Accordion 
 heading='Product Details'
 id='accordioncon'
 type='slide'
 preshow='hidden'
 parsed={true}>
 {product.product_details}
</Accordion>    



{/* 
<Accordion 
 heading='Specifications'
 id='accordioncon2'
 type='slide'
 preshow='hidden'
 >
<h4>SKU:</h4> NI930ST26E710NAFAMZ
<h4>Weight (kg):</h4> 1
<h4>Shop Type:</h4> Jumia Mall

 </Accordion> */}



    <Accordion 
    heading='Reviews (6)'
    id='accordioncon3'
    type='slide'
    preshow='show'>
        <Reviews
        listing='All'
        />
    </Accordion>


 




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


<div className='specialproduct'>
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




</div>
</div>
</div>
</div>




<Mainfooter/>

       </div>
        </>
    )
}