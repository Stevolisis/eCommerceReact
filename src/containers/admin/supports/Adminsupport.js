import {React,useState,useRef, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'
import FaqList from '../../../components/FaqList';

export default function Adminsupport(){
    const navigate=useNavigate();
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
    const [faqs,setFaqs]=useState([]);
    const cancelalert=useRef(true)

    const handleSubmit=((e)=>{
        e.preventDefault();
        const formData=new FormData(e.target);
        axios.put('http://localhost:80/support/editSupport1',formData,{withCredientials:true})
        .then(res=>{
            let data=res.data.data;
            Swal.fire(
                'Successful!!',
                data,
                'success'
              )
        }).catch(err=>{
            Swal.fire(
                'Error Occured!!',
                'Updated Error.',
                'warning'
              )
        })
        });

    const loadSupport=()=>{
        axios.get('http://localhost:80/support/getsupportforedit',{withCredientials:true})
        .then(res=>{
            let data=res.data.data[0];
            setImggallerypreview(data.supportImage);
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
        }).catch(err=>{
            Swal.fire(
                'Error Occured!!',
                'Updated Error.',
                'warning'
              )
        })
    }


    const loadFaqs=()=>{
        axios.get('http://localhost:80/faq/getFaqs',{withCredientials:true})
        .then(res=>{
            let data=res.data.data;
            setFaqs(data);
            console.log(data);
        }).catch(err=>{
            Swal.fire(
                'Error Occured!!',
                'Updated Error.',
                'warning'
              )
        })
    }

        const deletespec=((id)=>{
            axios.delete(`http://localhost:80/faq/deleteFaq/${id}`,{withCredientials:true})
            .then(res=>{
                let data=res.data.data;
                Swal.fire(
                    'Deleted!',
                    data,
                    'success'
                  )
            }).catch(err=>{
                Swal.fire(
                    'Error Occured!!',
                    'Updated Error.',
                    'warning'
                  )
            })
           })


           function imggalleryPreview(e){
            setImggallerypreview(URL.createObjectURL(e.target.files[0]));
           }

           useEffect(()=>{
            if(cancelalert.current){
                cancelalert.current=false;
                loadSupport();
                loadFaqs();
            }
        
           },[])

    return(

        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
            <p>Customer support </p>
            </div>

            <div className='addcategcon'>
<form onSubmit={handleSubmit}>
<div className='usereditadditionalinfocon' style={{display:'flex',alignItems:'center',overflowY:'auto'}}>
<div className='customercarerecog'>
<div><img src={imggallerypreview} alt='support Pic'/></div>
<h2>{supportHeader}</h2>
<p>{supportText}</p>
</div>
<div className='usereditadditionalinfo' >
<p>Choose image</p>
<input type='file' name='supportImage' onChange={imggalleryPreview}/>
<p>Heading 1</p>
<input type='text' name='supportHeader' value={supportHeader} onChange={(e)=>setSupportHeader(e.target.value)}/>
<p>heading 2</p>
<input type='text' name='supportText' value={supportText} onChange={(e)=>setSupportText(e.target.value)}/>
<div className='usereditbtn' style={{marginTop:'15px'}}>
</div>
</div>

</div>


        <div className='customercarelinks' >
        <Link to={whatsappLink} style={{background:'#128C7E'}}><i className='fa fa-whatsapp'/>Whatsapp</Link>
        <Link to={facebookLink} style={{background:'#3b5998'}}><i className='fa fa-facebook'/>Facebook</Link>
        <Link to={twitterLink} style={{background:'#00acee'}}><i className='fa fa-twitter'/>Twitter</Link>
        <Link to={instagramLink} style={{background:'linear-gradient(40deg,#e95950,#bc2a8d)'}}><i className='fa fa-instagram'/>Instagram</Link>
        </div>
        <div className='usereditnumbercon'>

        <div className='usereditnumber'>
        <div className='usereditprefix'>
            <p>Status</p>
            <select name='whatsappStatus' value={whatsappStatus} onChange={(e)=>setWhatsappStatus(e.target.value)}>
                <option defaultValue='selected' value='active'>Activate</option>
                <option value='deactive'>Deativate</option>
            </select>
        </div>
        <div className='usereditphonenumber'>
            <p>Whatsapp Link</p>
            <input type='text' name='whatsappLink' value={whatsappLink} onChange={(e)=>setWhatsappLink(e.target.value)}/>
        </div>
        </div>

        <div className='usereditnumber'>
        <div className='usereditprefix'>
            <p>Status</p>
            <select name='facebookStatus' value={facebookStatus} onChange={(e)=>setFacebookStatus(e.target.value)}>
                <option defaultValue='selected' value='active'>Activate</option>
                <option value='deactive'>Deativate</option>
            </select>
        </div>
        <div className='usereditphonenumber'>
            <p>Facebook Link</p>
            <input type='text' name='facebookLink' value={facebookLink} onChange={(e)=>setFacebookLink(e.target.value)}/>
        </div>
        </div>
        </div>

        <div className='usereditnumbercon'>

        <div className='usereditnumber'>
        <div className='usereditprefix'>
            <p>Status</p>
            <select name='twitterStatus' value={twitterStatus} onChange={(e)=>setTwitterStatus(e.target.value)}>
                <option defaultValue='selected' value='active'>Activate</option>
                <option value='deactive'>Deativate</option>
            </select>
        </div>
        <div className='usereditphonenumber'>
            <p>Twitter Link</p>
            <input type='text' name='twitterLink' value={twitterLink} onChange={(e)=>setTwitterLink(e.target.value)}/>
        </div>
        </div>

        <div className='usereditnumber'>
        <div className='usereditprefix'>
            <p>Status</p>
            <select name='instagramStatus' value={instagramStatus} onChange={(e)=>setInstagramStatus(e.target.value)}>
            <option defaultValue='selected' value='active'>Activate</option>
            <option value='deactive'>Deativate</option>
        </select>
        </div>
        <div className='usereditphonenumber'>
            <p>Instagram Link</p>
            <input type='text' name='instagramLink' value={instagramLink} onChange={(e)=>setInstagramLink(e.target.value)}/>
        </div>
        </div>

        </div>
        <div className='usereditbtn'>
        <button>UPDATE</button>
        </div>
        </form>


        <div className='customercare2heading2'>
        <h2>Fequently Asked Questions</h2> 
        <button onClick={()=>navigate('/admin/addfaq')}>Add F.A.Q</button>
        </div>

<div className='customercare2'>
<FaqList deletespec={deletespec} faqs={faqs}/>
</div>

            </div>
            </div>
        </>
    )
}