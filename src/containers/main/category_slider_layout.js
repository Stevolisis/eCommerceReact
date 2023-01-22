import {React} from 'react';
import { Link } from 'react-router-dom';

export default function Category_slider_layout(){

    return(
        <>
            <div className='section2'>
            <div className='specialcateghead' style={{background:'linear-gradient(40deg,#5972b9,#fa568d)'}}>
            <div className='specialhead1'>
            <p>Top Brands</p>
            </div>

            </div>
            <div className='slidecategcon'>



            <div className='slidecateg'>
            <Link to='/products'>
            <div className='slidecategimg'>
            <img src='/media3/pexel6.jpg' alt='slidecateg'/>
            </div>

            <div className='slidecategname'>
                <p>Phone and Tablets</p>
            </div>
            </Link>
            </div>


            <div className='slidecateg'>
            <Link to='/products'>
            <div className='slidecategimg'>
            <img src='/media3/pexel7.jpg' alt='slidecateg'/>
            </div>

            <div className='slidecategname'>
                <p>Accessories</p>
            </div>
            </Link>
            </div>

            <div className='slidecateg'>
            <Link to='/products'>
            <div className='slidecategimg'>
            <img src='/media3/pexel8.jpg' alt='slidecateg'/>
            </div>

            <div className='slidecategname'>
                <p>Computers</p>
            </div>
            </Link>
            </div>

            <div className='slidecateg'>
            <Link to='/products'>
            <div className='slidecategimg'>
            <img src='/media3/pexel9.jpg' alt='slidecateg'/>
            </div>

            <div className='slidecategname'>
                <p>Home and Office</p>
            </div>
            </Link>
            </div>


            <div className='slidecateg'>
            <Link to='/products'>
            <div className='slidecategimg'>
            <img src='/media3/pexel10.jpg' alt='slidecateg'/>
            </div>

            <div className='slidecategname'>
                <p>Bags</p>
            </div>
            </Link>
            </div>


            <div className='slidecateg'>
            <Link to='/products'>
            <div className='slidecategimg'>
            <img src='/media3/pexel11.jpg' alt='slidecateg'/>
            </div>

            <div className='slidecategname'>
                <p>Detergents</p>
            </div>
            </Link>
            </div>

            <div className='slidecateg'>
            <Link to='/products'>
            <div className='slidecategimg'>
            <img src='/media3/pexel12.jpg' alt='slidecateg'/>
            </div>

            <div className='slidecategname'>
                <p>Cutleries</p>
            </div>
            </Link>
            </div>

            <div className='slidecateg'>
            <Link to='/products'>
            <div className='slidecategimg'>
            <img src='/media3/pexel13.jpg' alt='slidecateg'/>
            </div>

            <div className='slidecategname'>
                <p>Underwears</p>
            </div>
            </Link>
            </div>

            </div>
            </div>
        </>
    )
}