import React, { useState,useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useParams} from 'react-router-dom'
import { getAllUser } from '../services/allAPIs';
import { BASE_URL } from '../services/base_url';


function View() {
  const {id} = useParams()
  console.log(id);
  const[user,setUser]= useState({})

  const getUser = async ()=>{
    const {data}=await getAllUser("")
   setUser(data.find(item=>item._id===id)); 
  }
  useEffect(()=>{
    getUser()
    setTimeout(()=>{
      
    },2000);
  },[]);
  return (
    <>
    <div style={{height:'80vh'}} className="container">
      {user?
        <Card className='shadow col-lg-6 mx-auto mt-5'>
        <div className="image text-center">
        <img style={{width:'120px',height:'120px',borderRadius:'50%'}} src={`${BASE_URL}/uploads/${user.profile}`} alt="" />

        </div>
        <div className="text-center mt-3">
          <h3>{user.fname}{user.lname}</h3>
          <h5>Email:{user.email}</h5>
          <h5>Mobile:{user.mobile}</h5>
          <h5>Gender:{user.gender}</h5>
          <h5>Status:{user.status}</h5>
          <h5>Location:{user.location}</h5>



          </div>

      </Card>:""
      }

    </div>
    
    </>
  )
}

export default View