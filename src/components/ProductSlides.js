import { useState } from "react";
import { useSelector } from "react-redux";
import { getProduct } from "../Redux/Main/mainRedux";

export default function ProductSlides({}){
    const [currentslide,setCurrentslide]=useState(0);
    const[images,setImages]=useState([]);
    const product=useSelector(getProduct);
    

    const moveslide=(id)=>{
        setCurrentslide(id)
    }


    const slide=product.img_gallery&&product.img_gallery.filter((data,i)=>{
        if(i===currentslide){
        return data
        }else{
        return null
        }
    }).map((image,i)=>{
    return (
     <img src={image.url} alt='sliderimages' key={i}/>
    )
    });


    






    return(
        <>{
            product.img_gallery&&product.img_gallery.map((image,i)=>{
                return (
                    <div key={i} className='productimgslides'>
                    <img src={image} alt={product&&product.name} onClick={()=>moveslide(i)}/>
                    </div>
                )
            })
        }</>
    )

}