import {React} from 'react';
import { Link ,useNavigate} from 'react-router-dom';

export default function UserDashboardNavbar(){
    const navigate=useNavigate();

    return(
        <>
        <nav>
            <div className='navlinkscon'>
            <div className='navusername'><i className='fa fa-user-circle'/><span>Steven Joseph</span></div>
            <div className='usernavlinkscon'>
            <p>Customer Links</p>    
            <div className='navlinks' onClick={()=>navigate('dashboard')}><Link className='navlink' to='dashboard'>My Account</Link></div>
            <div className='navlinks' onClick={()=>navigate('orders')}><Link className='navlink' to='userorders'>My Orders</Link></div>
            <div className='navlinks' onClick={()=>navigate('address')}><Link className='navlink' to='useraddress'>Addresses</Link></div>
            <div className='navlinks' onClick={()=>navigate('wishlist')}><Link className='navlink' to='wishlist'>Wishlist</Link></div>
            <div className='navlinks' onClick={()=>navigate('dashboard')}><Link className='navlink' to='dashboard'>Logout</Link></div>
            </div>

            <div className='navcetegories'>
            <p>categories</p>    
            <div className='navlinks' onClick={()=>navigate('dashboard')}><Link className='navlink' to='/product'>Phones and Tablets</Link></div>
            <div className='navlinks' onClick={()=>navigate('dashboard')}><Link className='navlink' to='/product'>Kitchen</Link></div>
            <div className='navlinks' onClick={()=>navigate('dashboard')}><Link className='navlink' to='/product'>Electronics</Link></div>
            <div className='navlinks' onClick={()=>navigate('dashboard')}><Link className='navlink' to='/product'>Nike</Link></div>
            <div className='navlinks' onClick={()=>navigate('dashboard')}><Link className='navlink' to='/product'>Hats</Link></div>
            <div className='navlinks' onClick={()=>navigate('dashboard')}><Link className='navlink' to='/product'>Music Instruments</Link></div>
            <div className='navlinks' onClick={()=>navigate('dashboard')}><Link className='navlink' to='/product'>Sports</Link></div>
            <div className='navlinks' onClick={()=>navigate('dashboard')}><Link className='navlink' to='/product'>Sports</Link></div>
            <div className='navlinks' onClick={()=>navigate('dashboard')}><Link className='navlink' to='/product'>Sports</Link></div>
            <div className='navlinks' onClick={()=>navigate('dashboard')}><Link className='navlink' to='/product'>Sports</Link></div>
            <div className='navlinks' onClick={()=>navigate('dashboard')}><Link className='navlink' to='/product'>Sports</Link></div>
            <div className='navlinks' onClick={()=>navigate('dashboard')}><Link className='navlink' to='/product'>Sports</Link></div>
            </div>

            </div>
        </nav>
        </>
    )
}