import { useEffect, useState } from 'react';
import {React}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategory } from '../../Redux/Main/mainRedux';
import Searchbar from '../Searchbar';
import SearchLift from '../searchLift';
import $ from 'jquery';
import TopBanner from '../../Loaders/homepageLoaders/topbanner';
import { getCartcount, getCartItems, getCartTotal } from '../../Redux/Main/cart';

export default function MainContainer({route,setTogglefilter,togglefilter,data}){
    const categ=useSelector(getCategory);
    const cartCount=useSelector(getCartcount);
    const cartItems=useSelector(getCartItems);
    const [searchStat,setSearchStat]=useState(false);
    const dispatch=useDispatch();

    function liftSearch(){
        if($(window).innerWidth()<744){
            setSearchStat(!searchStat)
        }
    }

    useEffect(()=>{
        dispatch(getCartTotal());
    },[cartItems])



    

    return(
        <div className='headercon'>
            {searchStat&&<SearchLift liftSearch={liftSearch}/>}


            {data==undefined ? <TopBanner/> : data.map((layout,i)=>{
            if(layout.type==='top_banner'){

            return  <div className='headerAdsCon' key={i}>
                        <img src={layout.top_banner.url} alt='headerAds'/>
                    </div>   

            }
            })
            }


<div className='header2'>
    <div className='categoryspace2'>
    <h2><Link to='/'><img src='/elite-plaza17.png' alt=''/>  </Link></h2>
    
    {route==='products'? 
    <div className='currentcateg' style={{display:'block'}}>
    <i className='fa fa-caret-right ' />
    <span>{categ&&categ.name}</span>
    </div>
    :''}

</div>
<div className='usercon2'>
<Link to='/help'><i className='fa fa-question-circle'></i></Link>

<div className='cart'>
<Link to='/cart'><i className='fa fa-shopping-cart'></i>{!cartCount?'':<sup>{cartCount}</sup>}</Link>
</div>

<Link to='/user/dashboard'><i className='fa fa-user-circle'></i></Link>
</div>
</div>


<div className='header'>
    <div className='categoryspace'>
    <h2><Link to='/'><img src='/elite-plaza17.png' alt=''/>  </Link></h2>
    {route==='products'? 
    <div className='currentcateg' style={{display:'block'}}>
    <i className='fa fa-caret-right ' />
    <span>{categ&&categ.name}</span>
    </div>
:''}
    </div>


<Searchbar liftSearch={liftSearch} setTogglefilter={setTogglefilter} togglefilter={togglefilter} route={route}/>


<div className='usercon'>
<Link to='/help'><i className='fa fa-question-circle'></i></Link>

<div className='cart'>
<Link to='/cart'><i className='fa fa-shopping-cart'></i>{!cartCount?'':<sup>{cartCount}</sup>}</Link>
</div>

<Link to='/user/dashboard'><i className='fa fa-user-circle'></i></Link>
</div>
</div>
</div>
    )
}