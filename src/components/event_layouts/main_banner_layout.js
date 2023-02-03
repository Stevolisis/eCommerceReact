import {React, useState, useEffect, useRef} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../Redux/Admin/categories';
import { fetchProducts } from '../../Redux/Admin/products';

export default function MainBanner({selected3,setSelected3,selected4,setSelected4}){
    const [options,setOptions]=useState([]);
    const [imggallerypreview1,setImggallerypreview1]=useState('');
    const [imggallerypreview2,setImggallerypreview2]=useState('');
    const [imggallerypreview3,setImggallerypreview3]=useState([]);
    const cancelalert=useRef(true);
    const dispatch=useDispatch();

    const loadCategories=()=>{
        dispatch(fetchCategories())
        .then(response=>{
            response.payload.filter(option=>option.status==='active').map(option=>{
            setOptions(oldOption=>[...oldOption,{value:`${option.slug}`, label:`${option.name} (Category)`}])

            });
        });
    }

    const loadProducts=()=>{
        dispatch(fetchProducts())
        .then(response=>{
               response.payload.filter(option=>option.status==='active').map(option=>{
                setOptions(oldOption=>[...oldOption,{value:`${option.slug}`, label:`${option.name} (Product)`}])
               })            
        })
    }




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



    useEffect(()=>{
        if(cancelalert.current){
            cancelalert.current=false;
            loadCategories();
            loadProducts();
        }
    },[]);




    
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






        <div className='admineditnamecon2'>
            <div className='admineditname'>
            <p>Label</p>
            <MultiSelect
            options={options}
            value={selected3}
            onChange={setSelected3}
            labelledBy='Select'
            />
            <p>Select label(Category/Product) to which the user will be sent to after clicking the banners.</p>
            <p><b>Note: </b>Select the labels chronologically, e.g the first label you ticked, will be allocated to the first banner and so on.</p>
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
            <input name='slides' type='file' multiple  onChange={imggalleryPreview3}/>
            <p>select multiple images for you slider. Recommended number of images (6)</p>
            </div>
        </div>





        <div className='admineditnamecon2'>
            <div className='admineditname'>
            <p>Label</p>
            <MultiSelect
            options={options}
            value={selected4}
            onChange={setSelected4}
            labelledBy='Select'
            />
            <p>Select label(Category/Product) to which the user will be sent to after clicking the banners.</p>
            <p><b>Note: </b>Select the labels chronologically, e.g the first label you ticked, will be allocated to the first slider and so on.</p>
            </div>
        </div>
        </>
    )
}