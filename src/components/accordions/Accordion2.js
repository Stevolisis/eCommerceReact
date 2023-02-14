import {React} from 'react';
import Accordtoggle from './Accordtoggle';
import Accordtoggle2 from './Accordtoggle2';
import parse from 'html-react-parser';

export default function Accordion2({heading,detail,id,type,editdelid,deletefaq}){

    return(
<>
<div className='helpcon'>
<div className='helpsummary'>
<div><p>{heading}</p></div>
<div className='slideicon'>
{type==='non-slide' ? <Accordtoggle id={id} editdelid={editdelid}/>
 :<Accordtoggle2 id={id} editdelid={editdelid} deletefaq={deletefaq}/>}
</div>
</div>



<div className={`${id}`} style={{display:'none'}} id='helphidden'>
<div>
{parse(detail)}
dfhgjhkjl
</div>
</div>
</div>

</>
    )
}
