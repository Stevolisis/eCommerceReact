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
import { useLocation, useSearchParams } from 'react-router-dom';
import { verifyOrder } from '../../Redux/Admin/orders';
import { clearCart } from '../../Redux/Main/cart';
import { setRedirectPath } from '../../Redux/Auth/userAuthForm';

export default function Index(){
    const [layouts, setLayouts] = useState(null);
    const dispatch=useDispatch();
    const location=useLocation();
    const query=useSearchParams();
    const status=query[0].get('status')
    const tx_ref=query[0].get('tx_ref')
    const transaction_id=query[0].get('transaction_id')


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
    },[]);

    useMemo(()=>{
        if(transaction_id&&status&&tx_ref){
            dispatch(verifyOrder({tx_ref:tx_ref,status:status,transaction_id:transaction_id}))
                .then(res=>{
                    console.log('res',res);
                    if(res.payload.status==='success'||res.payload.status==='Error in payment verification'){
                        dispatch(clearCart());
                    }else{
                        dispatch(setRedirectPath('/auth/login?next='+location.pathname))
                    }
                })
        }
    },[transaction_id,tx_ref,status])


      

   







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