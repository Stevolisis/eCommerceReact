import {React, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ReactSortable } from "react-sortablejs";

export default function Admineventcoupon(){
    const navigate=useNavigate();
    const [state, setState] = useState([
      { id: 1, title: "Main Banner",banner_color: "Crimson",date:"10/6/2022",products: 12, sold:3},
      { id: 2, title: "Special Category",banner_color: "orangered",date:"10/6/2022",products: 3, sold:1},
      { id: 3, title: "Brand Slider",banner_color: "dodgerblue",date:"10/6/2022",products: 32, sold:22},
      { id: 4, title: "Ketchen Listen",banner_color: "brickred",date:"10/6/2022",products: 19, sold:10},
      { id: 5, title: "I phone Ads Banner",banner_color: "violet",date:"10/6/2022",products: 55, sold:44}
    ]);
    // const sortedArray=Array.from(state);
    const [sortedArray, setsortedArray] = useState(state);


       const deletespec2=(()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Coupon Deleted.',
                'success'
              )
            }
          })
       })


       function move(array, from, to) {
        if( to === from ) return array;
      
        var target = array[from];                         
        var increment = to < from ? -1 : 1;
      
        for(var k = from; k !== to; k += increment){
          array[k] = array[k + increment];
        }
        array[to] = target;
        return array;
      }


      useEffect(()=>{
        // console.log(state)
      },[state])




    return(
        <>
        
        <div className='admindashcon'>
        <div className='userorderheading'>
            <p>Events</p>
            <button onClick={()=>navigate('/admin/addevent')}>ADD NEW</button>
            </div>
        <div className='admincategcon'>

            <div className='adminfilterscon'>
            <div className='adminfilters'>
                    <input type='text' placeholder='Search...'/>
                </div>
                <div className='adminfilters'>
                    <select>
                    <option defaultValue='All Category'>All Category</option>
                    <option>Phones</option>
                    <option>Shirts</option>
                    <option>Home Appliances</option>
                    <option>Underwears</option>
                    </select>
                    <select>
                    <option defaultValue='All Category'>Recent Added</option>
                    <option>High product</option>
                    <option>Desc</option>
                    <option>Home Appliances</option>
                    </select>
                </div>
            </div>



            <div className='adminstat3con'>
        <div className='adminstat3'>
            <div className='adminstat3info2'>



            <table>
            <tbody>

            <tr>
            <th>Arrange</th>
            <th>Title</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Status</th>
            </tr>
</tbody>

          <ReactSortable tag="tbody" list={state} setList={setState} handle='.handler'>
          {state.map((item) => (
          <tr key={item.id} >
            <td className='handler' style={{cursor:"grab",textAlign:'center'}}><i className='fa fa-bars'/></td>
            <td>{item.title}</td>
            <td><Link to='/admin/editcoupon/wdhfvj44'><i className='fa fa-edit'/></Link></td>
            <td><button onClick={()=>deletespec2()}>Delete</button></td>
            <td>{item.status}</td>
          </tr>
          ))}
          </ReactSortable>

            

            {/* </tbody> */}
            </table>
            </div>
        </div>
        <div className='adminmorebtn'>
            <button>See More</button>
        </div>
        </div>

        </div>


        </div>
        </>
    )
}