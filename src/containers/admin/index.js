import {React,useState} from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/table';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.min.css';
import 'tinymce/models/dom/model'


export default function Index(){
    const [trigger,setTrigger]=useState(false);
    const navigate=useNavigate();

    return(
        <>
    {trigger &&<div className='popupaddresscon' >
    </div>}

<div className='main'>


    <div className='adminheadercon'>
        <div className='adminheader'>

            <div className='admincategoryspace'>
                <h2><Link to='/'><img src='/elite-plaza17.png' alt='L'/> </Link></h2>
            </div>


            <div className='adminusercon'>
                <Navbar id='nav' setTrigger={setTrigger} admin='true'/>    
            </div>
        </div>

    </div>


<div className='submain2'>

<div className='admindashboardcon'>

    <nav>
        <div className='navlinkscon'>
            <div className='navusername'><i className='fa fa-user-circle'/><span>Admin Steven</span></div>
            <div className='usernavlinkscon'>
            <p>Customer Links</p>    
                <div className='navlinks' onClick={()=>navigate('/admin/dashboard')}><Link className='navlink' to='/admin/dashboard'>Dashboard</Link></div>
                <div className='navlinks' onClick={()=>navigate('/admin/categories')}><Link className='navlink' to='/admin/categories'>Categories</Link></div>
                <div className='navlinks' onClick={()=>navigate('/admin/products')}><Link className='navlink' to='/admin/products'>Products</Link></div>
                <div className='navlinks' onClick={()=>navigate('/admin/orders')}><Link className='navlink' to='/admin/orders'>Orders</Link></div>
                {/* <div className='navlinks' onClick={()=>navigate('/admin/sales')}><Link className='navlink' to='/admin/sales'>Sales</Link></div> */}
                <div className='navlinks' onClick={()=>navigate('/admin/users')}><Link className='navlink' to='/admin/users'>Users</Link></div>
                <div className='navlinks' onClick={()=>navigate('/admin/staffs')}><Link className='navlink' to='/admin/staffs'>Staffs</Link></div>
                <div className='navlinks' onClick={()=>navigate('/admin/sales')}><Link className='navlink' to='/admin/sales'>SMS Management</Link></div>
                <div className='navlinks' onClick={()=>navigate('/admin/sales')}><Link className='navlink' to='/admin/sales'>Email Management</Link></div>
                <div className='navlinks' onClick={()=>navigate('/admin/events')}><Link className='navlink' to='/admin/events'>Events</Link></div>
                <div className='navlinks' onClick={()=>navigate('/admin/coupons')}><Link className='navlink' to='/admin/coupons'>Coupons</Link></div>
                <div className='navlinks' onClick={()=>navigate('/admin/analytics')}><Link className='navlink' to='/admin/analytics'>Analytics</Link></div>
                <div className='navlinks' onClick={()=>navigate('/admin/general_settings/index')}><Link className='navlink' to='/admin/general_settings/index'>General Settings</Link></div>
                <div className='navlinks' onClick={()=>navigate('/')}><Link className='navlink' to='useraccount'>Logout</Link></div>
            </div>


        </div>
    </nav>








<Outlet/>










</div>

</div>

<div className='footercon'>
    <div className='infocollection'>
     <form>
        <input type='email' placeholder='email address'/>
        <button>Sign Up</button>
     </form>
    </div>

    
<footer>
    <div className='footer1'>

        <div className='links'>
            <Link to='/'>Need Help?</Link>
        </div>
        <div className='links'>
            <Link to='/'>How to shop on GrandPro?</Link>
        </div>
        <div className='links'>
            <Link to='/'>Report a product</Link>
        </div>

    </div>

    <div className='footer1'>
        <div className='links'>
            <Link to='/'>Need Help?</Link>
        </div>
        <div className='links'>
            <Link to='/'>How to shop on GrandPro?</Link>
        </div>
        <div className='links'>
            <Link to='/'>Report a product</Link>
        </div>
    </div>


    <div className='footer1'>
        <div className='links'>
            <Link to='/'>Need Help?</Link>
        </div>
        <div className='links'>
            <Link to='/'>How to shop on GrandPro?</Link>
        </div>
        <div className='links'>
            <Link to='/'>Report a product</Link>
        </div>
    </div>


</footer>

    <div className='infocollection2'>
        <p>Copyright © 2022 GrandProsales.com. All rights reserved</p>
    </div>

</div>
</div>
        </>
    )
}