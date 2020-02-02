import React, { Component } from 'react';
import FooterHome from '../components/footer';
import HeaderHome from '../components/header';
import {Form,Button} from 'react-bootstrap';
import {GantiPassword} from '../redux/action/AuthActions';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import {url} from '../ApiUrl/urlapi';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';

class SettingUser extends Component {
    state = { 
        kehome: false
     }

    
  componentDidMount() {
    console.log(this.props.usernamelog);
  }

  handleChangePassClick = () => {
    var passwordlama = this.refs.passwordlama.value;
    var passwordbaru = this.refs.passwordbaru.value;
    var password = this.refs.konfirmasipassword.value;
    var updatePass = {
        password,
      username: this.props.usernamelog,
      role: this.props.role
    };
    console.log(updatePass);
    if (passwordlama === "" || passwordbaru === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password Gaboleh Kosong!"
      });
    } else if (passwordlama === passwordbaru) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password Baru tidak boleh sama dgn password lama"
      });
    } else if (passwordlama !== this.props.passuser) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password yang anda masukkan salah"
      });
    } else if (passwordbaru !== password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password baru sama konfirmasi musti sama"
      });
    } else {
      Axios.put(`${url}users/${this.props.userid}`, updatePass)
        .then(res => {
          // console.log(res.data);
          Swal.fire({
            title: "Anda Yakin?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Ora Sido",
            confirmButtonText: "Sangat Yakin"
          }).then(result => {
            if (result.value) {
              this.props.GantiPassword(res.data);
              this.setState({ kehome: true });
              Swal.fire({
                title: "Mantap.. Password telah terganti.",
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };



    render() { 

        if (this.state.kehome || this.props.userlog === false) {
            return <Redirect to="/" />;
          }
        return ( 
            <div>
                <HeaderHome/>
                <div style={{marginBottom:'220px'}} className='container'>
                    <h2 style={{textAlign:'center', paddingTop:'50px'}}>Silahkan Ganti Password</h2>
                  <center>
                  <div className='settinguser'>
                  <Form.Group style={{textAlign:'center'}} controlId="formBasicPassword">
                  <Form.Label style={{fontWeight:'bold'}}>Username</Form.Label>
                  <Form.Control style={{textAlign:'center'}} type="text"   defaultValue={this.props.usernamelog}
                  ref="user" disabled/>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                   <Form.Control style={{textAlign:'center'}} type="password" ref='passwordlama' placeholder="Ketik Password Lama" />
                   </Form.Group>
                   <Form.Group controlId="formBasicPassword">
                   <Form.Control style={{textAlign:'center'}} type="password" ref='passwordbaru' placeholder="Ketik Password Baru" />
                   </Form.Group>
                   <Form.Group controlId="formBasicPassword">
                   <Form.Control style={{textAlign:'center'}} type="password" ref='konfirmasipassword' placeholder="Konfirmasi Password Baru" />
                   </Form.Group>
                   

                   <Button onClick={this.handleChangePassClick}  variant="danger" >
                   Submit 
                   </Button>
                  </div>
                  </center>
                </div>
                <FooterHome/>
            </div>
         );
    }
}


const MapstateToprops = state => {
    return {
      usernamelog: state.Auth.username,
      userlog: state.Auth.login,
      userid: state.Auth.id,
      passuser: state.Auth.password,
      role: state.Auth.role
    };
  };
  
  export default connect(MapstateToprops, { GantiPassword })(SettingUser);
 
