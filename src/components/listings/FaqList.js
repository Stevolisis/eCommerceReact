import React from 'react'
import Accordion2 from '../accordions/Accordion2'
import { useSelector } from 'react-redux';
import { getAllFaqs } from '../../Redux/Admin/supportFaqs';

export default function FaqList({deletefaq,route}) {
  const faqs=useSelector(getAllFaqs);

    const faqsDisplay=faqs.map((faq,i)=>{
    return(
        <div key={i}>
        {route==='help'?
        <Accordion2
        type='slide'
        heading={faq.question}
        detail={faq.answer??'...'}
        id={`${i+1}id`}
        />
      :
      <Accordion2
        type='slide'
        heading={faq.question}
        detail={faq.answer??'...'}
        id={`${i+1}id`}
        editdelid={`${faq._id}/id`}
        deletefaq={deletefaq}
        />}
        </div>
        
    )
    })
  return (
    <div>
    {faqsDisplay}

    </div>
  )
}
