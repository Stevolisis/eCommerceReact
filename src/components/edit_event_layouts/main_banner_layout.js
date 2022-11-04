import axios from 'axios';
import {React, useState, useEffect, useRef} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import Swal from 'sweetalert2';

export default function MainBanner({event,selected,setSelected,selected2,setSelected2}){
    const [options,setOptions]=useState([]);
    const [imggallerypreview1,setImggallerypreview1]=useState('');
    const [imggallerypreview2,setImggallerypreview2]=useState('');
    const [imggallerypreview3,setImggallerypreview3]=useState([]);
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

    useEffect(()=>{
        setImggallerypreview1(event && event.main_banner.banner1.img_link)
        setImggallerypreview2(event && event.main_banner.banner2.img_link)
        event && setSelected(oldOption=>[...oldOption,{value:event.main_banner.banner1.slug, label:event.main_banner.banner1.name}]);
        event && setSelected(oldOption=>[...oldOption,{value:event.main_banner.banner2.slug, label:event.main_banner.banner2.name}]);

        {
            let slide=[]
            event && event.main_banner.slides.forEach(option=>{
            slide.push(option.img_link)
            setSelected2(oldOption=>[...oldOption,{value:option.slug, label:option.name}]);
            });
            setImggallerypreview3(slide)
        }

    },[event])




    
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
            value={selected}
            onChange={setSelected}
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