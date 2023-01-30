import {React, useEffect, useState, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ReactSortable } from "react-sortablejs";
import api from '../../../Utils/axiosConfig';
import { fetchEvents, deleteEvent, reorderEvent, getEvents } from '../../../Redux/Admin/events';
import { useDispatch, useSelector } from 'react-redux';

export default function Admineventcoupon(){
    const navigate=useNavigate();
    const [order, setOrder] = useState([]);
    const cancelalert=useRef(true)
    const dispatch=useDispatch();
    const events=useSelector(getEvents);


    const delete_event=((id)=>{
      Swal.fire({
          title: 'Are you sure?',
          text: "Confirm Action On Event",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#5972b9',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it!'
          }).then((result) => {
          if (result.isConfirmed) {
              dispatch(deleteEvent(id))
              loadEvents();
                
          }
      });
  })


      const loadEvents=()=>{
        dispatch(fetchEvents())
        .then(order2=>{
          let eventOrder=[];
          order2.payload.forEach(event=>{
            eventOrder.push({id:event._id,name:event.name,title:event.title,type:event.type,status:event.status})
           })
          setOrder(eventOrder)
        })
      }


    function saveSortedArr(){
        Swal.fire({
        title: 'Please Confirm',
        text: "Action will change the layout arrangment of your hompage",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Reorder it!'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(reorderEvent(order));
        }
      })    
    }



      useEffect(()=>{
        if(cancelalert.current){
          cancelalert.current=false;
        }
      },[])

      useEffect(()=>{
        loadEvents();
      },[dispatch]);


    return(
        <>
        
        <div className='admindashcon'>
        <div className='userorderheading'>
            <p>Events</p>
            <button onClick={()=>navigate('/admin/addevent')}>ADD NEW</button>
            </div>
        <div className='admincategcon'>
            <div className='adminstat3con'>
        <div className='adminstat3'>
            <div className='adminstat3info2'>



            <table>
            <tbody>

            <tr>
            <th>Arrange</th>
            <th>Title</th>
            <th>Type</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Status</th>
            </tr>
</tbody>

          <ReactSortable tag="tbody" list={order} setList={setOrder} handle='.handler' onChange={console.log()}>
          {order.map((item) => (
          <tr key={item.id} >
            <td className='handler' style={{cursor:"grab",textAlign:'center'}}><i className='fa fa-bars'/></td>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td><Link to={`/admin/editevent/${item.type}-${item.id}`}><i className='fa fa-edit'/></Link></td>
            <td><button onClick={()=>delete_event(item.id)}>Delete</button></td>
            <td>{item.status}</td>
          </tr>
          ))}
          </ReactSortable>

            

            {/* </tbody> */}
            </table>
            </div>
        </div>
        <div className='adminmorebtn'>
            <button onClick={saveSortedArr}>Save</button>
        </div>
        </div>

        </div>


        </div>
        </>
    )
}