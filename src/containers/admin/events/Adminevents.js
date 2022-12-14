import {React, useEffect, useState, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ReactSortable } from "react-sortablejs";
import api from '../../../Utils/axiosConfig';

export default function Admineventcoupon(){
    const navigate=useNavigate();
    const [order, setOrder] = useState([]);
    const cancelalert=useRef(true)


       const deletespec2=((id)=>{
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
              let formData=new FormData();
              formData.append('id',id)
              api.post('events/delete-event',formData)
              .then(res=>{
                let status=res.data.status;
                  if(status==='success'){
                    Swal.fire(
                      'Deleted!',
                      'Event Deleted.',
                      'success'
                    )
                    loadEvents();
                  }else{
                    Swal.fire(
                      'Error Occured',
                      status,
                      'warning'
                    )
                  }
              }).catch(err=>{
                Swal.fire(
                  'Error Occured',
                  err.message,
                  'error'
                )
              })
            }
          })
       })


      //  function move(array, from, to) {
      //   if( to === from ) return array;
      
      //   var target = array[from];                         
      //   var increment = to < from ? -1 : 1;
      
      //   for(var k = from; k !== to; k += increment){
      //     array[k] = array[k + increment];
      //   }
      //   array[to] = target;
      //   return array;
      // }


      const loadEvents=()=>{
        api.get('events/get-events')
        .then(res=>{
          let status=res.data.status;
          let data=res.data.data;
            if(status!=='success'){
                Swal.fire(
                    'Error Occured',
                    status,
                    'warning'
                  )
            }else{
              let eventOrder=[];
               data.forEach(event=>{
                eventOrder.push({id:event._id,title:event.title,type:event.type,status:event.status})
               })
              setOrder(eventOrder)
            }
        }).catch(err=>{
            Swal.fire(
                'Error At api2!',
                err.message,
                'error'
              )
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
          api.post('events/reorder-events',{order:order})
          .then(res=>{
            let status=res.data.status;

            if(status==='success'){
                Swal.fire(
                  'Reordered!',
                  'Layout Reordered.',
                  'success'
                )
              }else{
                Swal.fire(
                  'Error Occured',
                  status,
                  'warning'
                )
              }
          }).catch(err=>{
            Swal.fire(
              'Error Occured',
              err.message,
              'error'
            )
          })
        }
      })    }



      useEffect(()=>{
        if(cancelalert.current){
          cancelalert.current=false;
        loadEvents();
        }
      },[])




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

          <ReactSortable tag="tbody" list={order} setList={setOrder} handle='.handler'>
          {order.map((item) => (
          <tr key={item.id} >
            <td className='handler' style={{cursor:"grab",textAlign:'center'}}><i className='fa fa-bars'/></td>
            <td>{item.title}</td>
            <td>{item.type}</td>
            <td><Link to={`/admin/editevent/${item.type}-${item.id}`}><i className='fa fa-edit'/></Link></td>
            <td><button onClick={()=>deletespec2(item.id)}>Delete</button></td>
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