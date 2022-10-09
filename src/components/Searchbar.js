import {React,useEffect,useState} from 'react';

export default function Searchbar({route,setTogglefilter,togglefilter}){
    const [filterStatus,setfilterStatus]=useState(false);

    useEffect(()=>{
        if(route==='products' && window.innerWidth < 750){
            setfilterStatus(true)
        }else{
            setfilterStatus(false)
        }
        console.log('What Now!!')
    },[window.innerWidth])


    
    return(
        <>
        <div className='searchcon'>

        {filterStatus ? <>
         <div className='search2'>
        <input type='text' placeholder='Search products,brands and categories...'/>
        <div className='sort5' onClick={()=>setTogglefilter(!togglefilter)}>
            <div className='sortheading'>
                <span>Filter</span>
                <i className='fa fa-angle-down'/>
            </div>
        </div>
        </div>       
        </> : <>
        <div className='search'>
        <input type='text' placeholder='Search products,brands and categories...'/>
        <button>Search</button>
        </div>        
        </> }




        {/* <div class="result-container">
        <div>Hello World</div>
        <div>Hello World</div>
        <div>Hello World</div>
        </div> */}
        
        </div>

        </>
    )
}