import {React} from 'react'
import { useSelector } from 'react-redux';
import { getSearchResult } from '../Redux/Main/searchResult';
import { Link } from 'react-router-dom';

export default function Searches({setSearchesStat}){
    const data=useSelector(getSearchResult);

    return (
        <>
        <div className="result-container">
            {data&&data.map((list,i)=>{
                if(list){
                    return <>
                        <div className='search' key={i}>
                        <Link  to={list.product_component&&list.product_component? '/'+list.product_component.slug:'/'+list.slug}>{list.name} 
                        <span style={{background:`${list.stock?'#fa568d':'#5972b9'}`}} onClick={()=>setSearchesStat(false)}>
                        {list.stock?'product':'category'}</span></Link>
                        </div> 
                        </>                    
                }
            })}
        </div>
        </>
    )
}