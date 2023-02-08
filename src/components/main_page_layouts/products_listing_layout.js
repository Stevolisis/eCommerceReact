import {React} from 'react';
import { Link } from 'react-router-dom';

export default function Products_Listing_layout({data}){

    return(
        <>
        <div className='section3'>
        <div className='specialcateg'>

        <div className='productcateghead' style={{background:data.product_component.banner_color}}>
        <div className='producthead1'>
        <p>{data.name}</p>
        </div>
        </div>


        <div className='categproducts'>


        {data.product_component.products.filter(product=>product.status==='active').map(product=>{
            return(
        <div className='specialproduct'>
        <Link to={product.slug}>
        <div className='specialproductimg'>
        <div className='discount'><p>-{(product.regular_price-product.sale_price)/100}%</p></div>
        <div className='productimg'><img src={product.img_gallery[0].url} alt={product.name} /></div>
        </div>

        <div className='specialproductinfo'>

        <div className='productname'>
        <p>{product.name}</p>
        </div>

        <div className='productprices'>
        <span>₦ {product.sale_price}</span> <span>₦ {product.regular_price}</span>
        </div>


        </div>
        </Link>
        </div>
            )
        })}


        </div>
        </div>
        </div>
        
        </>
    )
}