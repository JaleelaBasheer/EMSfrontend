import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function Header() {
  return (
<Navbar >
        <Container>
        <Link to={'/'} style={{textDecoration:'none'}}>
          <Navbar.Brand >
            <i className="fa-solid fa-layer-group fa-flip me-2"></i>
            EMS Application
          </Navbar.Brand>
          </Link>
        </Container>
      </Navbar>

  )
}


export default Header