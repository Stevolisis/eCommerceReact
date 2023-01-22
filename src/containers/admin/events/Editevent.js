import {React,useEffect,useState} from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import TopBanner from '../../../components/edit_event_layouts/top_banner_layout';
import MainBanner from '../../../components/edit_event_layouts/main_banner_layout';
import MetaData from '../../../components/edit_event_layouts/four_metadata_layout';
import PopupEvent from '../../../components/edit_event_layouts/popup_layout';
import CategoryLayout from '../../../components/edit_event_layouts/categories_component_layout';
import ProductsLayout from '../../../components/edit_event_layouts/products_component_layout';
import AdsListing from '../../../components/edit_event_layouts/ads_listing_layout';
import api from '../../../Utils/axiosConfig';


export default function Editevent(){
    const {id}=useParams();
    const [name,setName]=useState('');
    const [status,setStatus]=useState('');
    const [type,setType]=useState('');
    const [selected,setSelected]=useState([])
    const [selected2,setSelected2]=useState([])
    const [event,setEvent]=useState(null)
    const [slides,setSlides]=useState([]);

    function viewEventOptions(){
        if(type===''){
            return '';
        }else if(type==='top_banner'){
            return <TopBanner event={event}/>
        }else if(type==='main_banner'){
            return <MainBanner slides={slides} setSlides={setSlides} event={event} selected={selected} setSelected={setSelected} selected2={selected2} setSelected2={setSelected2}/>
        }else if(type==='meta_data'){
            return <MetaData event={event}/>
        }else if(type==='pop_up'){
            return <PopupEvent event={event} selected={selected} setSelected={setSelected}/>
        }else if(type==='category_slider'){
            return <CategoryLayout event={event} selected={selected} setSelected={setSelected}/>
        }else if(type==='products_slider'||type==='products_listing'){
        return <ProductsLayout event={event} selected={selected} setSelected={setSelected}/>
        }else if(type==='ads_listing'){
        return <AdsListing slides={slides} setSlides={setSlides} event={event} selected={selected} setSelected={setSelected}/>
        }
    }



    useEffect(()=>{
        viewEventOptions();
    },[type,event])


    
    const loadEvent=()=>{
        api.get(`events/get-event/${id}`)
        .then(res=>{
          let status=res.data.status;
          let data=res.data.data;
            if(status==='success'){
                setEvent(data);
                setName(data.name);
                setStatus(data.status);
            }else{

                Swal.fire(
                    'Error Occured',
                    status,
                    'warning'
                  )

            }
        }).catch(err=>{
            Swal.fire(
                'Error At api2!',
                err.message,
                'error'
              )
        })
    }


    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target);
        formData.append('selected',JSON.stringify(selected))
        formData.append('selected2',JSON.stringify(selected2))
        formData.append('slides',JSON.stringify(slides))
        api.post(`events/edit-event/${id}`,formData,{withCredentials:true})
        .then(res=>{
            let status=res.data.status;
           if(status==='success'){
            Swal.fire(
                'Successful',
                'Event Edited Successfully',
                'success'
            )
           }else{
            Swal.fire(
                'Error Occured',
                status,
                'info'
            )
           }
        }).catch(err=>{
            Swal.fire(
                'Error Occured',
                err.message,
                'error'
            )
        });
    }


    useEffect(()=>{
        setType(id.split('-')[0])
        loadEvent();
    },[])


    return(
        <>
          <div className='admindashcon'>
        <div className='userorderheading'>
        <p>Edit Event</p>
        </div>

        
        <div className='addcategcon'>
            <form onSubmit={handleSubmit}>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Event Name</p>
            <input type='text' name='name' value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
        </div>


        {viewEventOptions()}



        <div className='usereditbtn'>
        <button>Edit Event</button>
        </div>
        </form>
        </div>            
        </div>
        </>
    )
}