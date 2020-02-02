import React, { Component } from 'react';
import HeaderHome from '../components/header';
import FooterHome from '../components/footer';
import {url} from '../ApiUrl/urlapi';
import { Button} from 'react-bootstrap';
import Axios from 'axios';
import {Modal,ModalBody, ModalFooter} from 'reactstrap';
import play from '../img/play.png';
import imgdirector from '../img/Download-Clapperboard-PNG-Picture.png';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class MovieDetail extends Component {
    state = { 
        detaildatamovie:{},
        modaltrailer:false,
        notloginyet: false,
        kelogin: false,
        keregister:false,
        belitiketok: false
    
     }

    componentDidMount(){
       
        Axios.get(`${url}movies/${this.props.match.params.id}`)
        .then((res)=>{
            this.setState({detaildatamovie:res.data});
        }).catch((err)=>{
            console.log(err)
        })
    }

    onBeliTiketClick = () => {
        if (this.props.AuthLog) {
            this.setState({ belitiketok: true })
        } else {
            this.setState({ notloginyet: true })
        }
    }
   
    render() { 
        if (this.state.kelogin) {
            return <Redirect to={'/login'} />
        } 
        if (this.state.keregister) {
            return <Redirect to={'/register'} />
        } 
        if (this.state.belitiketok) {
            return <Redirect to={{ pathname: '/belitiket', state: this.state.detaildatamovie }} />
        }

        return ( 

            
            <div>
            <Modal isOpen={this.state.notloginyet} centered toggle={() => this.setState({ notloginyet: false })}>
                <ModalBody>
                    Silahkan Login atau Register dulu untuk membeli Tiket.
                </ModalBody>
                <ModalFooter>
                    <Button className='info' onClick={() => this.setState({ kelogin: true })}>LOGIN</Button>
                    <Button variant="danger" onClick={() => this.setState({ keregister: true })}>REGISTER</Button>


                </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modaltrailer} toggle={()=>this.setState({modaltrailer:false})} size='xl' centered>
            <div>
            
            </div>
            <iframe width="100%" height="590px" src={this.state.detaildatamovie.trailer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
            </Modal>

                <HeaderHome/>
                <div style={{
                    backgroundImage :  `url(` + `${this.state.detaildatamovie.imgHeader}` + `)` ,
                    backgroundSize: 'cover',
            
                      backgroundPosition: 'center center',
                      display: 'block',
                      height: '400px',
                      width: '100%',
                      margin: '0 auto',
                      objectFit: 'cover',
                    marginBottom: '400px'
                }} className='bgheadermoviedetail darken'>
                
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 imgplay'>
                        <center><img onClick={()=>this.setState({modaltrailer:true})} src={play} height='70px'/>
                        </center>

                        </div>
                    </div>

                    <div className='row moviedetail'> 
                        <div className='col-md-4'>
                            <img src={this.state.detaildatamovie.image} height='500px'/>
                            
                        </div>
                        <div className='col-md-8 judltitle' >
                            
                            <h2>{this.state.detaildatamovie.title}</h2>
                            
                            <h4>{this.state.detaildatamovie.genre}</h4>
                            <div>
                                <h3><u>Sinopsis :</u></h3>
                                <p>{this.state.detaildatamovie.sinopsis}</p>
                                <p><i>{this.state.detaildatamovie.durasi} Minutes</i></p>
                            </div>

                            <div className=' director'>
                            <img src={imgdirector} height='40px'></img>
                            <h6>{this.state.detaildatamovie.sutradara}</h6>
                                
                            </div>
                            
                            {this.props.roleUser==='user'?
                            ''
                            :
                            null
                            } 
                            {
                            this.props.roleUser==='admin'?
                            null
                            :
                            
                            <Button onClick={this.onBeliTiketClick} variant="outline-primary">Buy Ticket</Button>
                            
                            }
                           

                        </div>
                    </div>
                </div>
                </div>

                <FooterHome/>
                
               
            </div>
         );
    }
}
 
const MapstateToprops = (state) => {
    return {
        AuthLog: state.Auth.login,
        roleUser: state.Auth.role
    }
}
export default connect(MapstateToprops)(MovieDetail)