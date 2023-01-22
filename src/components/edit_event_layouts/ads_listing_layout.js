import {React, useEffect, useState, useRef} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AdsListing({event,selected,setSelected,slides,setSlides}){
    const [options,setOptions]=useState([]);
    const cancelalert=useRef(true)

    const loadCategories=()=>{
        axios.get('http://localhost:80/categories/getcategories')
        .then(res=>{
            let response=res.data.data;
            if(response==='Error Occured'){
                Swal.fire(
                    'Error After Fetch!',
                    `Error Occured: ${response}`,
                    'warning'
                  )
            }else{
               response.forEach(option=>{
                setOptions(oldOption=>[...oldOption,{value:`products/${option.slug}`, label:`${option.name} (Category)`}])
               })

            }
        }).catch(err=>{
            Swal.fire(
                'Error At Axios2!',
                `Error Occured: ${err}`,
                'warning'
              )
        })
    }

    const loadProducts=()=>{
        axios.get('http://localhost:80/products/getproducts')
        .then(res=>{
            let response=res.data.data;
            if(response==='Error Occured'){
                Swal.fire(
                    'Error After Fetch!',
                    `Error Occured: ${response}`,
                    'warning'
                  )
            }else{
               response.forEach(option=>{
                setOptions(oldOption=>[...oldOption,{value:`product/${option.slug}`, label:`${option.name} (Product)`}])
               })

            }
        }).catch(err=>{
            Swal.fire(
                'Error At Axios2!',
                `Error Occured: ${err}`,
                'warning'
              )
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
        if(event){
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