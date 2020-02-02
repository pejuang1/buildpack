import React, { Component } from 'react';
import FooterHome from '../components/footer';
import HeaderHome from '../components/header'
import {Table,Modal, ModalBody,ModalHeader,ModalFooter} from 'reactstrap'
import {Button} from 'react-bootstrap'
import Axios from 'axios';
import {url} from '../ApiUrl/urlapi'
import {LoginSuccessAction} from '../redux/action';
import NotFound from './notfound'
import {connect} from 'react-redux'




class History extends Component {
    state = { 
        datahistory:[],
        detailhistory:[],
        modaldetail:false
     }

    componentDidMount (){
        Axios.get(`${url}transactions`)
        .then((res)=>{
            this.setState({datahistory:res.data})
        })
        Axios.get(`${url}transactionsDetails`)
        .then((res1)=>{
            this.setState({datadetail:res1.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderHistory=()=>{

        return this.state.datahistory.map((val,index)=>{
            return (
                <tr >
                    <td style={{width:100}}>{index+1}</td>
                    <td style={{width:100}}>{val.tanggal}</td>
                    <td style={{width:100}}>{val.totalqty}</td>
                    <td style={{width:200}}>{val.totalharga}</td>
                    <td style={{width:100}}><Button onClick={()=>this.setState({modaldetail:true})} variant='warning'>Details</Button></td>
                </tr>
            )
        })
    }

    renderDetailHistory=()=>{
        return this.state.detailhistory.map((val,index)=>{
            return (
                <tr>
                    <th>{index+1}</th>
                    <th>{val.movieId}</th>
                    <th>{val.totalharga}</th>
                   
                </tr>
            )
        })
    }


    render() { 
        if (this.props.roleUser === "admin") {
            return <NotFound />;
          }

        if(this.props.UserId){
        return ( 
            <div>

            
            <Modal centered isOpen={this.state.modaldetail} toggle={() => {this.setState({ modaldetail: false }); }} >
            <ModalHeader>Details</ModalHeader>
            <ModalBody>
              <Table >
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Judul Film</th>
                    <th>Harga</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {this.renderDetailHistory()}
                  </tr>
                </tbody>
              </Table>
            </ModalBody>
          </Modal>


            <HeaderHome/>
            <center style={{marginBottom:'50px'}}>
            <Table style={{width:900
            }} >
                <thead>
                    <tr>
                        <th style={{width:100}}>No.</th>
                        <th style={{width:100}}>Tanggal</th>
                        <th style={{width:100}}>Qty</th>
                        <th style={{width:200}}>Total Harga</th>
                        <th style={{width:100}}>Detail</th>
                    </tr>
                </thead>
                <tbody>
                {this.renderHistory()}
                </tbody>
                
            </Table>
            
        </center>
            
            </div>
         );
        }
        return(
            <div>
                <NotFound/>
            </div>
        )
    }
}
 
const MapstateToprops=state=>{
    return{
        AuthLog:state.Auth.login,
        UserId:state.Auth.id,
        transaksi:state.Auth.transactions,
        roleUser:state.Auth.role
    }
}
export default connect(MapstateToprops,{LoginSuccessAction}) (History);
