import {React} from 'react';


export default function PermenantLayouts(){
    

    return(
        <>            
        <div className='admineditnamecon'>
        <div className='admineditname'>
            <p>Valid from</p>
            <input defaultValue='infinty' name='start'/>
        </div>
        
        <div className='admineditname'>
            <p>to</p>
            <input defaultValue='infinty' name='end'/>
        </div>
        </div>
        </>
    )
}