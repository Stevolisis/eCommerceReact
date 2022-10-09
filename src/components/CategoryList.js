import React from 'react'
import { Link } from 'react-router-dom';

export default function CategoryList({deletecateg,categs}) {

     const categoryLists=categs.map((category,i)=>{
        let {_id,img_link,name,slug,product,createdAt,status}=category;
        return(
            <tr key={i}>
            <td><img src={img_link} alt={name}/></td>
            <td>{name}</td>
            <td>{slug}</td>
            <td>{product}</td>
            <td>{createdAt.split('T')[0]}</td>
            <td><Link to={`/admin/editcategory/${_id}`}><i className='fa fa-edit'/></Link></td>
            <td><button onClick={()=>deletecateg(_id)}>Delete</button></td>
            <td>{status}</td>
            </tr>
        )
     })


  return (
            <tbody>

            <tr>
            <th>Img</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Products</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Status</th>
            </tr>

            {categoryLists}

           </tbody>
  )
}
