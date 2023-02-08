import {React, useEffect, useState} from 'react';
import {  useSelector } from 'react-redux';

export default function MetaData(){
    const [imggallerypreview1,setImggallerypreview1]=useState('');
    const [imggallerypreview2,setImggallerypreview2]=useState('');
    const [imggallerypreview3,setImggallerypreview3]=useState('');
    const [imggallerypreview4,setImggallerypreview4]=useState('');
    const [info1,setInfo1]=useState('');
    const [info2,setInfo2]=useState('');
    const [info3,setInfo3]=useState('');
    const [info4,setInfo4]=useState('');
    const event=useSelector(state=>state.eventReducer.event);

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



    useEffect(()=>{
        if(event&&event.meta_data){
            setImggallerypreview1(event.meta_data.meta1.img.url)
            setImggallerypreview2(event.meta_data.meta2.img.url)
            setImggallerypreview3(event.meta_data.meta3.img.url)
            setImggallerypreview4(event.meta_data.meta4.img.url)
            setInfo1(event.meta_data.meta1.text)
            setInfo2(event.meta_data.meta2.text)
            setInfo3(event.meta_data.meta3.text)
            setInfo4(event.meta_data.meta4.text)
        }
    },[event])



    
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
            <input name='icon1' type='file' onChange={imggalleryPreview1}/>
        </div>

        <div className='usereditname'>
            <p>Icon 2</p>
            <input name='icon2' type='file' onChange={imggalleryPreview2}/>
        </div>

        </div>
        <div className='usereditnamecon' style={{padding:'8px 0'}}>
        <div className='usereditname'>
            <p>Info 1</p>
            <input type='text' name='info1' value={info1} onChange={(e)=>setInfo1(e.target.value)}/>
        </div>
        <div className='usereditname'>
            <p>Info 2</p>
            <input type='text' name='info2' value={info2} onChange={(e)=>setInfo2(e.target.value)} />
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
            <input name='icon3' type='file' onChange={imggalleryPreview3}/>
        </div>
        <div className='usereditname'>
            <p>Icon 4</p>
            <input name='icon4' type='file'  onChange={imggalleryPreview4}/>
        </div>
        </div>

        <div className='usereditnamecon' style={{padding:'8px 0'}}>
        <div className='usereditname'>
            <p>Info 3</p>
            <input type='text' name='info3' value={info3} onChange={(e)=>setInfo3(e.target.value)}/>
        </div>
        <div className='usereditname'>
            <p>Info 4</p>
            <input type='text' name='info4' value={info4} onChange={(e)=>setInfo4(e.target.value)} />
        </div>
        </div>
        </>
    )
}