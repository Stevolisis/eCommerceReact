import {React} from 'react';
import { Link } from 'react-router-dom';

export default function Category_slider_layout({data}){

    return(
        <>
            <div className='section2'>
            {/* <div className='specialcateghead' style={{background:'linear-gradient(40deg,#5972b9,#fa568d)'}}> */}
            <div className='specialcateghead' style={{background:data.category_slider.banner_color}}>
            <div className='specialhead1'>
            <p>{data.name}</p>
            </div>

            </div>


            <div className='slidecategcon'>


            {data.category_slider.categories.map((category,i)=>{
                return (
                <div className='slidecateg' key={i}>
                <Link to={category.slug}>
                <div className='slidecategimg'>
                <img src={category.img_link} alt={category.name}/>
                </div>
    
                <div className='slidecategname'>
                    <p>{category.name}</p>
                </div>
                </Link>
                </div>
                )
            }) }



            </div>
            </div>
        </>
    )
}