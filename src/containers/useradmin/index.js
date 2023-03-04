import {React,useState} from 'react';
import { Link ,Outlet} from 'react-router-dom';
import Navbar from '../../components/Navbar';
import $ from 'jquery';
import SearchLift from '../../components/searchLift';
import { useSelector } from 'react-redux';
import { getCartItems } from '../../Redux/Main/cart';
import MainFooter from '../../components/Mainfooter';
import UserDashboardNavbar from '../../components/userDashboardNavbar';




export default function Index(){
    const [trigger,setTrigger]=useState(false);
    const [searchStat,setSearchStat]=useState(false);
    const products_in_cart=useSelector(getCartItems);

    function liftSearch(){
        if($(window).innerWidth()<744){
            setSearchStat(!searchStat)
        }
    }





    return(
        <>
{trigger &&<div className='popupaddresscon' >
</div>}
{searchStat&&<SearchLift liftSearch={liftSearch}/>}

<div className='main' >


<div className='headercon'>



<div className='header2'>
<div className='categoryspace2'>
        <h2><Link to='/'><img src='/elite-plaza17.png' alt='L'/></Link></h2>
</div>


<div className='usercon2'>
<Link to='/help'><i className='fa fa-question-circle'></i></Link>

<div className='cart'>
<Link to='/cart'><i className='fa fa-shopping-cart'></i>{products_in_cart.length===0?'':<sup>{products_in_cart.length}</sup>}</Link>
</div>

<Link to='/user/useraccount'><i className='fa fa-user-circle'></i></Link>
</div>
</div>






<div className='header'>
    <div className='categoryspace'>
            <h2><Link to='/'><img src='/elite-plaza17.png' alt='L'/></Link></h2>
    </div>


<div className='searchcon' style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
    <div className='search3'>
    <input type='text' placeholder='Search products,brands and categories...' onFocus={()=>liftSearch()}/>
    <i className='fa fa-search' onClick={()=>liftSearch()}/>

    </div>    <Navbar id='nav' setTrigger={setTrigger}/>    

</div>


<div className='usercon'>
<Link to='/help'><i className='fa fa-question-circle'></i></Link>

<div className='cart'>
<Link to='/cart'><i className='fa fa-shopping-cart'></i>{products_in_cart.length===0?'':<sup>{products_in_cart.length}</sup>}</Link>
</div>

<Link to='/user/useraccount'><i className='fa fa-user-circle'></i></Link>
</div>
</div>







</div>


<div className='submain'>

<div className='userdashboardcon'>





















<UserDashboardNavbar/>
<Outlet/>
















</div>

</div>

<MainFooter/>
</div>
        </>
    )
}