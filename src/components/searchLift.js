import {React} from 'react';

export default function SearchLift({liftSearch}){

    return(
        <>
        <div className='searchLiftCon'>
            <div className='searchercon'>
            {/* <i className='fa fa-arrow-left'/> */}

                <input type='text' placeholder='Search products,brands and categories...'/>
                <i className='fa fa-search' onClick={()=>liftSearch()}/>
            </div>

            <div className='resultCon'>
                <a href='#'>
                <p>fart in the toilet and is safer</p>
                </a>
                <a href='#'>
                <p>fart in the toilet and is safer</p>
                </a>
                <a href='#'>
                <p>fart in the toilet and is safer</p>
                </a>
                <a href='#'>
                <p>fart in the toilet and is safernnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn</p>
                </a>
                <a href='#'>
                <p>fart in the toilet and is safer</p>
                </a>
                <a href='#'>
                <p>fart in the toilet and is safer</p>
                </a>
                <a href='#'>
                <p>fart in the toilet and is safer</p>
                </a>
                <a href='#'>
                <p>fart in the toilet and is safer</p>
                </a>
                <a href='#'>
                <p>fart in the toilet and is safer</p>
                </a>
            </div>
        </div>

        </>
    )
}