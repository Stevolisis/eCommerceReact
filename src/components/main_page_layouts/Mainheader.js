import { useEffect } from 'react';
import {React}from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategory } from '../../Redux/Main/mainRedux';
import Searchbar from '../Searchbar';

export default function MainContainer({route,name,setTogglefilter,togglefilter,data}){
    const categ=useSelector(getCategory);



    return(
        <div className='headercon'>

            {data&& data.map(layout=>{
            if(layout.type==='top_banner'){

            return <>
                    <div className='headerAdsCon'>
                        <img src={layout.top_banner.img&&layout.top_banner.img.url} alt='headerAds'/>
                    </div>   
            </>
            }
            })
            }


<div className='header2'>
    <div className='categoryspace2'>
    <h2><Link to='/'><img src='https://ecommerce.stephcom.com.ng/favicon.svg' alt=''/> GrandProSales </Link></h2>
    
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
<Link to='/cart'><i className='fa fa-shopping-cart'></i><sup>23</sup></Link>
</div>

<Link to='/user/dashboard'><i className='fa fa-user-circle'></i></Link>
</div>
</div>


<div className='header'>
    <div className='categoryspace'>
    <h2><Link to='/'><img src='/favicon.svg' alt=''/> GrandProSales </Link></h2>
    {route==='products'? 
    <div className='currentcateg' style={{display:'block'}}>
    <i className='fa fa-caret-right ' />
    <span>{categ&&categ.name}</span>
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