import {React,useEffect,useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import {Editor} from '@tinymce/tinymce-react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Editsupport(){
    const editorRef=useRef();
    const {id}=useParams();
    const [initialValue,setInitialValue]=useState('')
    const [question,setQuestion]=useState('')
    const cancelalert=useRef(true)

    const handleSubmit=((e)=>{
        e.preventDefault();
        const formData=new FormData(e.target);
        formData.append('answer',editorRef.current.getContent());
        axios.put(`http://localhost:80/faq/editFaq/${id}`,formData,{withCredientials:true})
        .then(res=>{
            let data=res.data.data;
            Swal.fire(
                'Successful!!',
                data,
                'success'
            )

        }).catch(e=>{
            console.log(e)
            Swal.fire(
                'Error!!',
                e.message,
                'warning'
            )
        })
    });

        const loadFaq=(()=>{
           axios.get(`http://localhost:80/faq/editfaqForEdit/${id}`,{withCredentials:true})
           .then(res=>{
            let data=res.data.data;
            setQuestion(data.question);
            setInitialValue(data.answer);
           }).catch(err=>{
            Swal.fire(
                'Error Occured!',
                err.message,
                'warning'
            )   
           })
        });

        useEffect(()=>{
            if(cancelalert.current){
                cancelalert.current=false;
                loadFaq();
            }
        
        },[])

    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
        <p>EDIT F.A.Q({id})</p>
        </div>
        <div className='addcategcon'>
            <form onSubmit={handleSubmit}>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Question</p>
            <input type='text' name='question' value={question} onChange={(e)=>setQuestion(e.target.value)}/>
            </div>
        </div>
        
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Answer</p>
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

        <div className='usereditbtn'>
        <button>EDIT</button>
        </div>
        </form>
        </div>            
        </div>
        </>
    )
}