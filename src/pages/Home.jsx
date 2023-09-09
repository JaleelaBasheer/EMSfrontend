import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hometable from '../components/Hometable'
import LoadingSpinner from '../components/LoadingSpinner'
import { getAllUser,deleteUser } from '../services/allAPIs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from 'react-bootstrap'
import { deleteContext, registerContext ,updateContext} from '../components/ContextShare'

function Home() {

  const {updateData,setupdateData} = useContext(updateContext)
  const {registerData,setRegisterData} = useContext(registerContext)
  const {deleteData,setDeleteData}=  useContext(deleteContext)
  const [showSpin,setshowSpin] =useState(true)
  const [allUsersData,setAllUsersData] = useState([])
  const [search,setSearch] = useState("")
  const getallEmployess = async ()=>{
    const response = await getAllUser(search)
    if(response.status===200){
      setAllUsersData(response.data);
    }
    else{
      toast.error("Cannot fetch data!!!")
    }

  }

  const removeUser = async(id)=>{
    const response = await deleteUser(id)
    if(response.status===200){
      getallEmployess()
      setDeleteData(response.data);
    }
    else{
      toast.error("Cannot delete data!!!")
    }
  }
  

  useEffect(()=>{
    getallEmployess()
    setTimeout(()=>{
      setshowSpin(false);
    },2000);
  },[search]);
  return (
    <>
     {
      registerData&&<Alert variant='success' onClose={()=>setRegisterData("")} dismissible>
        {registerData.fname.toUpperCase()} registered successfully...
      </Alert>
    }
     {
      deleteData&&<Alert variant='danger' onClose={()=>setDeleteData("")} dismissible>
        {deleteData.fname.toUpperCase()} deleted successfully...
      </Alert>
    }
    {
      updateData&&<Alert variant='success' onClose={()=>setupdateData("")} dismissible>
        {updateData.fname.toUpperCase()} updated successfully...
      </Alert>
    }
    {
      showSpin?(
      <LoadingSpinner/> 
      ):(
    <div className="container mt-5">
        <div className="search-all d-flex">
            <div className="search d-flex align-items-center">
              <span className='fw-bolder'>Search:</span>  
                <input type="text" style={{width:'400px'}} placeholder='Search by Employee name' className='form-control ms-3' onChange={e=>setSearch(e.target.value)} />
            </div>
            <Link to={'/add'} className="btn btn-warning ms-auto"><i className="fa-solid fa-user-plus"></i>Add</Link>

        </div>
        <div className="table mt-3">
            <h1>List of all employees</h1>
            <Hometable displayData={allUsersData} removeUser={removeUser}/>
        </div>
    </div>
    
    )}

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

export default Home
// import React, { useContext, useEffect, useState } from 'react'
// import { Await, Link } from 'react-router-dom'
// import Hometable from '../components/Hometable'
// import Loadingspinner from '../components/LoadingSpinner'
// import { Alert } from 'react-bootstrap'
// import { deleteContext, registerContext } from '../components/ContextShare'
// import { getAllUser, deleteUser } from '../services/allAPIs'
// import { ToastContainer, toast } from "react-toastify";


// function Home() {
//   const {deleteData,setDeleteData} =useContext(deleteContext)
//   const{registerData,setRegisterData} = useContext(registerContext)

//   const [showSpin,setShowSpin] = useState(true)
//   const [allUsersData,setAllUsersData]= useState([])
//   const [search,setSearch]=useState("")

//   const getallEmployees = async ()=>{
//     const response = await getAllUser(search)
//     if(response.status===200){
//       setAllUsersData(response.data);
//     }else{
//       toast.error("cannot fech data!!!");
//     }
//   }

//    const removeUser = async (id)=>{
//     const response = await deleteUser(id)
//     if(response.status===200){
//       getallEmployees()
//       setDeleteData(response.data)
//     }else{
//       toast.error("Operation Failed!!! Please try after sometime...")
//     }
//    }
//   useEffect(()=>{
//     getallEmployees()
//     setTimeout(() => {
//       setShowSpin(false)
//     }, 2000);
//   },[search])
//   return (
//     <>
//     {
//       deleteData&&<Alert variant='danger' onClose={()=>setDeleteData("")} dismissible>
//         {deleteData.fname.toUpperCase()} removed successfully...
//       </Alert>
//     }
//     {
//       registerData&&<Alert variant='success' onClose={()=>setRegisterData("")} dismissible>
//         {registerData.fname.toUpperCase()} registered successfully...
//       </Alert>
//     }
//     {showSpin ? (
//     <Loadingspinner></Loadingspinner>
//     ) : (
//         <div className="container mt-5 ">
//            <div className='search-all d-flex align-items-center'>
//                 <div className="search d-flex align-items-center">
//                     <span className='fw-bolder'>Search:</span>
//                     <input type="text" style={{width:'400px'}} 
//                     placeholder='Search Employee By Name' className='form-control ms-3'
//                     onChange={e=>setSearch(e.target.value)} />
//                 </div>
//                 <Link to={'/add'} className='btn btn-warning ms-auto'>
//                     <i className='fa-solid fa-user-plus'></i>Add</Link>
//            </div>

//             <div className="table">
//                 <h1>List Of Employees</h1>
//                 <Hometable displayData={allUsersData} removeUser={removeUser}/>
//             </div>
//         </div>
//         )}
//               <ToastContainer position="top-center" />
//     </>
//   )
// }

// export default Home