import $ from 'jquery';

export const loading=(status)=>{
    $(`.loaderCon`).css('display',`${status===true?'flex':'none'}`);    
}