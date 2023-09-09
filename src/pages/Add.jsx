import React, { useState, useEffect, useContext } from 'react'
import { Card, Form,FloatingLabel, Row, Button } from 'react-bootstrap'
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser } from '../services/allAPIs';
import { registerContext } from '../components/ContextShare';
import { useNavigate } from 'react-router-dom';


function Add() {
  const {registerData,setRegisterData} = useContext(registerContext)
  const navigate = useNavigate()
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];
  const [showSpin,setshowSpin] =useState(true);

  const [normalUserInputs,setNormalUserInputs] = useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })

  const [status,setStatus] = useState("")
  const [profile,setProfile] = useState("")
  const [preview,setPreview] = useState("")

  const getandsetUserNormalInputs = (e)=>{
    const {name,value} = e.target
    setNormalUserInputs({...normalUserInputs,[name]:value})

  }
  console.log(normalUserInputs);
  console.log(status);
  console.log(profile);



  useEffect(()=>{
    if(profile){
      setPreview(URL.createObjectURL(profile))
    }
    setTimeout(()=>{
      setshowSpin(false);
    },2000);
  });

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {fname,lname,email,mobile,gender,location} = normalUserInputs

    if(!fname || !lname || !email || !gender || !location || !status || !profile){
      toast.warning("Please fill the form completely!!!!")
    }
    else{
    //  toast.success("Form Completed!!")

    const data = new FormData()
    data.append("fname",fname)
    data.append("lname",lname)
    data.append("email",email)
    data.append("mobile",mobile)
    data.append("gender",gender)
    data.append("status",status)
    data.append("profile",profile)
    data.append("location",location)
    
    const headers = {
      "Content-Type": "multipart/form-data"
    }
    // make api call
    const result = await addUser(data,headers)
    console.log(result);
    if (result.status===200){
      setNormalUserInputs({...normalUserInputs,
        fname:"",
        lname:"",
        email:"",
        mobile:"",
        gender:"",
        location:""
      })
      setStatus("")
      setProfile("")
      setRegisterData(result.data)
      navigate('/')
    }
    else{
      toast.error("Request Failed")
    }
    }
    }

  return (
    <>
    {
       showSpin?
       <LoadingSpinner/>:
      
<div className="container mt-5">
        <h1 className="text-center">
            Add New Employee 
        </h1>
    <Card className="shadow border rounded p-2 mt-3">
        <div className="image w-100% text-center">
            <img style={{width:'100px',height:'100px',borderRadius:'50%'}} src={preview?preview:"https://tse4.mm.bing.net/th?id=OIP.audMX4ZGbvT2_GJTx2c4GgHaHw&pid=Api&P=0&h=180"} alt="" />
        </div>
    <Form>
    <Row>
    <FloatingLabel controlId="floatingInputfname" label="First Name" className="mb-3 col-lg-6">
    <Form.Control type="text" placeholder="First Name" name="fname" value={normalUserInputs.fname} onChange={e=>getandsetUserNormalInputs(e)}/>
    </FloatingLabel>


    <FloatingLabel controlId="floatingInputlname" label="Last Name"  className="mb-3 col-lg-6">
    <Form.Control type="text" placeholder="Last Name" name="lname" value={normalUserInputs.lname} onChange={e=>getandsetUserNormalInputs(e)}/>
    </FloatingLabel>

    <FloatingLabel controlId="floatingInputemail" label="Email"  className="mb-3 col-lg-6">
    <Form.Control type="email" placeholder="Email" name="email" value={normalUserInputs.email} onChange={e=>getandsetUserNormalInputs(e)} />
    </FloatingLabel>

    <FloatingLabel controlId="floatingInputmobile" label="Mobile"  className="mb-3 col-lg-6">
    <Form.Control type="text" placeholder="Mobile" name="mobile" value={normalUserInputs.mobile} onChange={e=>getandsetUserNormalInputs(e)}/>
    </FloatingLabel>

    <Form.Group className="mb-3 col-lg-6">
        <Form.Label>Select Gender</Form.Label>
        <Form.Check
            
            type={"radio"}
            name="gender"
            value={"Male"}
            label={"Male"}
          onChange={e=>getandsetUserNormalInputs(e)}/>
        <Form.Check
            
            type={"radio"}
            name="gender"
            value={"Female"}
            label={"female"}
            onChange={e=>getandsetUserNormalInputs(e)}/>
          <Form.Check
                 type={"radio"}
                 name={"gender"}
                 value={"Other"}
                 label={"Other"}
                 onChange={e=>getandsetUserNormalInputs(e)} />
    </Form.Group>
    <Form.Group className="mb-3 col-lg-6">
        <Form.Label >Select Employee status</Form.Label>
        <Select
              options={options} onChange={e=>setStatus(e.value)}>
              </Select>  
    </Form.Group>

    <Form.Group className="mb-3 col-lg-6">
        <Form.Label >Choose profile pic</Form.Label>
        <Form.Control type="file" name ="user_profile" onChange={e=>setProfile(e.target.files[0])}>

        </Form.Control>
       
    </Form.Group>
    <Form.Group className="mb-3 col-lg-6">
        <Form.Label >Employee Location</Form.Label>
        <Form.Control type="text" placeholder='Location' name='location'value={normalUserInputs.location} onChange={e=>getandsetUserNormalInputs(e)}>

        </Form.Control>
       
    </Form.Group>
    <Button onClick={e=>handleSubmit(e)} type="submit" variant ="primary">Submit</Button>
    </Row>

    </Form>

    </Card>
</div>

}
<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light" />
    
    </>
  )
}

export default Add