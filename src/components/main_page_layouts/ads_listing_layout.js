import {React} from 'react';
import { Link } from 'react-router-dom';

export default function Ads_Listing_layout(){

    return(
    <>
        <div className='section3'>
        <div className='specialcateg'>

        <div className='section4'>
        <div className='midbannercon'>

        <div className='midbanner'>
        <Link to='/product'>
        <img src='/media3/advert4.jpg' alt='midbanner' /> 
        </Link>
        </div>
        <div className='midbanner'>
        <Link to='/product'>
        <img src='/media3/advert5.jpg' alt='midbanner' />
        </Link>
        </div>
        <div className='midbanner'>
        <Link to='/product'>
        <img src='/media3/nniva_advert.jpg' alt='midbanner' />
        </Link>
        </div>
        <div className='midbanner'>
        <Link to='/product'>
        <img src='/media3/advert7.jpg' alt='midbanner' />
        </Link>
        </div>
        </div>
        </div>


        </div>
        </div>

    </>
    )
}