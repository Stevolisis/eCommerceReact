import axios from 'axios';
import {React,useState} from 'react';
import Swal from 'sweetalert2';
import TopBanner from '../../../components/event_layouts/top_banner_layout';
import MainBanner from '../../../components/event_layouts/main_banner_layout';
import MetaData from '../../../components/event_layouts/four_metadata_layout';
import PopupEvent from '../../../components/event_layouts/popup_layout';
import CategoryLayout from '../../../components/event_layouts/categories_component_layout';
import ProductsLayout from '../../../components/event_layouts/products_component_layout';
import AdsListing from '../../../components/event_layouts/ads_listing_layout';

export default function Addevent(){
    const [type,setType]=useState('');
    const [selected,setSelected]=useState([])
    const [selected2,setSelected2]=useState([])
    const [selected3,setSelected3]=useState([])
    const [selected4,setSelected4]=useState([])

    function viewEventOptions(){
        if(type===''){
            return '';
        }else if(type==='top_banner'){
            return <TopBanner/>
        }else if(type==='main_banner'){
            return <MainBanner selected3={selected3} setSelected3={setSelected3}/>
        }else if(type==='metadata'){
            return <MetaData/>
        }else if(type==='pop_up'){
            return <PopupEvent selected2={selected2} setSelected2={setSelected2}/>
        }else if(type==='category_slider'){
            return <CategoryLayout selected={selected} setSelected={setSelected}/>
        }else if(type==='products_slider'||type==='products_listing'){
        return <ProductsLayout selected={selected} setSelected={setSelected}/>
        }else if(type==='ads_listing'){
        return <AdsListing selected4={selected4} setSelected4={setSelected4}/>
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
            <p>Event Name</p>
            <input type='text' name='name'/>
            </div>
        </div>


        <div className='admineditnamecon'>
        <div className='admineditname'>
            <p>type</p>
            <select value={type} onChange={(e)=>setType(e.target.value)} name='type'>
            <option value=''>Choose Event Type</option>
            <option value='top_banner'>Top Banner</option>
            <option value='main_banner'>Main Banner</option>
            <option value='metadata'>MetaData Banner</option>
            <option value='pop_up'>Pop Up</option>
            <option value='category_slider'>Category Layout</option>
            <option value='products_slider'>Products Layout Slider</option>
            <option value='products_listing'>Products Layout Listing</option>
            <option value='ads_listing'>Special Ads Layout</option>
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