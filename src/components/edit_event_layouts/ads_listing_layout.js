import {React, useEffect, useState, useRef} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../Redux/Admin/categories';
import { fetchProducts } from '../../Redux/Admin/products';

export default function AdsListing({selected,setSelected,slides,setSlides}){
    const [options,setOptions]=useState([]);
    const cancelalert=useRef(true)
    const event=useSelector(state=>state.eventReducer.event);
    const dispatch=useDispatch();
    
    const loadCategories=()=>{
        dispatch(fetchCategories())
        .then(response=>{
            response.payload.forEach(option=>{
            setOptions(oldOption=>[...oldOption,{value:`${option.slug}`, label:`${option.name} (Category)`}])

            });
        });
    }

    const loadProducts=()=>{
        dispatch(fetchProducts())
        .then(response=>{
               response.payload.forEach(option=>{
                setOptions(oldOption=>[...oldOption,{value:`${option.slug}`, label:`${option.name} (Product)`}])
               })            
        })
    }


    function imagePreview(e){
        setSlides([])
        const toSet=Array.from(e.target.files);
        toSet.forEach(set=>{
            setSlides(oldstat=>[...oldstat,URL.createObjectURL(set)])
        });
    }


    useEffect(()=>{
        if(cancelalert.current){
            cancelalert.current=false;
            loadCategories();
            loadProducts();
        }
    
       },[]);



       useEffect(()=>{
        if(event&&event.ads_listing){
                let slide=[];
                let imgSlide=[];
                event.ads_listing.forEach(option=>{
                imgSlide.push(option.img_link);
                slide.push({value:option.slug, label:option.name})
                });
                
                setSlides(imgSlide);
                setSelected(slide);
        }
       },[event])




    return(
        <>
        <div className='previewimg2'>
            {
            slides&&slides.map((imgprev,i)=>{
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
            <input  type='file' multiple name='bannerAds' onChange={imagePreview}/>
            <p>select multiple images for you slider. Recommended number of images (6)</p>
            </div>
        </div>

        <div className='admineditnamecon2'>
            <div className='admineditname'>
            <p>Label</p>
            <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy='Select'
            />
            <p>Select label(Category/Product) to which the user will be sent to after clicking the banners.</p>
            <p><b>Note: </b>Select the labels chronologically, e.g the first label you ticked, will be allocated to the first slider and so on.</p>
            </div>
        </div>

        </>
    )
}