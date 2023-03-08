import { React} from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { getAllUsers } from '../../Redux/Admin/users';

export default function UsersList({deleteuser}){
    const users=useSelector(getAllUsers);

    const userLists=users.map((user,i)=>{
        let {_id,first_name,last_name,email,phone_number,orders,wishlist,createdAt,verified,status}=user;
        return(           
            <tr key={i}>
            <td>{first_name+' '+last_name}</td>
            <td>{email}</td>
            <td>{phone_number}</td>
            {/* <td>{orders.length===0 ? 0 : orders}</td>
            <td>{wishlist.length===0 ? 0 : wishlist}</td> */}
            <td>{verified===true ? 'true' : 'false'}</td>
            <td>{createdAt.split('T')[0]}</td>
            <td><Link to={`/admin/edituser/${_id}`}><i className='fa fa-edit'/></Link></td>
            <td><button onClick={()=>deleteuser(_id)}>Delete</button></td>
            <td>{status}</td>
            </tr>
        )
     });





     
    return(
        <>
            <tbody>
            <tr><th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Orders</th>
            <th>WishList</th>
            <th>Verified</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Status</th>
            </tr>

            {userLists}

            </tbody>
        </>
    )
}