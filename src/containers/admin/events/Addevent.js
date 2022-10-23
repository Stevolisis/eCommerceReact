import axios from 'axios';
import {React,useState} from 'react';
import Swal from 'sweetalert2';
import AdsListing from '../../../components/event_layouts/ads_listing_layout';
import PopupEvent from '../../../components/event_layouts/popup_layout';
import PermenantLayouts from '../../../components/event_layouts/set_permenant_layouts';
import SpecialContainer from '../../../components/event_layouts/special_container_layout';

export default function Addevent(){
    const [type,setType]=useState('');
    const [selected,setSelected]=useState([])
    const [selected2,setSelected2]=useState('')
    console.log(selected)
    console.log(selected2)


    function viewEventOptions(){
        if(type===''){
            return '';
          }else if(type==='special_container_slider'||type==='special_container_listing'){
            return <SpecialContainer selected={selected} setSelected={setSelected}/>
          }else if(type==='pop_up'){
            return <PopupEvent selected2={selected2} setSelected2={setSelected2}/>
          }else if(type==='ads_listing'){
            return <AdsListing/>
          }else if(type==='main_banner'||type==='category_slider'){
            return <PermenantLayouts/>
          }
    }

    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target);
        formData.append('selected',JSON.stringify(selected))
        formData.append('selected2',JSON.stringify(selected2))
        console.log(e.target)
        console.log(selected)
        axios.post('http://localhost:80/events/addevent',formData,{withCredentials:true})
        .then(res=>{
            let data=res.data.data;
           if(data==='success'){
            Swal.fire(
                'Successful',
                'Event Added',
                'success'
            )
           }else{
            Swal.fire(
                'Successful',
                data,
                'info'
            )
           }
        })
    }
    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
        <p>Add Event</p>
        </div>
        <div className='addcategcon'>
            <form onSubmit={handleSubmit}>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Event Title</p>
            <input type='text' name='title'/>
            </div>
        </div>


        <div className='admineditnamecon'>
        <div className='admineditname'>
            <p>type</p>
            <select value={type} onChange={(e)=>setType(e.target.value)} name='type'>
            <option value=''>Choose Event Type</option>
            <option value='special_container_slider'>Special Slider</option>
            <option value='special_container_listing'>Special Listing</option>
            <option value='ads_listing'>Special Ads Container</option>
            <option value='main_banner'>Main Banner</option>
            <option value='category_slider'>Category Slider</option>
            <option value='pop_up'>Pop Up</option>
            </select>
            </div>
        </div>
        {viewEventOptions()}
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Status</p>
            <select name='status'>
            <option value='active'>Activate</option>
            <option value='inactive'>Deactivate</option>
            </select>
            </div>
        </div>
        <div className='usereditbtn'>
        <button>Add Event</button>
        </div>
        </form>
        </div>            
        </div>
        </>
    )
}