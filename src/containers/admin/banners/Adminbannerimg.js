import {React, useState,useEffect,useRef} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Adminbannerimg(){
    const [selected1,setSelected1]=useState([]);
    const [selected2,setSelected2]=useState([]);
    const [selected3,setSelected3]=useState([]);
    const [options1,setOptions1]=useState([]);
    const [imggallerypreview1,setImggallerypreview1]=useState('');
    const [imggallerypreview2,setImggallerypreview2]=useState('');
    const [imggallerypreview3,setImggallerypreview3]=useState([]);
    const [imggallerypreview4,setImggallerypreview4]=useState([]);
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
                    setOptions1(oldOption=>[...oldOption,{value:`products/${option.slug}`, label:`${option.name} (Category)`}])
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
                    setOptions1(oldOption=>[...oldOption,{value:`product/${option.slug}`, label:`${option.name} (Product)`}])
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

        

        const loadBanner=()=>{
            axios.get('http://localhost:80/banners/getbannerforedit',{withCredientials:true})
            .then(res=>{
                let data=res.data.data[0];

                setImggallerypreview1(data.banner1);
                setImggallerypreview2(data.banner2);
                setImggallerypreview3(data.sliders);
                setImggallerypreview4(data.bannerAds);
                setSelected1(data.label1);
                setSelected2(data.label2);
                setSelected3(data.label3)

            }).catch(err=>{
                Swal.fire(
                    'Error Occured!!',
                    'Updated Error.',
                    'warning'
                  )
            })
        }
 
    function handleSubmit(e){
        e.preventDefault();
        console.log(selected3)

        const formData=new FormData(e.target);
        formData.append('label1',JSON.stringify(selected1));
        formData.append('label2',JSON.stringify(selected2));
        formData.append('label3',JSON.stringify(selected3));

            axios.put('http://localhost:80/banners/editbanner',formData,{withCredentials:true})
            .then(res=>{
                let data=res.data.data;
                if(data==='Error Occured'||data==='Invalid Category'||data==='Product Exist, pls choose another'||data==='Error Occured At Save'){
                    Swal.fire(
                        'Error!',
                        `Data Done: ${data}`,
                        'warning'
                    );
                }else{
                    Swal.fire(
                        'Successful!',
                        `Data Done: ${data}`,
                        'success'
                    );
                    //e.target.reset();
                }
            }).catch(err=>{
        
                Swal.fire(
                    'Error!',
                    `Error In Axios ${err}`,
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

        function imggalleryPreview4(e){
            setImggallerypreview4([])
            const toSet=Array.from(e.target.files);
            toSet.forEach(set=>{
                setImggallerypreview4(oldstat=>[...oldstat,URL.createObjectURL(set)])
            });
        }


        useEffect(()=>{
            if(cancelalert.current){
                cancelalert.current=false;
                loadBanner();
                loadCategories();
                loadProducts();
            }
        
           },[])


    return(
        <>
            <div className='usermaincon'>
        <div className='userorderheading'><p>Banner Images</p></div>
        <div className='userorderscon'>






       <form onSubmit={handleSubmit}>


        <div className='previewimg2' style={{justifyContent:'space-between',width:'100%',padding:'0 7px'}}>
        <div className='previewimg' >
            <img src={imggallerypreview1} alt='Banner 1'/>
            </div>
            <div className='previewimg'>
            <img src={imggallerypreview2} alt='Banner 2'/>
            </div>
            </div>

        <div className='usereditnamecon' style={{paddingBottom:'20px'}}>
        <div className='usereditname'>
            <p>Banner 1</p>
            <input name='banner1' type='file' onChange={imggalleryPreview1}/>
        </div>
        <div className='usereditname'>
            <p>Banner 2</p>
            <input name='banner2' type='file'  onChange={imggalleryPreview2}/>
        </div>

        </div>
        <div className='admineditnamecon2' style={{marginTop:'-10px',padding:'0 10px'}}>
            <div className='admineditname'>
            <p>Label</p>
            <MultiSelect
            options={options1}
            value={selected1}
            onChange={setSelected1}
            labelledBy='Select'
            />
            <p>Select label(Category/Product) to which the user will be sent to after clicking the banners.</p>
            <p><b>Note: </b>Select the labels chronologically, e.g the first label you ticked, will be allocated to the first banner and so on.</p>
            </div>
        </div>
<hr/>






        <div className='previewimg2' style={{marginTop:'30px',padding:'0 7px'}}>
        {
            imggallerypreview3.map((imgprev,i)=>{
                return (
            <div className='previewimg' key={i}>
            <img src={imgprev} alt={imgprev}/>
            </div>
                )
            })
            }
            </div>
        <div className='usereditadditionalinfocon' style={{paddingTop:'6px'}}>
            <div className='usereditadditionalinfo'>
            <p>Slider Images</p>
            <input name='sliders' type='file' multiple  onChange={imggalleryPreview3}/>
            <p>select multiple images for you slider. Recommended number of images (6)</p>
            </div>
        </div>

        <div className='admineditnamecon2' style={{marginTop:'-10px',padding:'0 10px'}}>
            <div className='admineditname'>
            <p>Label</p>
            <MultiSelect
            options={options1}
            value={selected2}
            onChange={setSelected2}
            labelledBy='Select'
            />
            {/* <select>
                {options.map((option,i)=>{
                    return <option value={option.value}>{option.label}</option>
                })}
            </select> */}
            <p>Select label(Category/Product) to which the user will be sent to after clicking the banners.</p>
            <p><b>Note: </b>Select the labels chronologically, e.g the first label you ticked, will be allocated to the first slider and so on.</p>
            </div>
        </div>

<hr/>





        <div className='previewimg2' style={{marginTop:'30px',padding:'0 7px'}}>
        {
            imggallerypreview4.map((imgprev,i)=>{
                return (
            <div className='previewimg' key={i}>
            <img src={imgprev} alt={imgprev}/>
            </div>
                )
            })
            }
            </div>

            <div className='usereditadditionalinfocon' style={{paddingTop:'6px'}}>
            <div className='usereditadditionalinfo'>
            <p>BannerAds Images</p>
            <input  type='file' multiple name='bannerAds' onChange={imggalleryPreview4}/>
            <p>select multiple images for you slider. Recommended number of images (6)</p>
            </div>
        </div>
        <div className='admineditnamecon2' style={{marginTop:'-10px',padding:'0 10px'}}>
            <div className='admineditname'>
            <p>Label</p>
            <MultiSelect
            options={options1}
            value={selected3}
            onChange={setSelected3}
            labelledBy='Select'
            />
            <p>Select label(Category/Product) to which the user will be sent to after clicking the banners.</p>
            <p><b>Note: </b>Select the labels chronologically, e.g the first label you ticked, will be allocated to the first slider and so on.</p>
            </div>
        </div>









        <div className='usereditbtn'>
        <button>UPDATE</button>
        </div>
        </form>
        </div>    
        </div>    
        </>
    )
}