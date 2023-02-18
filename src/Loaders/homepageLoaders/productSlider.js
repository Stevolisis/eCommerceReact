import {React} from 'react';
import { Link } from 'react-router-dom';

export default function ProductsSlider(){
    const data=[1,2,3,4,5,6,7];

    return(
        <>
        <div className='section3' id='section3'>
        <div className='specialcateg'>

        <div className='specialcateghead' id='specialcateghead'>
        <div className='specialhead1'></div>

        </div>

        <div className='specialcategproducts'>

        {
        data.map(product=>{
        return (
            <>
                <div className='specialproduct'>
                <Link to=''>
                <div className='specialproductimg'>
                <div className='productimg' id='productimg'></div>
                </div>

                <div className='specialproductinfo'>

                <div className='productname'>
                <p style={{width:'30px'}}></p>
                </div>

                <div className='productprices'>
                <span></span> 
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