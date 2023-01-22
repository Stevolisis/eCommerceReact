import {React} from 'react';
import { Link } from 'react-router-dom';
import Firstslider from '../Firstslider';

export default function Main_layout({images,nextslide,prevslide,currentslide}){

    return(
        <>
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
            
        </>
    )
}