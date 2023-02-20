import { useEffect } from 'react';
import { useState } from 'react';
import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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

                <input type='text' placeholder='Search products,brands and categories...' autoFocus onChange={(e)=>setSearchValue(e.target.value)}/>
                <i className='fa fa-angle-left' onClick={()=>liftSearch()}/>
            </div>

            <div className='resultCon'>
            {data&&data.map((list,i)=>{
                if(list){
                    return <>
                    <Link key={i} to={list.product_component&&list.product_component? '/'+list.product_component.slug:'/'+list.slug} onClick={()=>liftSearch()}>
                        <p>{list.name}</p> 
                        <span style={{background:`${list.stock?'#fa568d':'#5972b9'}`}}>
                            {list.stock?'product':'category'}
                        </span>
                    </Link>
                        </>                    
                }
            })}
            </div>
        </div>

        </>
    )
}