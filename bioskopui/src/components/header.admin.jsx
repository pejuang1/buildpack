import React from 'react';
import {Navbar, Nav, Form,  Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import imglogo from '../img/logo.png' 


const HeaderAdmin = (props) => {
        return ( 
            <div className="navbar-atas">
            <Navbar className='bg-navbar' variant="dark">
            <div className='container'>
            <div className='logoimg'>
            <a href='/'><img src={imglogo} height='50px'/></a>
            <h4>MoviesBook</h4> 
            </div>
            <Form inline>
            <Nav.Link href='/managestudio'><Button variant='dark' onClick={()=>onSignOutClick()} className='mr-2'>Manage Studio</Button></Nav.Link>
            
             <Nav.Link href='/'><Button variant='dark' onClick={()=>onSignOutClick()}>Logout</Button></Nav.Link>
              
            </Form>
            </div>
          </Navbar>

            </div>

        
         );
    }


    const onSignOutClick=()=>{
      localStorage.clear()
      window.location.reload()
    }
    
    const MapstateToprops=(state)=>{
      return{
          namauser:state.Auth.username
    
      }
    }
    export default connect(MapstateToprops) (HeaderAdmin);