import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {url} from '../ApiUrl/urlapi';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';


class RegisterPage extends Component {
    state = { 
      kelogin:false
    }


  onClickRegister = (e) => {
      e.preventDefault()
      var username = this.refs.username.value;
      var password = this.refs.password.value;
      var repassword = this.refs.repassword.value;
      var role = "user";
      var newUser = { username, password, role };
      if (username === "" || password === "" || repassword === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data Gaboleh Ada Yang Kosong!"
        });
      } else {
        Axios.get(`${url}users?username=${username}`)
          .then(res1 => {
            console.log(res1);
            if (res1.data.length === 0) {
              if (password !== repassword) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Password must match"
                });
              } else {
                Axios.post(`${url}users`, newUser)
                  .then(res => {
                    Swal.fire({
                      icon: "success",
                      title: "Success!",
                      text: "Your are success Registered! Please Login"
                    });
                    this.setState({ kelogin: true });
                    
                  })
                  .catch(err1 => {
                    console.log(err1);
                  });
              }
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `"${username}" is not Available, Try Using Another Username :`
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
  


    render() { 
      if (this.state.kelogin) {
        return <Redirect to={'/login'} />
      }
        return ( 
            <div className=' loginpage'> 

           <Container>

           <div className='judullogin'><h2>Welcome, Please Register</h2></div>
           <Row>
            
            <Col className="col-md-6">
            <Form onSubmit={this.onClickRegister}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" ref='username' placeholder="Enter Username" />
             
            </Form.Group>
          
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref='password' placeholder="Enter Password" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Re-Enter Password</Form.Label>
              <Form.Control type="password" ref='repassword' placeholder="Enter Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
             <Link to='/login'>Already have account?</Link>
            </Form.Group>

            <Button  onClick={this.onClickRegister} variant="primary" type="submit">
            Register 
            </Button>
          </Form>
          
          </Col>
          <Col className="col-md-6">
            <div><a href='/'><img src={'http://essayden.com/wp-content/uploads/2017/12/movies.jpg'} height='300px' width='550px' /></a></div>
            </Col>
          </Row>
            
           </Container>
            
            </div>
         );
    }
}
 
export default RegisterPage;