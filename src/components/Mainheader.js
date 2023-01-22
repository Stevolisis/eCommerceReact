import {React}from 'react';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';

export default function MainContainer({route,setTogglefilter,togglefilter,top_banner_img}){
    return(
        <div className='headercon'>


        <div className='headerAdsCon'>
            <img src={top_banner_img} alt='headerAds'/>
        </div>






<div className='header2'>
    <div className='categoryspace2'>
    <h2><Link to='/'><img src='https://ecommerce.stephcom.com.ng/favicon.svg' alt='Logo'/> GrandProSales </Link></h2>
    
    {route==='products'? 
    <div className='currentcateg' style={{display:'block'}}>
    <i className='fa fa-caret-right ' />
    <span>Computers and Tablets</span>
    </div>
    :''}

</div>
<div className='usercon2'>
<Link to='/help'><i className='fa fa-question-circle'></i></Link>

<div className='cart'>
<Link to='/cart'><i className='fa fa-shopping-cart'></i><sup>23</sup></Link>
</div>

<Link to='/user/dashboard'><i className='fa fa-user-circle'></i></Link>
</div>
</div>


<div className='header'>
    <div className='categoryspace'>
    <h2><Link to='/'><img src='https://ecommerce.stephcom.com.ng/favicon.svg' alt='Logo'/> GrandProSales </Link></h2>
    {route==='products'? 
    <div className='currentcateg' style={{display:'block'}}>
    <i className='fa fa-caret-right ' />
    <span>Computers and Tablets</span>
    </div>
:''}
    </div>


<Searchbar setTogglefilter={setTogglefilter} togglefilter={togglefilter} route={route}/>


<div className='usercon'>
<Link to='/help'><i className='fa fa-question-circle'></i></Link>

<div className='cart'>
<Link to='/cart'><i className='fa fa-shopping-cart'></i><sup>23</sup></Link>
</div>

<Link to='/user/dashboard'><i className='fa fa-user-circle'></i></Link>
</div>
</div>
</div>
    )
}