import {React} from 'react';
import Ratings from './Ratings';

export default function Reviews({listing}){

    return(
        <>
<div className='productdetailscon'>

<div className='summary'>
<div><h3>Verified Reviews</h3></div>

</div>



<div className='hiddendetails'>

<div className='reviewCon'>


<div className='reviewStarCon'>
    <div className='average-review'>
        <h1><sup>4</sup>/<sub>5</sub></h1>
        <div className='rating'><Ratings value={4}/></div>
        <p>14 verified ratings</p>
    </div>
    
    <div className='reviewscoreCon'>
        <div className='reviewscore'>
            <p>5</p>
            <span><i className='fa fa-star'/>
            <progress value='5' max='5'/>
            </span>
            <p>(9)</p>
        </div>

        <div className='reviewscore'>
            <p>4</p>
            <span><i className='fa fa-star'/>
            <progress value='4' max='5'/>
            </span>
            <p>(7)</p>
        </div>

        <div className='reviewscore'>
            <p>3</p>
            <span><i className='fa fa-star'/>
            <progress value='3' max='5'/>
            </span>
            <p>(4)</p>
        </div>

        <div className='reviewscore'>
            <p>2</p>
            <span><i className='fa fa-star'/>
            <progress value='2' max='5'/>
            </span>
            <p>(2)</p>
        </div>

        <div className='reviewscore'>
            <p>1</p>
            <span><i className='fa fa-star'/>
            <progress value='1' max='5'/>
            </span>
            <p>(4)</p>
        </div>
        

    </div>
</div>



<div className='commentCon'>
<div className='reviewsdetailscon'>
    <div className='reviewsdetails'>
   <p>by Mary Obi</p>
   <p>10-06-2022</p>
   </div>

   <div className='reviewsratings'><Ratings value={3}/></div>

   <div className='reviewscoments'>
    <p>It stain the body and cloth,it bring out permanent spot on the cloth 
        until is washed</p>
   </div>
</div>

<div className='reviewsdetailscon'>
    <div className='reviewsdetails'>
   <p>by Mary Obi</p>
   <p>10-06-2022</p>
   </div>

   <div className='reviewsratings'><Ratings value={3}/></div>

   <div className='reviewscoments'>
    <p>It stain the body and cloth,it bring out permanent spot on the cloth 
        until is washed</p>
   </div>
</div>

<div className='reviewsdetailscon'>
    <div className='reviewsdetails'>
   <p>by Mary Obi</p>
   <p>10-06-2022</p>
   </div>

   <div className='reviewsratings'><Ratings value={3}/></div>

   <div className='reviewscoments'>
    <p>It stain the body and cloth,it bring out permanent spot on the cloth 
        until is washed</p>
   </div>
</div>
<div className='reviewsdetailscon'>
    <div className='reviewsdetails'>
   <p>by Mary Obi</p>
   <p>10-06-2022</p>
   </div>

   <div className='reviewsratings'><Ratings value={3}/></div>

   <div className='reviewscoments'>
    <p>It stain the body and cloth,it bring out permanent spot on the cloth 
        until is washed</p>
   </div>
</div>


<div className='reviewsdetailscon'>
    <div className='reviewsdetails'>
   <p>by Mary Obi</p>
   <p>10-06-2022</p>
   </div>

   <div className='reviewsratings'><Ratings value={4}/></div>

   <div className='reviewscoments'>
    <p>It stain the body and cloth,it bring out permanent spot on the cloth 
        until is washed</p>
   </div>
</div>

<div className='reviewsdetailscon'>
    <div className='reviewsdetails'>
   <p>by Mary Obi</p>
   <p>10-06-2022</p>
   </div>

   <div className='reviewsratings'><Ratings value={1}/></div>

   <div className='reviewscoments'>
    <p>It stain the body and cloth,it bring out permanent spot on the cloth 
        until is washed</p>
   </div>
</div>
</div>


</div>

</div>


</div>
        </>
    )
}