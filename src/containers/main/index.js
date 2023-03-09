import {React,useState} from 'react'
import Mainfooter from '../../components/Mainfooter'
import { useMemo } from 'react';
import Mainheader from '../../components/main_page_layouts/Mainheader';
import Main_layout from '../../components/main_page_layouts/main_layout';
import Meta_data_layout from '../../components/main_page_layouts/meta_data_layout';
import Category_slider_layout from '../../components/main_page_layouts/category_slider_layout';
import Products_slider_layout from '../../components/main_page_layouts/products_slider_layout';
import Ads_Listing_layout from '../../components/main_page_layouts/ads_listing_layout';
import Products_Listing_layout from '../../components/main_page_layouts/products_listing_layout';
import { useDispatch } from 'react-redux';
import PopUp_layout from '../../components/main_page_layouts/popup_layout';
import { fetchEvents } from '../../Redux/Main/mainRedux';
import MainBannerLoader from '../../Loaders/homepageLoaders/mainBannerLoader';
import CategorySlider from '../../Loaders/homepageLoaders/categorySlider';
import ProductsSlider from '../../Loaders/homepageLoaders/productSlider';
import ProductListings from '../../Loaders/homepageLoaders/productListings';
import axios from 'axios';
import { useEffect } from 'react';

export default function Index(){
    const [layouts, setLayouts] = useState(null);
    const dispatch=useDispatch();
    const [ip, setIP] = useState('');
    // const [flag, setFlag] = useState('');
    


    const getData = async () => {
      const res = await axios.get('https://geolocation-db.com/json/')
      setIP(res.data)
    }

    // const getFlag = async () => {
    //     const res = await axios.get(`https://countryflagsapi.com/png/US`)
    //     setFlag('https://countryflagsapi.com/png/US')
    //   }

    useEffect( () => {
      getData()
    },[]);
    
    // useEffect(()=>{
    //     getFlag()
    // },[ip]);


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


<Mainheader data={layouts}/>




<div className='submain'>

{layouts==null ?(
    <>
    <MainBannerLoader/>
    <CategorySlider/>
    <ProductsSlider/>
    <ProductListings/>
    </>
): layouts.map((layout,i)=>{

 if(layout.type==='main_banner'){
    return <Main_layout images={layout.main_banner} key={i}/>
   }else if(layout.type==='meta_data'){
    return <Meta_data_layout data={layout.meta_data} key={i}/>
   }else if(layout.type==='category_slider'){
    return <Category_slider_layout data={layout} key={i}/>
   }else if(layout.type==='pop_up'){
    return <PopUp_layout data={layout.pop_up} key={i}/>
   }else if(layout.type==='products_slider'){
    return <Products_slider_layout data={layout} key={i}/>
   }else if(layout.type==='ads_listing'){
    return <Ads_Listing_layout data={layout} key={i}/>
   }else if(layout.type==='products_listing'){
    return <Products_Listing_layout data={layout} key={i}/>
   }
   
})}

</div>


<Mainfooter/>

</div>


        </>
    )
}