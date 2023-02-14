import {React, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Accordion2 from '../../components/accordions/Accordion2';
import Mainheader from '../../components/main_page_layouts/Mainheader';
import Mainfooter from '../../components/Mainfooter'
import { useDispatch } from 'react-redux';
import { fetchSupport } from '../../Redux/Admin/supports';
import { fetchFaqs } from '../../Redux/Admin/supportFaqs';
import Swal from 'sweetalert2';
import FaqList from '../../components/listings/FaqList';

export default function Help(){
    const [imggallerypreview,setImggallerypreview]=useState('');
    const [supportHeader,setSupportHeader]=useState('');
    const [supportText,setSupportText]=useState('');
    const [whatsappStatus,setWhatsappStatus]=useState('');
    const [facebookStatus,setFacebookStatus]=useState('');
    const [twitterStatus,setTwitterStatus]=useState('');
    const [instagramStatus,setInstagramStatus]=useState('');
    const [whatsappLink,setWhatsappLink]=useState('');
    const [facebookLink,setFacebookLink]=useState('');
    const [twitterLink,setTwitterLink]=useState('');
    const [instagramLink,setInstagramLink]=useState('');
    const dispatch=useDispatch();


    useEffect(()=>{
        dispatch(fetchSupport())
        .then(res=>{
            let data=res.payload;
            if(data){
                {data.supportImage&&setImggallerypreview(data.supportImage.url)}
                console.log(imggallerypreview)
                setSupportHeader(data.supportHeader);
                setSupportText(data.supportText);
                setWhatsappStatus(data.whatsappStatus);
                setFacebookStatus(data.facebookStatus);
                setTwitterStatus(data.twitterStatus);
                setInstagramStatus(data.instagramStatus);
                setWhatsappLink(data.whatsappLink);
                setFacebookLink(data.facebookLink);
                setTwitterLink(data.twitterLink);
                setInstagramLink(data.instagramLink);
            }
        }).catch(err=>{
            Swal.fire(
                'Error Occured!!',
                'Updated Error.',
                'warning'
                )
        })
        dispatch(fetchFaqs());
    },[dispatch]);



    return(
        <>
<div className='main'>



<Mainheader/>




<div className='submain'>

<div className='customercare1con'>
<div className='customercarerecog'>
<div><img src={imggallerypreview} alt='support Pic'/></div>
<h2>{supportHeader}</h2>
<p>{supportText}</p>
</div>

<div className='customercarelinks'>
<Link to={whatsappLink} style={{background:'#128C7E'}} relative="path"><i className='fa fa-whatsapp'/>Whatsapp</Link>
        <Link to={facebookLink} style={{background:'#3b5998'}} relative="path"><i className='fa fa-facebook'/>Facebook</Link>
        <Link to={twitterLink} style={{background:'#00acee'}}><i className='fa fa-twitter'/>Twitter</Link>
        <Link to={instagramLink} style={{background:'linear-gradient(40deg,#e95950,#bc2a8d)'}}><i className='fa fa-instagram'/>Instagram</Link>
</div>

</div>


<div className='customercare2con'>
<div className='customercare2heading'><h2>Fequently Asked Questions</h2></div>

<div className='customercare2'>
<FaqList route='help'/>
</div>

</div>

</div>

<Mainfooter/>

</div>
        </>
    )
}