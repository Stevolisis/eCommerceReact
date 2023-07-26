import React from 'react';
import { Link } from 'react-router-dom';

export default function MainFooter(){

    return(
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
    )
}