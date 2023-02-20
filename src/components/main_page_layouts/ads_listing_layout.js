import {React} from 'react';
import { Link } from 'react-router-dom';

export default function Ads_Listing_layout({data}){

    return(
    <>
        <div className='section3'>
        <div className='specialcateg'>

        <div className='section4'>
        <div className='midbannercon'>


        {data.ads_listing.map((ads,i)=>{
            return (
        <div className='midbanner' key={i}>
        <Link to={ads.slug}>
        <img src={ads.img&&ads.img.url} alt={ads.name} /> 
        </Link>
        </div>                
            )

        })
        }
        </div>
        </div>


        </div>
        </div>

    </>
    )
}