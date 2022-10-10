import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../Redux/Admin/products/productList';

export default function ProductList({deleteproduct,products}) {
  const productsli=useSelector(getAllProducts);
  console.log("productsli",productsli)
    const productLists=products.map((product,i)=>{
        let {_id,img_gallery,name,SKU,category,stock,sale_price,sold,createdAt}=product;
       let categoryCon=[];
       category.forEach(categ=>{
        categoryCon.push(categ.name)
       })

        return(
        <tr key={i}>
        <td><img src={img_gallery[0]} alt={name}/></td>
        <td>{name}</td>
        <td>{stock}</td>
        <td>{sale_price}</td>
        <td style={{width:'150px',maxWidth:'150px'}}>
        <div style={{overflowX:'auto',whiteSpace:'nowrap'}}>
          {categoryCon.map(categ=>{
          return categ+', '
        })}
        </div>
        </td>
        <td>{sold}</td>
        <td>{createdAt.split('T')[0]}</td>
        <td><Link to={`/admin/editproduct/${_id}`}><i className='fa fa-edit'/></Link></td>
        <td><button onClick={()=>deleteproduct(_id)}>Delete</button></td>
        </tr>
        )
    })


return (
<tbody>

<tr>
<th>Img</th>
<th>Name</th>
<th>Stock</th>
<th>Price</th>
<th>Categories</th>
<th>Sold</th>
<th>Date</th>
<th>Edit</th>
<th>Delete</th>
</tr>

{productLists}

</tbody>
  )
}
