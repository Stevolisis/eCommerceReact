import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import {React} from 'react';
import { Link } from 'react-router-dom';
import Firstslider from '../Firstslider';

export default function Main_layout({images}){
    const [currentslide,setCurrentslide]=useState(0);
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
        

    return(
        <>
            <div className='section1'>
            <div className='sub1section1'>
            <div className='subimage'>
            <Link to={images.banner1.slug}><img src={images.banner1.img_link} alt='mainbanner' />
            </Link>
            </div>
            <div className='subimage'>
            <Link to={images.banner2.slug}><img src={images.banner2.img_link} alt='mainbanner' />
            </Link>
            </div>
            </div>
            
            <Firstslider
            images={images.slides}
            currentslide={currentslide}
            nextslide={nextslide}
            prevslide={prevslide}
            />
            
            
            </div>
            
        </>
    )
}