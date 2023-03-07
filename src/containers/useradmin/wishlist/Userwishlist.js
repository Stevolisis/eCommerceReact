import { useEffect } from 'react';
import {React} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setRedirectPath } from '../../../Redux/Auth/userAuthForm';
import { fetchWishlist, getWishList, removeWishlist } from '../../../Redux/UserDashboard/wishlist';

export default function Userwishlist(){
  const dispatch=useDispatch();
  const location=useLocation();
  const wishlists=useSelector(getWishList);
  const navigate=useNavigate();

console.log('yy',wishlists)
  const deleteitem=((id)=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removeWishlist(id))
          .then(res=>{
            console.log(res)
            if(res.payload.data.status!=='success'){
                // dispatch(setRedirectPath('/auth/login?next='+location.pathname))            
            }
          })
        }
      })
   });


  useEffect(()=>{
    dispatch(fetchWishlist())
    .then(res=>{
      if(res.payload.status!=='success'){
          dispatch(setRedirectPath('/auth/login?next='+location.pathname))            
      }
    })
  },[])


    return(
        <>
          <div className='usermaincon'>
        <div className='userorderheading'><p>Wishlist ({wishlists&&wishlists.length})</p></div>
        <div className='userorderscon'>

          {
            !wishlists ? <div className='overview'><div className='overviewdetails'>Your Wishlist is empty</div></div> 
            :
            wishlists.map((wishlist,i)=>{
              return <div className='userorder' key={i}>
              <div className='userorderimg'><img src={wishlist.img_link} alt='UserOrderImg'/></div>
              <div className='savediteminfo'>
              <div className='savedinfo1'>
              <p>{wishlist.name}</p>
              <div className='saveditemprice'><span>Price: N{wishlist.sale_price}</span><span>N{wishlist.regular_price}</span></div>
              <p>-{(wishlist.regular_price-wishlist.sale_price)/100}%</p>
              </div>
              <div className='savedinfo2'>
              
              <div className='savedinfobtn1'><button onClick={()=>navigate(wishlist.slug)}>View</button></div>
              <div className='savedinfobtn2'><button onClick={()=>deleteitem(wishlist._id)}>Remove</button></div>
              
              </div>
              </div>
              </div>

            })
          }
      
              </div>
              </div>        
        </>
    )
}