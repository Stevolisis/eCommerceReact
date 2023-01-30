import {React} from 'react';
import { Link } from 'react-router-dom';

export default function Ads_Listing_layout({data}){

    return(
    <>
        <div className='section3'>
        <div className='specialcateg'>

        <div className='section4'>
        <div className='midbannercon'>


        {data.ads_listing.map(ads=>{
            return (
        <div className='midbanner'>
        <Link to={ads.slug}>
        <img src={ads.img_link} alt={ads.name} /> 
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