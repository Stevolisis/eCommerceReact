import {React} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRelProducts } from '../../Redux/Main/relatedProducts';

export default function Products_slider_layout({data,route}){
    const relProducts=useSelector(getRelProducts);

    return(
        <>
        <div className='section3'>
        <div className='specialcateg'>

        <div className='specialcateghead' style={{background:data.product_component.banner_color}}>
        <div className='specialhead1'>
        <p>{data.name}</p>
        </div>
        {/* <div className='specialhead1'>
        <p>Time Left: 18h : 21m : 07s</p>
        </div> */}
        <div className='specialhead1'>
        {/* <Link to={data.product_component.slug}>See All</Link> */}
        </div>

        </div>

        <div className='specialcategproducts'>

        {route==='prodListing'?
        relProducts&&relProducts.filter(product=>product.status==='active').map(product=>{
        return (
            <>
                <div className='specialproduct'>
                <Link to={'/'+product.slug}>
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

                <div className='productvolume'>
                <p>{product.stock} items left</p>
                </div>
                </div>
                </Link>
                </div>
            </>
            )
        })


    :


    data.product_component.products.filter(product=>product.status==='active').map(product=>{
        return (
            <>
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

                <div className='productvolume'>
                <p>{product.stock} items left</p>
                </div>
                </div>
                </Link>
                </div>
            </>
            )
        })
    }


        </div>



        </div>
        </div>
        </>
    )
}