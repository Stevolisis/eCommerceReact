import {React,useCallback,useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import TopBanner from '../../../components/event_layouts/top_banner_layout';
import MainBanner from '../../../components/event_layouts/main_banner_layout';
import MetaData from '../../../components/event_layouts/four_metadata_layout';
import PopupEvent from '../../../components/event_layouts/popup_layout';
import CategoryLayout from '../../../components/event_layouts/categories_component_layout';
import ProductsLayout from '../../../components/event_layouts/products_component_layout';
import AdsListing from '../../../components/event_layouts/ads_listing_layout';


export default function Editevent(){
    const {id}=useParams();
    const [type,setType]=useState('');
    const [selected,setSelected]=useState([])
    const [selected2,setSelected2]=useState([])
    const [selected3,setSelected3]=useState([])
    const [selected4,setSelected4]=useState([])
    const [selected5,setSelected5]=useState([])
    const [selected6,setSelected6]=useState([])

    function viewEventOptions(){
        if(type===''){
            return '';
        }else if(type==='top_banner'){
            return <TopBanner/>
        }else if(type==='main_banner'){
            return <MainBanner selected3={selected3} setSelected3={setSelected3} selected4={selected4} setSelected4={setSelected4}/>
        }else if(type==='meta_data'){
            return <MetaData/>
        }else if(type==='pop_up'){
            return <PopupEvent selected2={selected2} setSelected2={setSelected2}/>
        }else if(type==='category_slider'){
            return <CategoryLayout selected={selected} setSelected={setSelected}/>
        }else if(type==='products_slider'||type==='products_listing'){
        return <ProductsLayout selected6={selected6} setSelected6={setSelected6}/>
        }else if(type==='ads_listing'){
        return <AdsListing selected5={selected5} setSelected5={setSelected5}/>
        }
    }

    useCallback(()=>{
        viewEventOptions();
    },[type])

    function handleSubmit(e){
        e.preventDefault();
        console.log('check')
        setType('products_slider')
    }

    useEffect(()=>{
        setType(id.split('-')[0])
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
            <input type='text' name='name'/>
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
        <button>Edit Event</button>
        </div>
        </form>
        </div>            
        </div>
        </>
    )
}