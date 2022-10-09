import {React, useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Addcategory(){
    const [imgpreview,setImgpreview]=useState('');

    const handleSubmit=((e)=>{
        e.preventDefault();
    const formData=new FormData(e.target);
   
        axios.post('http://localhost:80/categories/addcategory',formData,{withCredentials:true})
        .then(res=>{
            let status=res.data.status;
            if(status==='success'){
                 Swal.fire(
                    'Successful!',
                    'Category inserted Successfully',
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
        
        }).catch(e=>{
            Swal.fire(
                'Error Occured!',
                `${e.message}`,
                'error'
              )
        });  
        });

        function imgPreview(e){
            setImgpreview(URL.createObjectURL(e.target.files[0]));
           }

    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
        <p>Add Category</p>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='addcategcon'>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Name</p>
            <input type='text' name='name'/>
            </div>
        </div>
        
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Slug</p>
            <input type='text' name='slug'/><p>the 'slug is the URL-friendly version of the 
                name. It should contain only lowercase letters, numbers and hyphens'</p>
        </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Status</p>
            <select name='status'>
            <option defaultValue>Activate</option>
            <option>Deactivate</option>
            </select>
            </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Thumbnail(Image)</p>

            <div className='previewimg'>
            <img src={imgpreview} alt='addcategimg'/>
            </div>

            <input type='file' name='thumbnail' onChange={imgPreview}/>

        </div>
        </div>

        <div className='usereditbtn'>
        <button >ADD</button>
        </div>
        </div>
        </form>            
        </div>
        </>
    )
}