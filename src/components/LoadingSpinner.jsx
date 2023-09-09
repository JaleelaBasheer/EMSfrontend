import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <div className='d-flex justify-content-center align-items-center m-5 fw-bolder'>
        <Spinner animation="grow"  variant='dark' className='me-2'/>Loading...
    </div>
  )
}

export default LoadingSpinner