import {React,useEffect,useState} from 'react';

export default function Searchbar({route,setTogglefilter,togglefilter,liftSearch}){
    const [filterStatus,setfilterStatus]=useState(false);
    const [data,setData]=useState([{info:'Nice One'},{info:'e.target.value'},{info:'e.target.value'}]);

    useEffect(()=>{
        if(route==='products' && window.innerWidth < 750){
            setfilterStatus(true)
        }else{
            setfilterStatus(false)
        }
        console.log('What Now!!')
    },[window.innerWidth]);




    
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
        <input type='text' placeholder='Search products,brands and categories...' onFocus={()=>liftSearch()}/>
        <i className='fa fa-search' onClick={()=>liftSearch()}/>
        </div>        
        </> 
        }




        <div class="result-container">
            {data&&data.map((list,i)=>{
                return <>
                
                <div className='search'>
        <a href='#'>Search products,brands and categories...</a>
        </div> </>
            })}
        </div>
        
        </div>

        </>
    )
}