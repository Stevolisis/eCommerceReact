import {React,useRef} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import { useDispatch } from 'react-redux';
import { addFaq } from '../../../Redux/Admin/supportFaqs';


export default function Addsupport(){
    const editorRef=useRef();
    const dispatch=useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target);
        formData.append('answer',editorRef.current.getContent());
        dispatch(addFaq(formData))
    }



    return(
        <>
        <div className='admindashcon'>
        <div className='userorderheading'>
        <p>ADD F.A.Q</p>
        </div>
        <div className='addcategcon'>
            <form onSubmit={handleSubmit}>
        <div className='admineditnamecon'>
            <div className='admineditname'>
            <p>Question</p>
            <input type='text' name='question'/>
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
                />
            </div>
            </div>
        </div>

        <div className='usereditbtn'>
        <button>ADD</button>
        </div>
        </form>
        </div>            
        </div>
        </>
    )
}