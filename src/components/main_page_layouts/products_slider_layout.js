import {React} from 'react';
import { Link } from 'react-router-dom';

export default function Products_slider_layout(){

    return(
        <>
        <div className='section3'>
        <div className='specialcateg'>

        <div className='specialcateghead'>
        <div className='specialhead1'>
        <p>Flash Sales | Free Delivery</p>
        </div>
        <div className='specialhead1'>
        <p>Time Left: 18h : 21m : 07s</p>
        </div>
        <div className='specialhead1'>
        <Link to='/categories'>See All</Link>
        </div>

        </div>

        <div className='specialcategproducts'>

        {[1,2,3,4,6,6,7].map(special=>{
            return (
                <>
        <div className='specialproduct'>
        <Link to='/product'>
        <div className='specialproductimg'>
        <div className='discount'><p>-20%</p></div>
        <div className='productimg'><img src='/media3/background.jpg' alt='productimg' /></div>
        </div>

        <div className='specialproductinfo'>

        <div className='productname'>
        <p>Heinz Salad Cream 285 Kg</p>
        </div>

        <div className='productprices'>
        <span>₦ 500</span> <span>₦ 550</span>
        </div>

        <div className='productvolume'>
        <p>50 items left</p>
        </div>
        </div>
        </Link>
        </div>
        </>
            )
        })}


        </div>



        </div>
        </div>
        </>
    )
}