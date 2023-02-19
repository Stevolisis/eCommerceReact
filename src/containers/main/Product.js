import {React,useState,useEffect, useReducer} from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Accordion from '../../components/accordions/Accordion'
import Reviews from '../../components/Reviews'
import Swal from 'sweetalert2';
import Ratings from '../../components/Ratings';
import Mainheader from '../../components/main_page_layouts/Mainheader';
import Mainfooter from '../../components/Mainfooter'
import ProductSlides from '../../components/ProductSlides';
import { fetchProduct, getProduct } from '../../Redux/Main/mainRedux';
import { fetchProducts, getRelProducts } from '../../Redux/Main/relatedProducts';
import { useDispatch, useSelector } from 'react-redux';
import Products_slider_layout from '../../components/main_page_layouts/products_slider_layout';

export default function Product(props){
    const[wishColor,setWishColor]=useState(false);
    const[datas,setDatas]=useState({
        name:'related Products',
        product_component:{
            products:null
        }

    });
    const {slug}=useParams();
    const dispatch=useDispatch();
    const product=useSelector(getProduct);
    const relProducts=useSelector(getRelProducts);
    const location = useLocation();
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
    },[slug]);

    useEffect(()=>{
        if(product){
            dispatch(fetchProducts(product.category));
            setDatas({
                name:'Related Products',
                product_component:{
                    banner_color:'#5972b9',
                    products:relProducts
                }

            })      
        }                
    },[product]);






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
<div className='gproductshippinginfo'><p>{product.shipping&&'+ shipping : ₦'+product.shipping }</p> </div>
<div className='gproductshippinginfo'><p>{product.stock&&'+ In Stock : '+product.stock }</p> </div>
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



<div className='productdetailscon'>

<div className='summary'>
<div><h4>Share this Product</h4></div>

</div>



<div className='hiddendetails'>
<div>
<a href={'https://facebook.com/sharer.php?u='+'https://e-commerce-three-neon.vercel.app'+location.pathname} className='socialLinks'><img src='/facebook.svg'/></a>
<a href={'https://twitter.com/intent/tweet?url='+'https://e-commerce-three-neon.vercel.app'+location.pathname} className='socialLinks'><img src='/twitter2.svg'/></a>
<a href={'https://wa.me/?text='+'https://e-commerce-three-neon.vercel.app'+location.pathname} className='socialLinks'><img src='/whatsapp.svg'/></a>
<a href={'https://www.linkedin.com/sharing/share-offsite/?url='+'https://e-commerce-three-neon.vercel.app'+location.pathname} className='socialLinks'><img src='/linkedin.svg'/></a>
</div>
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



    {/* <Accordion 
    heading='Reviews (6)'
    id='accordioncon3'
    type='slide'
    >
        <Reviews
        listing='All'
        />
    </Accordion> */}

    <Reviews listing='All'/>
  

{datas&&<Products_slider_layout data={datas} route='prodListing'/>}


</div>




<Mainfooter/>

       </div>
        </>
    )
}