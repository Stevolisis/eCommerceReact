import {React,useState,useEffect,useCallback,useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Firstslider from '../../components/Firstslider'
import Mainheader from '../../components/Mainheader'
import Mainfooter from '../../components/Mainfooter'
import api from '../../Utils/axiosConfig';
import Swal from 'sweetalert2';
import { useMemo } from 'react';
import Main_layout from '../../components/main_page_layouts/main_layout';
import Meta_data_layout from '../../components/main_page_layouts/meta_data_layout';
import Category_slider_layout from './category_slider_layout';
import Products_slider_layout from '../../components/main_page_layouts/products_slider_layout';
import Ads_Listing_layout from '../../components/main_page_layouts/ads_listing_layout';
import Products_Listing_layout from '../../components/main_page_layouts/products_listing_layout';

export default function Index(){
    const cancelalert=useRef(true)
    const navigate=useNavigate();
    const [currentslide,setCurrentslide]=useState(0);
    const [layout, setLayout] = useState(null);

const images=[
    {url:'/media3/ecommerceGrandPro2.png',link:'/categories',alt:'firstbanner'},
    {url:'/media3/advert4.jpg',link:'/categories',alt:'firstbanner'},
    {url:'/media3/advert5.jpg',link:'/categories',alt:'firstbanner'},
    {url:'/media3/pexel4.jpg',link:'/categories',alt:'firstbanner'},
    {url:'/media3/pexel6.jpg',link:'/categories',alt:'firstbanner'}
];
    const nextslide=useCallback(()=>{
        setCurrentslide(currentslide===images.length-1 ? 0 : currentslide+1)
      },[currentslide,images.length])
    
    
        const prevslide=useCallback(()=>{
    setCurrentslide(currentslide===0 ? images.length-1 : currentslide-1);
        },[currentslide,images.length])
    
    

useEffect(()=>{
    setTimeout(() => {
        nextslide();
    }, 3000);
},[currentslide,nextslide]);

useMemo(()=>{
 api.get('events/get-events')
 .then(res=>{
    let status=res.data.status;
    let data=res.data.data;
      if(status!=='success'){
          Swal.fire(
              'Error Occured',
              status,
              'warning'
            )
      }else{
        let eventlayout=[];
         data.forEach(event=>{
          eventlayout.push(event)
         })
        setLayout(eventlayout)
        // setLayout(data)

      }
  }).catch(err=>{
      Swal.fire(
          'Error At api2!',
          err.message,
          'error'
        )
  });

},[])


      
    
useEffect(()=>{
        // if(cancelalert.current){
        //     cancelalert.current=false;
        //    setTimeout(()=>{
        //     Swal.fire({
        //         title: 'Grandpro 12th Anniversary',
        //         text: 'Enjoy Products with 20% discount',
        //         imageUrl: '/media3/advert6.jpg',
        //         imageHeight: 230,
        //         imageWidth: 540,
        //         imageAlt: 'Custom image',
        //         padding:10,
        //         confirmButtonText:'View',
        //         denyButtonText:'Ok',
        //         confirmButtonColor:'#5972b9',
        //         denyButtonColor:'#fa568d',
        //         showDenyButton:true
        //       }).then((result) => {
        //         if (result.isConfirmed) {
        //        navigate('/categories');
        //       }
        //       })
        //    },2000) 
        // }
},[navigate])
   







    return(

        <>
<div className='main'>

{layout&& layout.map(ord=>{
 if(ord.type==='top_banner'){
   return <Mainheader/>
 }
})
}






<div className='submain'>


{layout&& layout.map(ord=>{
 if(ord.type==='main_banner'){
    return <Main_layout images={images} prevslide={prevslide} nextslide={nextslide} currentslide={currentslide}/>
   }else if(ord.type==='meta_data'){
    return <Meta_data_layout/>
   }else if(ord.type==='category_slider'){
    return <Category_slider_layout/>
   }else if(ord.type==='products_slider'){
    return <Products_slider_layout/>
   }else if(ord.type==='ads_listing'){
    return <Ads_Listing_layout/>
   }else if(ord.type==='products_listing'){
    return <Products_Listing_layout/>
   }
})}


</div>


<Mainfooter/>

</div>


        </>
    )
}