import {React, useEffect, useState} from 'react';

export default function TopBanner({event}){
    const [imggallerypreview,setImggallerypreview]=useState();


    function imggalleryPreview(e){
        setImggallerypreview('')
        setImggallerypreview(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(()=>{
        setImggallerypreview(event && event.top_banner.img_link)
    },[event])

    return(
        <>
        <div className='previewimg2'>
        <div className='previewimg' >
            {imggallerypreview&&<img src={imggallerypreview} alt='topbanner'/>}
        </div>
        </div>
        <div className='admineditnamecon'>
            <div className='usereditadditionalinfo'>
            <p>Top Banner Image</p>
            <input name='img_link' type='file'  onChange={imggalleryPreview}/>
            </div>
        </div>
        </>
    )
}