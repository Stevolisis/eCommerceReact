import {React} from 'react'
import { useSelector } from 'react-redux';
import { getSearchResult } from '../Redux/Main/searchResult';

export default function Searches(){
    const data=useSelector(getSearchResult);

    return (
        <>
        <div className="result-container">
            {data&&data.map((list,i)=>{
                if(list){
                    return <>
                        <div className='search' key={i}>
                        <a href={list.slug}>{list.name}</a>
                        </div> 
                        </>                    
                }
            })}
        </div>
        </>
    )
}