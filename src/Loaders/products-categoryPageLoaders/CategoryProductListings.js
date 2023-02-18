import {React} from 'react';



export default function CategoryProductListings(){
    const data=[1,2,3,4,5,6,7,8];


    return(
        <>


{
data.map(product=>{
return <>
<div className='specialproduct2'>

<div className='specialproductimg2'>
<div className='productimg2'></div>
</div>

<div className='specialproductinfo2' id='specialproductinfo2'>

<div className='productname2'>
<p style={{width:'30px'}}></p>
</div>

<div className='productname2'>
<p style={{width:'80px'}}></p>
</div>

<div className='productname2'>
<p style={{width:'50px'}}></p>
</div>

<div className='productprices2' id='productprices2'>
<button></button>
</div>

</div>

</div>
</>
})
}


        </>
    )
}