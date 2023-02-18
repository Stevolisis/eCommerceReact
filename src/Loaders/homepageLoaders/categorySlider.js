import {React} from 'react';
import { Link } from 'react-router-dom';

export default function CategorySlider(){
const data=[1,2,3,4,5,6,7]
    return(
        <>
            <div className='section2'>
            <div className='specialcateghead' id='specialcateghead'>
            <div className='specialhead1'>
            <p></p>
            </div>

            </div>


            <div className='slidecategcon'>


            {data.map((category,i)=>{
                return (
                <div className='slidecateg' key={i}>
                <Link to=''>
                <div className='slidecategimg' id='slidecategimg'>
                </div>
    
                <div className='slidecategname' id='slidecategname'>
                    <p></p>
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