import {React} from 'react';
import { Link } from 'react-router-dom';
import Accordion2 from '../../components/Accordion2';
import Mainheader from '../../components/Mainheader'
import Mainfooter from '../../components/Mainfooter'

export default function Help(){

    return(
        <>
<div className='main'>



<Mainheader/>




<div className='submain'>

<div className='customercare1con'>
<div className='customercarerecog'>
<div><i className='fa fa-rocket'/></div>
<h2>GrandPro Customer Care</h2>
<p>How can we help you?</p>
</div>

<div className='customercarelinks'>
<Link to='/' style={{background:'#128C7E'}}><i className='fa fa-whatsapp'/>Whatsapp</Link>
<Link to='/' style={{background:'#3b5998'}}><i className='fa fa-facebook'/>Facebook</Link>
<Link to='/' style={{background:'#00acee'}}><i className='fa fa-twitter'/>Twitter</Link>
<Link to='/' style={{background:'linear-gradient(40deg,#e95950,#bc2a8d)'}}><i className='fa fa-instagram'/>Instagram</Link>
</div>

</div>


<div className='customercare2con'>
<div className='customercare2heading'><h2>Fequently Asked Questions</h2></div>

<div className='customercare2'>
<Accordion2
type='slide'
heading='How to Order'
detail='Firsyt'
id='helpslide1'
/>

<Accordion2
type='slide'
heading='How to Order'
detail='Firsyt'
id='helpslide2'
/>
<Accordion2
type='slide'
heading='How to Order'
detail='Firsyt'
id='helpslide3'
/>
<Accordion2
type='slide'
heading='How to Order'
detail='Firsyt'
id='helpslide4'
/>
<Accordion2
type='slide'
heading='How to Order'
detail='Firsyt'
id='helpslide5'
/>
<Accordion2
type='slide'
heading='How to Order'
detail='Firsyt'
id='helpslide6'
/>
<Accordion2
type='slide'
heading='How to Order'
detail='Firsyt'
id='helpslide7'
/>

<Accordion2
type='slide'
heading='How to Order'
detail='Firsyt'
id='helpslide8'
/>

<Accordion2
type='slide'
heading='How to Order'
detail='Firsyt'
id='helpslide9'
/>

<Accordion2
type='slide'
heading='How to Order'
detail='Firsyt'
id='helpslide10'
/>
</div>

</div>

</div>

<Mainfooter/>

</div>
        </>
    )
}