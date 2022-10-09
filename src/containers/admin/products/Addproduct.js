import {React, useRef,useState,useEffect} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import { MultiSelect } from 'react-multi-select-component';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Addproduct({type}){
    const editorRef=useRef();
    const [selected,setSelected]=useState([]);
    const [options,setOptions]=useState([]);
    const [imggallerypreview,setImggallerypreview]=useState([]);
    const cancelalert=useRef(true)

     function show(){
        console.log(editorRef.current.getContent())
     }
    const loadCategories=()=>{
        axios.get('http://localhost:80/categories/getcategories')
        .then(res=>{
            let status=res.data.status;
            let data=res.data.data||'';
            console.log(data);

            if(status==='success'){

            data.forEach(option=>{
            setOptions(oldOption=>[...oldOption,{value:option.name, label:option.name}])
            });

            }else{
                Swal.fire(
                    'Error Occured',
                    `${status}`,
                    'warning'
                  )                
            }

        }).catch(e=>{
            Swal.fire(
                'Error Occured',
                `${e.message}`,
                'error'
              )
        })
    }

      function handleSumbit(e){
        e.preventDefault();
        const product_details=editorRef.current.getContent();
        const formData=new FormData(e.target)
        formData.append('category',JSON.stringify(selected));
        formData.append('product_details',product_details);

        axios.post('http://localhost:80/products/addproduct',formData,{withCredentials:true})
        .then(res=>{
            let status=res.data.status;
            if(status==='success'){
                 Swal.fire(
                    'Successful!',
                    'Product inserted Successfully',
                    'success'
                );               
            }else{
                Swal.fire(
                    'Error Occured!',
                    `${status}`,
                    'warning'
                );
                //e.target.reset();
            }
        
        }).catch(err=>{
            Swal.fire(
                'Error Occured!',
                `${err}`,
                'error'
              )
        })  
   

     }

    function imggalleryPreview(e){
        setImggallerypreview([])
        const toSet=Array.from(e.target.files);
        toSet.forEach(set=>{
            setImggallerypreview(oldstat=>[...oldstat,URL.createObjectURL(set)])
        });
    }



    useEffect(()=>{
        if(cancelalert.current){
            cancelalert.current=false;
            loadCategories();
        }
    
       },[])

    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
        <p>Add Product</p>
        </div>
        <form onSubmit={handleSumbit}>
        <div className='addcategcon'>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Name</p>
            <input name='name' type='text'/>
            </div>
        </div>
        
        <div className='admineditnamecon2'>
            <div className='admineditname'>
            <p>Category</p>
            <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy='Select'
            />
            </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Count in Stock</p>
            <input name='stock' type='number'/>
            </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Regular price</p>
            <input name='regular_price' type='number'/>
            </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Sale Price</p>
            <input name='sale_price' type='number'/>
            </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Shipping Fee [opional]</p>
            <input type='number' name='shipping'/>
            </div>
        </div>

        <div className='admineditnamecon'>
        <div className='admineditname'>
        <p>Product details</p>
        <div className='editorcon'>
            <Editor
            onInit={(evt,editor)=> editorRef.current=editor}
            init={{
                menubar:false,
                skin:false,
                content_css:false,
            }}
            onChange={show}
            />
        </div>
        </div>
    </div>
       
       <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Status</p>
            <select name='status'>
            <option value='active'>Activate</option>
            <option value='inactive'>Deactivate</option>
            </select>
            </div>
        </div>


        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Image Gallery</p>
            <div className='previewimg2' >
            {
            imggallerypreview.map((imgprev,i)=>{
                return (
            <div className='previewimg' key={i}>
            <img src={imgprev} alt='addimgGallery'/>
            </div>
                )
            })
            }
            </div>
            <input name='img_gallery' type='file' multiple onChange={imggalleryPreview} />
        </div>
        </div>

        <div className='usereditbtn'>
        <button>ADD</button>
        </div>
        </div>  
        </form>          
        </div>
        </>
    )
}