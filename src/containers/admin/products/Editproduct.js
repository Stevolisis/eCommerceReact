import {React, useRef,useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Editor} from '@tinymce/tinymce-react';
import { MultiSelect } from 'react-multi-select-component';
import Swal from 'sweetalert2';
import { fetchCategories } from '../../../Redux/Admin/categories';
import { useDispatch } from 'react-redux';
import { editProduct, fetchProduct } from '../../../Redux/Admin/products';

export default function Editproduct(){
    const {id}=useParams();
    const editorRef=useRef();
    const [selected,setSelected]=useState([]);
    const [name,setName]=useState('');
    const [stock,setStock]=useState('');
    const [regular_price,setRegular_price]=useState('');
    const [sale_price,setSale_price]=useState('');
    const [shipping,setShipping]=useState('');
    const [status,setStatus]=useState('');
    const [options,setOptions]=useState([]);
    const [initialValue,setInitialValue]=useState('');
    const [imggallerypreview,setImggallerypreview]=useState([]);
    const cancelalert=useRef(true)
    const dispatch=useDispatch();



    function handleSubmit(e){
        e.preventDefault();
        
        Swal.fire({
            title: 'Are you sure?',
            text: "Confirm Action On Product",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5972b9',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Edit it!'
          }).then((result) => {
            if (result.isConfirmed) {
                const formData=new FormData(e.target);
                formData.append('id',id);
                formData.append('category',JSON.stringify(selected));
                formData.append('product_details',editorRef.current.getContent());

                dispatch(editProduct(formData));
            }
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
//------------------
    dispatch(fetchProduct(id))
    .then(res=>{
        let data=res.payload;
        setName(data.name||'');
        setStock(data.stock||'');
        setRegular_price(data.regular_price||'');
        setSale_price(data.sale_price||'');
        setShipping(data.shipping)
        setStatus(data.status||'');
        setImggallerypreview(data.img_gallery||[]);
        setInitialValue(data.product_details)
        data.category.forEach(option=>{
        setSelected(oldOption=>[...oldOption,{value:option.name, label:option.name}]);
        });
    }).catch(err=>{Swal.fire('Error Occured', `${err.message}`,'error')});

//---------------------
    dispatch(fetchCategories())
    .then(res=>{
    let data=res.payload;
    data.forEach(option=>{
        setOptions(oldOption=>[...oldOption,{value:option.name, label:option.name}])
    })
    }).catch(err=>{Swal.fire('Error Occured', `${err.message}`,'error')});
    }
    },[dispatch,id]);




    

    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
        <p>Edit Product</p>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='addcategcon'>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Name</p>
            <input type='text' name='name' value={name} onChange={(e)=> setName(e.target.value)}/>
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
            <input type='number' name='stock' value={stock==='' ? 0 : stock} onChange={(e)=> setStock(e.target.value)}/>
            </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Regular Price</p>
            <input type='number' name='regular_price' value={regular_price} onChange={(e)=> setRegular_price(e.target.value)}/>
            </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Sale Price</p>
            <input type='number' name='sale_price' value={sale_price} onChange={(e)=> setSale_price(e.target.value)}/>
            </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Shipping Fee [opional]</p>
            <input type='number' name='shipping' value={shipping} onChange={(e)=> setShipping(e.target.value)}/>
            </div>
        </div>

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Product details</p>
            <div className='editorcon'>
                <Editor
                onInit={(evt,editor)=> editorRef.current=editor}
                init={{
                    menubar:false
                }}
                initialValue={initialValue}
                />
            </div>
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

        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Thumbnail(Image)</p>
            <div className='previewimg2' >
            {
            imggallerypreview.map((imgprev,i)=>{
                return (
            <div className='previewimg' key={i}>
            <img src={imgprev} alt='loadingimgGallery'/>
            </div>
                )
            })
            }
            </div>
            <input type='file' name='img_gallery' multiple onChange={imggalleryPreview}/>
        </div>
        </div>

        <div className='usereditbtn'>
        <button>Edit</button>
        </div>
        </div> 
        </form>           
        </div>
        </>
    )
}