import {React} from 'react';

export default function Meta_data_layout({data}){

    return(
        <>
       <section className='siteInfoCon'>
        
        <div className='siteInfo'>
            <img src={data.meta1&&data.meta1.img_link} alt='mainbanner'/>
            <p>{data.meta1&&data.meta1.text}</p>
        </div>

        <div className='siteInfo'>
            <img src={data.meta2&&data.meta2.img_link} alt='mainbanner'/>
            <p>{data.meta2&&data.meta2.text}</p>
        </div>

        <div className='siteInfo'>
            <img src={data.meta3&&data.meta3.img_link} alt='mainbanner'/>
            <p>{data.meta3&&data.meta3.text}</p>
        </div>

        <div className='siteInfo'>
            <img src={data.meta4&&data.meta4.img_link} alt='mainbanner'/>
            <p>{data.meta4&&data.meta4.text}</p>
        </div>
        </section>
            
        </>
    )
}