import {React,useEffect,useState} from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchResult } from '../Redux/Main/searchResult';
import Searches from './Searches';

export default function Searchbar({route,setTogglefilter,togglefilter,liftSearch}){
    const [filterStatus,setfilterStatus]=useState(false);
    const [searchesStat,setSearchesStat]=useState(false);
    const [searchValue,setSearchValue]=useState(true);
    const dispatch=useDispatch();

    useEffect(()=>{
        if(route==='products' && window.innerWidth < 750){
            setfilterStatus(true)
        }else{
            setfilterStatus(false)
        }
    },[window.innerWidth]);

    useEffect(()=>{
        if(searchValue!==""&&searchValue.length>2){
            dispatch(fetchSearchResult(searchValue))
        }
    },[searchValue])




    
    return(
        <>
        <div className='searchcon'>

        {
        filterStatus ? <>
         <div className='search2'>
        <input type='text' placeholder='Search products,brands and categories...' onFocus={()=>liftSearch()}/>
        <div className='sort5' onClick={()=>setTogglefilter(!togglefilter)}>
            <div className='sortheading'>
                <span>Filter</span>
                <i className='fa fa-angle-down'/>
            </div>
        </div>
        </div>       
        </> : <>
        <div className='search'>

        <input type='text' placeholder='Search products,brands and categories...' 
        onFocus={()=>(liftSearch(),setSearchesStat(true))} 
        onChange={(e)=>setSearchValue(e.target.value)} 
        onBlur={()=>setSearchesStat(false)} />

        <i className='fa fa-search' onClick={()=>liftSearch()}/>

        </div>        
        </> 
        }


        {searchesStat&&<Searches setSearchesStat={setSearchesStat}/>}
        
        </div>

        </>
    )
}