import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import { getAllCategories } from '../Redux/Admin/categories';
import { customerLogout } from '../Redux/Auth/userAuthForm';

export default function UserDashboardNavbar(){
    const navigate=useNavigate();
    const categories=useSelector(getAllCategories);
    const dispatch=useDispatch();
    const location = useLocation();

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
            <div className='navlinks' onClick={()=>dispatch(customerLogout())}><Link className='navlink' to='dashboard'>Logout</Link></div>
            </div>

            <div className='navcetegories'>
            <p>categories</p>    
            {categories&&categories.slice(0, 7).map((category,i)=>{
                return <div key={i} className='navlinks' onClick={()=>navigate('/'+category.slug)}><Link className='navlink' to={'/'+category.slug}>{category.name}</Link></div>

            })}
            </div>

            </div>
        </nav>
        </>
    )
}