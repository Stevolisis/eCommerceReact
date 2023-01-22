import {React} from 'react';
import { Link } from 'react-router-dom';

export default function Products_Listing_layout(){

    return(
        <>
        <div className='section3'>
        <div className='specialcateg'>

        <div className='productcateghead'>
        <div className='producthead1'>
        <p>Amazing Products</p>
        </div>
        </div>


        <div className='categproducts'>


        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(special=>{
            return(
        <div className='specialproduct'>
        <Link to='/product'>
        <div className='specialproductimg'>
        <div className='discount'><p>-20%</p></div>
        <div className='productimg'><img src='/media3/background2.jpg' alt='productimg' /></div>
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
            )
        })}


        </div>
        </div>
        </div>
        
        </>
    )
}