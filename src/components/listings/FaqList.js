import React from 'react'
import Accordion2 from '../Accordion2'

export default function FaqList({deletespec,faqs}) {
    const faqsDisplay=faqs.map((faq,i)=>{
    return(
        <div key={i}>
          <Accordion2
        type='slide'
        heading={faq.question}
        detail={faq.answer}
        id={`${i+1}id`}
        editdelid={`${faq._id}/id`}
        deletespec={deletespec}
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
