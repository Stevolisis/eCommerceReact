import {React,useState,useEffect} from 'react'
import {  useNavigate } from 'react-router-dom';
import Mainheader from '../../components/Mainheader'
import Mainfooter from '../../components/Mainfooter'
import { useMemo } from 'react';
import Main_layout from '../../components/main_page_layouts/main_layout';
import Meta_data_layout from '../../components/main_page_layouts/meta_data_layout';
import Category_slider_layout from '../../components/main_page_layouts/category_slider_layout';
import Products_slider_layout from '../../components/main_page_layouts/products_slider_layout';
import Ads_Listing_layout from '../../components/main_page_layouts/ads_listing_layout';
import Products_Listing_layout from '../../components/main_page_layouts/products_listing_layout';
import { useDispatch } from 'react-redux';
import { fetchEvents } from '../../Redux/Admin/events';
import Swal from 'sweetalert2';
import { useRef } from 'react';
import PopUp_layout from '../../components/main_page_layouts/popup_layout';

export default function Index(){
    const navigate=useNavigate();
    const [layouts, setLayouts] = useState(null);
    const dispatch=useDispatch();
    const cancelalert=useRef(true)
    


useMemo(()=>{
dispatch(fetchEvents())
 .then(res=>{
    let data=res.payload;
    let eventlayout=[];
    data.forEach(event=>{
     eventlayout.push(event)
    })
   setLayouts(eventlayout)
})
},[])


      

   







    return(

        <>
<div className='main'>

{layouts&& layouts.map(ord=>{
 if(ord.type==='top_banner'){
   return <Mainheader/>
 }
})
}






<div className='submain'>


{layouts && layouts.map(layout=>{

 if(layout.type==='main_banner'){
    return <Main_layout images={layout.main_banner}/>
   }else if(layout.type==='meta_data'){
    return <Meta_data_layout data={layout.meta_data}/>
   }else if(layout.type==='category_slider'){
    return <Category_slider_layout data={layout}/>
   }else if(layout.type==='pop_up'){
    return <PopUp_layout data={layout.pop_up}/>
   }else if(layout.type==='products_slider'){
    return <Products_slider_layout data={layout}/>
   }else if(layout.type==='ads_listing'){
    return <Ads_Listing_layout data={layout}/>
   }else if(layout.type==='products_listing'){
    return <Products_Listing_layout data={layout}/>
   }
   
})}


</div>


<Mainfooter/>

</div>


        </>
    )
}