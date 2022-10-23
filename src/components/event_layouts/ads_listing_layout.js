import {React, useEffect, useState} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import axios from 'axios';

export default function AdsListing(){
    const [imggallery,setimggallery]=useState([]);
    const [selected,setSelected]=useState([]);
    const [options,setOptions]=useState([]);
    const cancelalert=useRef(true)

    const loadCategories=()=>{
        axios.get('http://localhost:80/categories/getcategories')
        .then(res=>{
            let response=res.data.data;
            console.log(response);
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
            console.log(response);
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
        <div className='admineditnamecon' style={{paddingTop:'6px'}}>
            <div className='usereditadditionalinfo'>
            <p>BannerAds Images</p>
            <input  type='file' multiple name='bannerAds' onChange={imggalleryPreview}/>
            <p>select multiple images for you slider. Recommended number of images (6)</p>
            </div>
        </div>

        <div className='admineditnamecon' style={{marginTop:'-10px'}}>
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