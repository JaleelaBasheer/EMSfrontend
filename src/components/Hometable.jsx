import React from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/base_url';

function Hometable({displayData,removeUser}) {
  console.log(displayData);
  return (
    <div>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Status</th>
          <th>Profile</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
        {
          displayData.length>0?displayData.map((item,index)=>(
            <tr>
          <td>{index+1}</td>
          <td>{item.fname} {item.lname}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
          <td><button className={item.status==="Active"?"btn btn-success":"btn btn-danger"}>{item.status}</button></td>
          <td><img style={{width:'100px',height:'100px',borderRadius:'50%'}} src={`${BASE_URL}/uploads/${item.profile}`} alt="profile" /></td>
          <td>
            {/* view */}
            <Link to={`/view/${item._id}`}><i className="fa-solid fa-eye text-warning  fs-4 me-2"></i> </Link>         
            {/* edit */}
            <Link to={`/edit/${item._id}`}>
            <i  className="fa-solid fa-pen text-primary fs-4"></i></Link>
            {/* delete */}
           
           <i onClick={()=>removeUser(item._id)} className="fa-solid fa-trash text-danger ms-2 fs-4 "></i>
          </td>

        </tr>

          )):
          <tr className='mt-5 w-100 text-danger ps-5 fs-3'>
            Nothing to display!!!
          </tr>
        }
        
       
      </tbody>
    </Table>
    </div>
  )
}

export default Hometable