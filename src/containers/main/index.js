import {React,useState,useEffect,useCallback,useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Firstslider from '../../components/Firstslider'
import Mainheader from '../../components/Mainheader'
import Mainfooter from '../../components/Mainfooter'

export default function Index(){
    const cancelalert=useRef(true)
    const navigate=useNavigate();
    const [currentslide,setCurrentslide]=useState(0);

const images=[
    {url:'/media3/ecommerceGrandPro2.png',link:'/categories',alt:'firstbanner'},
    {url:'/media3/advert4.jpg',link:'/categories',alt:'firstbanner'},
    {url:'/media3/advert5.jpg',link:'/categories',alt:'firstbanner'},
    {url:'/media3/pexel4.jpg',link:'/categories',alt:'firstbanner'},
    {url:'/media3/pexel6.jpg',link:'/categories',alt:'firstbanner'}
];
    const nextslide=useCallback(()=>{
        setCurrentslide(currentslide===images.length-1 ? 0 : currentslide+1)
        console.log(currentslide)
      },[currentslide,images.length])
    
    
        const prevslide=useCallback(()=>{
    setCurrentslide(currentslide===0 ? images.length-1 : currentslide-1);
        },[currentslide,images.length])
    
    

useEffect(()=>{
    setTimeout(() => {
        nextslide();
    }, 3000);
},[currentslide,nextslide]);


      
    
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




<Mainheader/>




<div className='submain'>





<div className='section1'>

<div className='sub1section1'>
<div className='subimage'>
<Link to='/categories'><img src='/media3/advert6.jpg' alt='mainbanner' />
</Link>
</div>
<div className='subimage'>
<Link to='/categories'><img src='/media3/advert7.jpg' alt='mainbanner' />
</Link>
</div>
</div>

<Firstslider
images={images}
currentslide={currentslide}
nextslide={nextslide}
prevslide={prevslide}
/>


</div>













<section className='siteInfoCon'>
 
 <div className='siteInfo'>
    <img src='/media3/safepayments.png' alt='mainbanner'/>
    <p>Safe Payments</p>
</div>

<div className='siteInfo'>
    <img src='/media3/freeshipping2.webp' alt='mainbanner'/>
    <p>Free Shipping</p>
</div>

<div className='siteInfo'>
    <img src='/media3/customerservice.jpeg' alt='mainbanner'/>
    <p>24/7 Customer Services</p>
</div>

<div className='siteInfo'>
    <img src='/media3/discount.jpg' alt='mainbanner'/>
    <p>Amazing Discounts</p>
</div>

</section>









<div className='section2'>
<div className='specialcateghead' style={{background:'linear-gradient(40deg,#5972b9,#fa568d)'}}>
<div className='specialhead1'>
<p>Top Categories and Brands</p>
</div>

</div>
<div className='slidecategcon'>
{/* <div className='productcateghead' style={{borderRadius:'35%',justifyContent:'center'}}>
<div className='producthead1'>
<p>Top Categories</p>
</div>
</div> */}




<div className='slidecateg'>
<Link to='/products'>
<div className='slidecategimg'>
<img src='/media3/pexel6.jpg' alt='slidecateg'/>
</div>

<div className='slidecategname'>
    <p>Phone and Tablets</p>
</div>
</Link>
</div>


<div className='slidecateg'>
<Link to='/products'>
<div className='slidecategimg'>
<img src='/media3/pexel7.jpg' alt='slidecateg'/>
</div>

<div className='slidecategname'>
    <p>Accessories</p>
</div>
</Link>
</div>

<div className='slidecateg'>
<Link to='/products'>
<div className='slidecategimg'>
<img src='/media3/pexel8.jpg' alt='slidecateg'/>
</div>

<div className='slidecategname'>
    <p>Computers</p>
</div>
</Link>
</div>

<div className='slidecateg'>
<Link to='/products'>
<div className='slidecategimg'>
<img src='/media3/pexel9.jpg' alt='slidecateg'/>
</div>

<div className='slidecategname'>
    <p>Home and Office</p>
</div>
</Link>
</div>


<div className='slidecateg'>
<Link to='/products'>
<div className='slidecategimg'>
<img src='/media3/pexel10.jpg' alt='slidecateg'/>
</div>

<div className='slidecategname'>
    <p>Bags</p>
</div>
</Link>
</div>


<div className='slidecateg'>
<Link to='/products'>
<div className='slidecategimg'>
<img src='/media3/pexel11.jpg' alt='slidecateg'/>
</div>

<div className='slidecategname'>
    <p>Detergents</p>
</div>
</Link>
</div>

<div className='slidecateg'>
<Link to='/products'>
<div className='slidecategimg'>
<img src='/media3/pexel12.jpg' alt='slidecateg'/>
</div>

<div className='slidecategname'>
    <p>Cutleries</p>
</div>
</Link>
</div>

<div className='slidecateg'>
<Link to='/products'>
<div className='slidecategimg'>
<img src='/media3/pexel13.jpg' alt='slidecateg'/>
</div>

<div className='slidecategname'>
    <p>Underwears</p>
</div>
</Link>
</div>

</div>
</div>













<div className='section3'>
<div className='specialcateg'>

<div className='specialcateghead'>
<div className='specialhead1'>
<p>Flash Sales | Free Delivery</p>
</div>
<div className='specialhead1'>
<p>Time Left: 18h : 21m : 07s</p>
</div>
<div className='specialhead1'>
<Link to='/categories'>See All</Link>
</div>

</div>

<div className='specialcategproducts'>

{[1,2,3,4,6,6,7].map(special=>{
    return (
        <>
<div className='specialproduct'>
<Link to='/product'>
<div className='specialproductimg'>
<div className='discount'><p>-20%</p></div>
<div className='productimg'><img src='/media3/background.jpg' alt='productimg' /></div>
</div>

<div className='specialproductinfo'>

<div className='productname'>
<p>Heinz Salad Cream 285 Kg</p>
</div>

<div className='productprices'>
<span>₦ 500</span> <span>₦ 550</span>
</div>

<div className='productvolume'>
<p>50 items left</p>
</div>
</div>
</Link>
</div>
</>
    )
})}


</div>



</div>
</div>
















<div className='section3'>
<div className='specialcateg'>

<div className='specialcateghead' style={{background:'#191a1c'}}>
<div className='specialhead1'>
<p>Top Selling Products</p>
</div>
<div className='specialhead1'>
<Link to='/categories'>See All</Link>
</div>

</div>

<div className='specialcategproducts'>

{[1,2,3,4,5,6,7].map(special=>{
    return(
        
<div className='specialproduct'>
<Link to='/product'>
<div className='specialproductimg'>
<div className='discount'><p>-20%</p></div>
<div className='productimg'><img src='/media3/advert6.jpg' alt='productimg' /></div>
</div>

<div className='specialproductinfo'>

<div className='productname'>
<p>Heinz Salad Cream 285 Kg</p>
</div>

<div className='productprices'>
<span>₦ 500</span> <span>₦ 550</span>
</div>


</div>
</Link>
</div>

    )
})}


</div>
</div>
</div>







<div className='section3'>
<div className='specialcateg'>

<div className='section4'>
<div className='midbannercon'>

<div className='midbanner'>
<Link to='/product'>
<img src='/media3/advert4.jpg' alt='midbanner' /> 
</Link>
</div>
<div className='midbanner'>
<Link to='/product'>
<img src='/media3/advert5.jpg' alt='midbanner' />
</Link>
</div>
<div className='midbanner'>
<Link to='/product'>
<img src='/media3/nniva_advert.jpg' alt='midbanner' />
</Link>
</div>
<div className='midbanner'>
<Link to='/product'>
<img src='/media3/advert7.jpg' alt='midbanner' />
</Link>
</div>
</div>
</div>


</div>
</div>








<div className='section3'>
<div className='specialcateg'>

<div className='productcateghead'>
<div className='producthead1'>
<p>Amazing Products</p>
</div>
</div>


<div className='categproducts'>


{[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(special=>{
    return(
<div className='specialproduct'>
<Link to='/product'>
<div className='specialproductimg'>
<div className='discount'><p>-20%</p></div>
<div className='productimg'><img src='/media3/background2.jpg' alt='productimg' /></div>
</div>

<div className='specialproductinfo'>

<div className='productname'>
<p>Heinz Salad Cream 285 Kg</p>
</div>

<div className='productprices'>
<span>₦ 500</span> <span>₦ 550</span>
</div>


</div>
</Link>
</div>
    )
})}


</div>
</div>
</div>







</div>


<Mainfooter/>


</div>
        </>
    )
}