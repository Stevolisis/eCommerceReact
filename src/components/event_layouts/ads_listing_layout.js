import {React, useEffect, useState, useRef} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../Redux/Admin/categories';
import { fetchProducts } from '../../Redux/Admin/products';

export default function AdsListing({selected5,setSelected5}){
    const [imggallery,setimggallery]=useState([]);
    const [options,setOptions]=useState([]);
    const cancelalert=useRef(true);
    const dispatch=useDispatch();

    
    const loadCategories=()=>{
        dispatch(fetchCategories())
        .then(response=>{
            response.payload.filter(product=>product.status==='active').map(option=>{
            setOptions(oldOption=>[...oldOption,{value:`${option.slug}`, label:`${option.name} (Category)`}])

            });
        });
    }

    const loadProducts=()=>{
        dispatch(fetchProducts())
        .then(response=>{
               response.payload.filter(product=>product.status==='active').map(option=>{
                setOptions(oldOption=>[...oldOption,{value:`${option.slug}`, label:`${option.name} (Product)`}])
               })            
        })
    }



    function imggalleryPreview(e){
        setimggallery([])
        const toSet=Array.from(e.target.files);
        toSet.forEach(set=>{
            setimggallery(oldstat=>[...oldstat,URL.createObjectURL(set)])
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
        <div className='previewimg2'>
            {
            imggallery&&imggallery.map((imgprev,i)=>{
                return (
            <div className='previewimg' key={i}>
            <img src={imgprev} alt={imgprev}/>
            </div>
                )
            })
            }
        </div>

        <div className='admineditnamecon' style={{paddingTop:'6px'}}>
            <div className='usereditadditionalinfo'>
            <p>BannerAds Images</p>
            <input  type='file' multiple name='bannerAds' onChange={imggalleryPreview}/>
            <p>select multiple images for you slider. Recommended number of images (6)</p>
            </div>
        </div>

        <div className='admineditnamecon2'>
            <div className='admineditname'>
            <p>Label</p>
            <MultiSelect
            options={options}
            value={selected5}
            onChange={setSelected5}
            labelledBy='Select'
            />
            <p>Select label(Category/Product) to which the user will be sent to after clicking the banners.</p>
            <p><b>Note: </b>Select the labels chronologically, e.g the first label you ticked, will be allocated to the first slider and so on.</p>
            </div>
        </div>

        </>
    )
}