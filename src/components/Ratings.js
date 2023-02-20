import {React} from 'react';

export default function Ratings({value}){

    
    return(
    <>
        {value==undefined||null?'':
            [...Array(value)].map((m,i)=>{
                return <i className='fa fa-star' style={{color:'gold'}} key={i}/>
            })
            }
            {value===undefined||null?'':
            [...Array(5-value)].map((m,i)=>{
                return <i className='fa fa-star' style={{color:'lightgray'}} key={i}/>
            })            
        }
        </>
    )
}