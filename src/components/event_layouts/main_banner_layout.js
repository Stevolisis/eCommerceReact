import {React, useState, useRef} from 'react';
import { MultiSelect } from 'react-multi-select-component';

export default function MainBanner(){
    const [selected2,setSelected2]=useState([]);
    const [options1,setOptions1]=useState([]);
    const [imggallerypreview1,setImggallerypreview1]=useState('');
    const [imggallerypreview2,setImggallerypreview2]=useState('');
    const [imggallerypreview3,setImggallerypreview3]=useState([]);

    function imggalleryPreview1(e){
        setImggallerypreview1('')
        setImggallerypreview1(URL.createObjectURL(e.target.files[0]))
    }

        function imggalleryPreview2(e){
            setImggallerypreview2('')
            setImggallerypreview2(URL.createObjectURL(e.target.files[0]))
    }

    function imggalleryPreview3(e){
        setImggallerypreview3([])
        const toSet=Array.from(e.target.files);
        toSet.forEach(set=>{
            setImggallerypreview3(oldstat=>[...oldstat,URL.createObjectURL(set)])
        });
    }



    return(
        <>
        <div className='previewimg2' style={{justifyContent:'space-between',width:'100%'}}>
        <div className='previewimg' >
            {imggallerypreview1&&<img src={imggallerypreview1} alt='banner1'/>}
        </div>
        <div className='previewimg' >
            {imggallerypreview2&&<img src={imggallerypreview2} alt='banner2'/>}
        </div>
        </div>
        <div className='usereditnamecon' style={{padding:'8px 0'}}>
        <div className='usereditname'>
            <p>Banner 1</p>
            <input name='banner1' type='file' onChange={imggalleryPreview1}/>
        </div>
        <div className='usereditname'>
            <p>Banner 2</p>
            <input name='banner2' type='file'  onChange={imggalleryPreview2}/>
        </div>

        </div>

        <div className='previewimg2'>
        {
            imggallerypreview3&&imggallerypreview3.map((imgprev,i)=>{
                return (
            <div className='previewimg' key={i}>
            <img src={imgprev} alt={imgprev}/>
            </div>
                )
            })
            }
        </div>
        <div className='admineditnamecon'>
            <div className='usereditadditionalinfo'>
            <p>Slider Images</p>
            <input name='sliders' type='file' multiple  onChange={imggalleryPreview3}/>
            <p>select multiple images for you slider. Recommended number of images (6)</p>
            </div>
        </div>

        <div className='admineditnamecon2'>
            <div className='admineditname'>
            <p>Label</p>
            <MultiSelect
            options={options1}
            value={selected2}
            onChange={setSelected2}
            labelledBy='Select'
            />
            <p>Select label(Category/Product) to which the user will be sent to after clicking the banners.</p>
            <p><b>Note: </b>Select the labels chronologically, e.g the first label you ticked, will be allocated to the first slider and so on.</p>
            </div>
        </div>
        </>
    )
}