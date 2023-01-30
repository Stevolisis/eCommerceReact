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
import { editEvent, fetchEvent } from '../../../Redux/Admin/events';
import { useDispatch } from 'react-redux';


export default function Editevent(){
    const {id}=useParams();
    const [name,setName]=useState('');
    const [status,setStatus]=useState('');
    const [type,setType]=useState('');
    const [selected,setSelected]=useState([])
    const [selected2,setSelected2]=useState([])
    const [event,setEvent]=useState(null)
    const [slides,setSlides]=useState([]);
    const dispatch=useDispatch();

    function viewEventOptions(){
        if(type===''){
            return '';
        }else if(type==='top_banner'){
            return <TopBanner />
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
        dispatch(fetchEvent(id))
        .then(res=>{
            let event=res.payload;
            setName(event.name);
            setEvent(event);
            setStatus(event.status)
        });
        
    }


    
    function handleSubmit(e){
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "Confirm Action On Event",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5972b9',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Edit it!'
          }).then((result) => {
            if (result.isConfirmed) {
                const formData=new FormData(e.target);
                formData.append('selected',JSON.stringify(selected))
                formData.append('selected2',JSON.stringify(selected2))
                formData.append('slides',JSON.stringify(slides));
                formData.append('id',id);
                dispatch(editEvent(formData));
            }
          })
   
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