import {React,useCallback,useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import TopBanner from '../../../components/edit_event_layouts/top_banner_layout';
import MainBanner from '../../../components/edit_event_layouts/main_banner_layout';
import MetaData from '../../../components/edit_event_layouts/four_metadata_layout';
import PopupEvent from '../../../components/edit_event_layouts/popup_layout';
import CategoryLayout from '../../../components/edit_event_layouts/categories_component_layout';
import ProductsLayout from '../../../components/edit_event_layouts/products_component_layout';
import AdsListing from '../../../components/edit_event_layouts/ads_listing_layout';


export default function Editevent(){
    const {id}=useParams();
    const [name,setName]=useState('');
    const [status,setStatus]=useState('');
    const [type,setType]=useState('');
    const [selected,setSelected]=useState([])
    const [selected2,setSelected2]=useState([])
    const [selected5,setSelected5]=useState([])
    const [event,setEvent]=useState(null)

    function viewEventOptions(){
        if(type===''){
            return '';
        }else if(type==='top_banner'){
            return <TopBanner event={event}/>
        }else if(type==='main_banner'){
            return <MainBanner event={event} selected={selected} setSelected={setSelected} selected2={selected2} setSelected2={setSelected2}/>
        }else if(type==='meta_data'){
            return <MetaData event={event}/>
        }else if(type==='pop_up'){
            return <PopupEvent event={event} selected={selected} setSelected={setSelected}/>
        }else if(type==='category_slider'){
            return <CategoryLayout event={event} selected={selected} setSelected={setSelected}/>
        }else if(type==='products_slider'||type==='products_listing'){
        return <ProductsLayout event={event} selected={selected} setSelected={setSelected}/>
        }else if(type==='ads_listing'){
        return <AdsListing selected5={selected5} setSelected5={setSelected5}/>
        }
    }



    useEffect(()=>{
        viewEventOptions();
    },[type,event])


    
    const loadEvent=()=>{
        axios.get(`http://localhost:80/events/get-event/${id}`)
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
                'Error At Axios2!',
                err.message,
                'error'
              )
        })
    }


    function handleSubmit(e){
        e.preventDefault();
        console.log('check')
        setType('products_slider')
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
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Status</p>
            <select name='status' value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value='active'>Activate</option>
            <option value='inactive'>Deactivate</option>
            </select>
            </div>
        </div>
        <div className='usereditbtn'>
        <button>Edit Event</button>
        </div>
        </form>
        </div>            
        </div>
        </>
    )
}