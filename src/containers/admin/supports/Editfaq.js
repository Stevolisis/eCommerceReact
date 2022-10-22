import {React,useEffect,useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import {Editor} from '@tinymce/tinymce-react';
import Swal from 'sweetalert2';
import { editFaq, fetchFaq } from '../../../Redux/Admin/supportFaqs';
import { useDispatch } from 'react-redux';

export default function Editsupport(){
    const editorRef=useRef();
    const {id}=useParams();
    const [initialValue,setInitialValue]=useState('')
    const [question,setQuestion]=useState('')
    const dispatch=useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "Confirm Action On F.A.Q",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5972b9',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Edit it!'
          }).then((result) => {
            if (result.isConfirmed) {
                const formData=new FormData(e.target);
                formData.append('id',id);
                formData.append('answer',editorRef.current.getContent());

                dispatch(editFaq(formData));
            }
          })
   
    }


        useEffect(()=>{
            dispatch(fetchFaq(id))
            .then(res=>{
                let data=res.payload;
                setQuestion(data.question);
                setInitialValue(data.answer);
            }).catch(err=>{Swal.fire('Error Occured', `${err.message}`,'error')});
        
        },[dispatch,id])



    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
        <p>EDIT F.A.Q</p>
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