import {React} from 'react';

export default function Ratings({value}){

    
    return(
    <>
        {value==undefined||null?'':
            [...Array(value)].map(()=>{
                return <i className='fa fa-star' style={{color:'gold'}}/>
            })
            }
            {value===undefined||null?'':
            [...Array(5-value)].map(rating=>{
                return <i className='fa fa-star' style={{color:'lightgray'}}/>
            })            
        }
        </>
    )
}