import {React,useEffect,useState} from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { editCategory, fetchCategory } from '../../../Redux/Admin/categories';
import { useDispatch } from 'react-redux';

export default function Editcategory(){
    const {id}=useParams();
    const [name,setName]=useState('')
    const [slug,setSlug]=useState('')
    const [status,setStatus]=useState('')
    const [imgpreview,setImgpreview]=useState('http://localhost:80/media/1658441585321Screenshot_20220612-225205.png');
    const dispatch=useDispatch();



    function handleSubmit(e){
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "Confirm Action On Category",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5972b9',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Edit it!'
          }).then((result) => {
            if (result.isConfirmed) {
                const formData=new FormData(e.target);
                formData.append('id',id);

                dispatch(editCategory(formData));
            }
          })
   
    }
        
    function imgPreview(e){
    setImgpreview(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(()=>{
    dispatch(fetchCategory(id))
    .then(res=>{
        let category=res.payload;
        setName(category.name);
        setSlug(category.slug);
        setImgpreview(category.img_link);
        setStatus(category.status)
    }).catch(err=>{Swal.fire('Error Occured', `${err.message}`,'error')});

    },[dispatch,id])






    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
        <p>Edit Category</p>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='addcategcon'>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Name</p>
            <input type='text' name='name' value={name} onChange={(e)=> setName(e.target.value)}/>
            </div>
        </div>
        
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Slug</p>
            <input type='text' name='slug' value={slug} onChange={(e)=> setSlug(e.target.value)}/><p>the 'slug is the URL-friendly version of the 
                name. It should contain only lowercase letters, numbers and hyphens'</p>
        </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Thumbnail(Image)</p>
            <div className='previewimg2'>
            <div className='previewimg'>
            <img src={imgpreview} alt='addcategimg'/>
            </div>
            </div>
            <input type='file' name='thumbnail' onChange={imgPreview}/>
        </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Status</p>
            <select name='status' value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value='active'>Activate</option>
            <option value='inactive'>Deactivate</option>
            </select>
            </div>
        </div>
        <div className='usereditbtn'>
        <button>EDIT</button>
        </div>
        </div>    
        </form>        
        </div>
        </>
    )
}