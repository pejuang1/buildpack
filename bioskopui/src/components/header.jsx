import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown,  Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import imglogo from '../img/logo.png';
import {FaAddressCard} from 'react-icons/fa';
import {TiShoppingCart} from 'react-icons/ti'




const HeaderHome = (props) => {
  
        return ( 
          
            <div className="navbar-atas">
            <Navbar className='bg-navbar' variant="dark">
            <div className='container'>
            <div className='logoimg'>
            <a style={{color:'black'}} href='/'><img src={imglogo} height='50px'/>
            <h4 className='logoawal'>MoviesBook</h4> </a>
            </div>
            
            <div>

            
            
            {props.namauser===''?
              <div>
              <Link to="/login"><Button className='buttonhead' variant="light" className="mr-3">Login</Button></Link>
              <Link to="/register"><Button variant="light">Register</Button></Link>
              </div>
              :
              null
            }
              {
                props.namauser===''?
                null
                :
            <div className='userkanan' >

            {props.roleUser==='admin'?
             
             <Link style={{paddingRight:'10px', color:'black'}} to='/admin'><Button variant='outline-dark'>Manage Admin</Button></Link>
             
              :
              null
            }  
            {props.roleUser==='admin'?
             
            <Link style={{paddingRight:'10px', color:'black'}} to='/managestudio'><Button variant='outline-dark'>Manage Studio</Button></Link>
            
             :
             null
           } 
            
            {
              props.roleUser==='user'?
            <Link style={{paddingRight:'10px', color:'black'}} to='/history'><Button variant='outline-dark'>History</Button></Link>
              
             
              :
              
              null
              
            }
            {
              props.roleUser==='user'?
              <Link to='/cart'><p><Button variant='outline-dark'><TiShoppingCart color='black' /><span>{props.carts}</span></Button></p></Link>
              :
              
              null
              
            }
               

                
            

                <p><FaAddressCard size="1.5em"  /><span> </span></p>
                <div style={{display:'inline-block'
             }}>
                
                <NavDropdown title={` ${props.namauser}`} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/settinguser">Setting</NavDropdown.Item>
                  <NavDropdown.Item href='/' onClick={()=>onSignOutClick()}>Logout</NavDropdown.Item>
                  
                </NavDropdown>
                </div>


                </div>
             
             }
             
             </div>
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
      namauser:state.Auth.username,
      roleUser:state.Auth.role,
      carts:state.Auth.cart
    

  }
}
export default connect(MapstateToprops) (HeaderHome);
