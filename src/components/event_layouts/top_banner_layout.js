import {React, useState} from 'react';

export default function TopBanner(){
    const [imggallerypreview,setImggallerypreview]=useState('');

    function imggalleryPreview(e){
        setImggallerypreview('')
        setImggallerypreview(URL.createObjectURL(e.target.files[0]))
    }

    return(
        <>
        <div className='previewimg2'>
        <div className='previewimg' >
            {imggallerypreview&&<img src={imggallerypreview} alt='topbanner'/>}
        </div>
        </div>
        <div className='admineditnamecon'>
            <div className='usereditadditionalinfo'>
            <p>Slider Images</p>
            <input name='img_link' type='file'  onChange={imggalleryPreview}/>
            <p>select multiple images for you slider. Recommended number of images (6)</p>
            </div>
        </div>
        </>
    )
}