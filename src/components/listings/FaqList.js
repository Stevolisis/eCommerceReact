import React from 'react'
import Accordion2 from '../accordions/Accordion2'
import { useSelector } from 'react-redux';
import { getAllFaqs } from '../../Redux/Admin/supportFaqs';

export default function FaqList({deletefaq}) {
  const faqs=useSelector(getAllFaqs);

    const faqsDisplay=faqs.map((faq,i)=>{
    return(
        <div key={i}>
        <Accordion2
        type='slide'
        heading={faq.question}
        detail={faq.answer??'...'}
        id={`${i+1}id`}
        editdelid={`${faq._id}/id`}
        deletefaq={deletefaq}
        />
        </div>
        
    )
    })
  return (
    <div>
    {faqsDisplay}

    </div>
  )
}
