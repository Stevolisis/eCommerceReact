import { useEffect } from 'react';
import { useState } from 'react';
import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResult, getSearchResult } from '../Redux/Main/searchResult';

export default function SearchLift({liftSearch}){
    const data=useSelector(getSearchResult);
    const [searchValue,setSearchValue]=useState(true);
    const dispatch=useDispatch();


    useEffect(()=>{
        if(searchValue!==""&&searchValue.length>2){
            dispatch(fetchSearchResult(searchValue))
            console.log(searchValue);
        }
    },[searchValue])

    
    return(
        <>
        <div className='searchLiftCon'>
            <div className='searchercon'>
            {/* <i className='fa fa-arrow-left'/> */}

                <input type='text' placeholder='Search products,brands and categories...' onChange={(e)=>setSearchValue(e.target.value)}/>
                <i className='fa fa-search' onClick={()=>liftSearch()}/>
            </div>

            <div className='resultCon'>
            {data&&data.map((list,i)=>{
                if(list){
                    return <>
                            <a href={list.slug}>
                            <p>{list.name}</p>
                            </a>
                        </>                    
                }
            })}
            </div>
        </div>

        </>
    )
}