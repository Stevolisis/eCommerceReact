import { useState } from 'react';
import { useEffect } from 'react';
import {React} from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CategoryProductListings from '../../Loaders/products-categoryPageLoaders/CategoryProductListings';
import { getProducts } from '../../Redux/Main/mainRedux';
import Ratings from '../Ratings';

export default function Category_products_Listing_layout({addcart}){
    const navigate=useNavigate();
    const products=useSelector(getProducts);
    const [data,setData]=useState(null)


    useEffect(()=>{
        setData(products)
    },[products]);


    return(
        <>

<div className='categproductscon'>
<div className='categproducts'>

{
    !data ? <CategoryProductListings/>:
products.filter(product=>product.status==='active').map((product,i)=>{
return <div className='specialproduct2' key={i}>

<div className='specialproductimg2' onClick={()=>navigate('/'+product.slug)}>
<div className='discount2'><p>-{(product.regular_price-product.sale_price)/100}%</p></div>
<div className='productimg2'><img src={product.img_gallery[0].url} alt={product.name} /></div>
</div>

<div className='specialproductinfo2'>

<div className='productname2'>
<p>{product.name}</p>
</div>

<div className='productprices2'>
<span>₦ {product.sale_price}</span> <span>₦ {product.regular_price}</span>
</div>

<div className='productprices2'>
    {<Ratings value={product.rating}/>}
    <span className='productvolume2'>{product.stock>=100 ?<p>100+ items left</p>:<p>{product.stock} items left</p>}</span>
</div>

<div className='productprices2'>
<button onClick={()=>addcart(product)}>ADD TO CART</button>
</div>

</div>

</div>

})
}


</div>
</div>

        </>
    )
}