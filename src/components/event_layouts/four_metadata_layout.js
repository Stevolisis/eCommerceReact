import {React, useState} from 'react';

export default function MetaData(){
    const [imggallerypreview1,setImggallerypreview1]=useState('');
    const [imggallerypreview2,setImggallerypreview2]=useState('');
    const [imggallerypreview3,setImggallerypreview3]=useState('');
    const [imggallerypreview4,setImggallerypreview4]=useState('');


    function imggalleryPreview1(e){
        setImggallerypreview1('')
        setImggallerypreview1(URL.createObjectURL(e.target.files[0]))
    }

    function imggalleryPreview2(e){
            setImggallerypreview2('')
            setImggallerypreview2(URL.createObjectURL(e.target.files[0]))
    }

    function imggalleryPreview3(e){
        setImggallerypreview3('')
        setImggallerypreview3(URL.createObjectURL(e.target.files[0]))
    }

    function imggalleryPreview4(e){
            setImggallerypreview4('')
            setImggallerypreview4(URL.createObjectURL(e.target.files[0]))
    }

    return(
        <>
        <div className='previewimg2' style={{justifyContent:'space-between',width:'100%'}}>
        <div className='previewimg' >
            {imggallerypreview1&&<img src={imggallerypreview1} alt='meta1'/>}
            </div>
        <div className='previewimg'>
            {imggallerypreview2&&<img src={imggallerypreview2} alt='meta2'/>}
        </div>
        </div>
        <div className='usereditnamecon' style={{padding:'8px 0'}}>
        <div className='usereditname'>
            <p>Icon 1</p>
            <input name='banner1' type='file' onChange={imggalleryPreview1}/>
        </div>
        <div className='usereditname'>
            <p>Icon 2</p>
            <input name='banner2' type='file'  onChange={imggalleryPreview2}/>
        </div>
        </div>
        <div className='usereditnamecon' style={{padding:'8px 0'}}>
        <div className='usereditname'>
            <p>Title 1</p>
            <input type='text'/>
        </div>
        <div className='usereditname'>
            <p>Title 2</p>
            <input type='text' />
        </div>
        </div>

        <div className='previewimg2' style={{justifyContent:'space-between',width:'100%'}}>
        <div className='previewimg' >
            {imggallerypreview3&&<img src={imggallerypreview3} alt='meta3'/>}
            </div>
        <div className='previewimg'>
            {imggallerypreview4&&<img src={imggallerypreview4} alt='meta4'/>}
        </div>
        </div>
        <div className='usereditnamecon' style={{padding:'8px 0'}}>
        <div className='usereditname'>
            <p>Icon 3</p>
            <input name='banner1' type='file' onChange={imggalleryPreview3}/>
        </div>
        <div className='usereditname'>
            <p>Icon 4</p>
            <input name='banner2' type='file'  onChange={imggalleryPreview4}/>
        </div>
        </div>
        <div className='usereditnamecon' style={{padding:'8px 0'}}>
        <div className='usereditname'>
            <p>Title 3</p>
            <input type='text'/>
        </div>
        <div className='usereditname'>
            <p>Title 4</p>
            <input type='text' />
        </div>
        </div>
        </>
    )
}