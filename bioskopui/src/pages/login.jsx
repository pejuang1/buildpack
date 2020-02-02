import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import {url} from '../ApiUrl/urlapi';
import {connect} from 'react-redux';
import {LoginSuccessAction} from '../redux/action';


class LoginPage extends Component {
    state = { 
        error:'',
        loading:false
     }

    onLoginClick=(e)=>{
      e.preventDefault()
      var username=this.refs.username.value
      var password=this.refs.password.value
      Axios.get(`${url}users?username=${username}&password=${password}`)
      .then(res=>{
          if(res.data.length){
              localStorage.setItem('dino',res.data[0].id)
              this.props.LoginSuccessAction(res.data[0])
              window.location.reload()
          }else{
              this.setState({error:'Password is not match'})
          }
      }).catch((err)=>{
          console.log(err)
      })
  }

    render() { 

      if(this.props.AuthLog){
        return <Redirect to={'/'}/>
    } 

        return ( 
            <div className=' loginpage'> 

           <Container>

           <div className='judullogin'><h2>Welcome Back, Please Login</h2></div>
           <Row>
            <Col className="col-md-6">
            <div ><a href='/'><img src={'http://essayden.com/wp-content/uploads/2017/12/movies.jpg'} height='300px' width='550px' /></a></div>
            </Col>
            <Col className="col-md-6">
            <Form onSubmit={this.onLoginClick}>
                <Form.Group  controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control ref='username' type="text" placeholder="Enter username" />
                </Form.Group>
              
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control ref='password' type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                  <Link to='/register'>Create Account</Link>
                </Form.Group>

                {this.state.error===''?
                null
                :
                <div className="alert alert-danger mt-2">
                    {this.state.error} <span onClick={()=>this.setState({error:''})} className='float-right font-weight-bold'>X</span>
                </div>
        
                }
                <center><Button onClick={this.onLoginClick} variant="primary" type='submit'> LOGIN </Button></center>
          </Form>
          
          </Col>
          </Row>
            
           
           
           </Container>
            
            </div>
         );
    }
}
 
const MapstateToprops=(state)=>{
  return{
      AuthLog:state.Auth.login
  }
}


export default connect(MapstateToprops,{LoginSuccessAction}) (LoginPage);