import {React} from 'react';
import { Link } from 'react-router-dom';

export default function Products_Listing_layout(){
    const data=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    return(
        <>
        <div className='section3' id='section3'>
        <div className='specialcateg'>

        <div className='productcateghead'>
        <div className='producthead1'>
        <p>----</p>
        </div>
        </div>


        <div className='categproducts'>


        {data.map(product=>{
            return(
        <div className='specialproduct'>
        <Link to=''>
        <div className='specialproductimg' >
        <div className='productimg' id='productimg'></div>
        </div>

        <div className='specialproductinfo'>

        <div className='productname'>
        <p style={{width:'30px'}}></p>
        </div>

        <div className='productvolume'>
        <p style={{width:'80px'}}></p>
        </div>
        <div className='productvolume'>
        <p style={{width:'50px'}}></p>
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