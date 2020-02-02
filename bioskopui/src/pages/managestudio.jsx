import React, { Component } from 'react';
import FooterHome from '../components/footer';
import HeaderHome from '../components/header'
import {Button} from 'react-bootstrap'
import {Table,Modal, ModalBody,ModalHeader,ModalFooter} from 'reactstrap'
import Axios from 'axios';
import {url} from '../ApiUrl/urlapi'
import {LoginSuccessAction} from '../redux/action';
import NotFound from './notfound'
import {connect} from 'react-redux'
import Swal from 'sweetalert2';



class ManageStudio extends Component {
    state = { 
        datastudio:[],
        modaladd:false,
        indexedit:0,
        modaledit:false
     }

    componentDidMount(){
        Axios.get(`${url}studios`)
        .then((res)=>{
           this.setState({datastudio:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderStudio=()=>{
        return this.state.datastudio.map((val,index)=>{
            return (
                <tr key={index}>
                    <td style={{width:100}}>{index+1}</td>
                    <td style={{width:500}}>{val.nama}</td>
                    <td style={{width:300}}>{val.jumlahKursi}</td>
                    <td style={{width:100}}><Button onClick={()=>this.setState({modaledit:true,indexedit:index})} variant='info'>Edit</Button></td>
                    <td style={{width:100}}><Button onClick={()=>this.onDeleteClick(val)} variant='danger'>Delete</Button></td>
                
                 </tr>

            )
        })
    }

    addStudio=()=>{
        var iniref=this.refs
        var nama=iniref.nama.value
        var jumlahKursi=iniref.kursi.value
        var data={
            nama:nama,
            jumlahKursi
        }
        Axios.post(`${url}studios`,data)
        .then(()=>{
            Axios.get(`${url}studios`)
            .then((res)=>{
                this.setState({datastudio:res.data,modaladd:false})
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    editStudio=()=>{
        var iniref=this.refs
        var id=this.state.datastudio[this.state.indexedit].id
        var nama=iniref.editnama.value
        var jumlahKursi=iniref.editkursi.value
        var data={
            nama:nama,
            jumlahKursi
        }
        Axios.put(`${url}studios/${id}`,data)
        .then(()=>{
            Axios.get(`${url}studios`)
            .then((res)=>{
                this.setState({datastudio:res.data,modaledit:false})
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }


    onDeleteClick=(val)=>{
        Swal.fire({
            title:"Anda yakin mau delete? <br/>"  + val.nama,
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Deleted!',
                val.nama +' has been deleted.',
                'success'
              )
              Axios.delete(`${url}studios/${val.id}`, this.state.datastudio)
              .then((res)=>{
                  Axios.get(`${url}studios`)
                  .then((res)=>{
                      this.setState({datastudio:res.data,modaledit:false})
                  })
              }).catch((err)=>{
                  console.log(err)
              })
            }
          })
    }

    render() { 
        const {datastudio,indexedit}=this.state
        const {length}=datastudio
        if(length===0){
            return <div>Loading..</div>
        }
        if (this.props.roleUser === "user") {
            return <NotFound />;
          } 
        if(this.props.UserId) {
        return ( 
            <div>
            <HeaderHome/>
           
            <Modal isOpen={this.state.modaladd} toggle={()=>this.setState({modaladd:false})}>
            <ModalHeader>
                Tambahkan Data Studios
            </ModalHeader>
            <ModalBody>
                <input type="text" ref='nama'  placeholder='Nama Studio' className='form-control mt-2'/>
                <input type="number" ref='kursi' placeholder='Jumlah Kursi' className='form-control mt-2'/>
                
            </ModalBody>
            <ModalFooter>
                
                <Button variant="success" onClick={this.addStudio}>Save</Button>
                <Button variant="danger" onClick={()=>this.setState({modaladd:false})}>Cancel</Button>
            </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modaledit} toggle={()=>this.setState({modaedit:false})}>
            <ModalHeader>
                Edit Data Studios
            </ModalHeader>
            <ModalBody>
                <input type="text" defaultValue={datastudio[indexedit].nama} ref='editnama'  placeholder='Nama Studio' className='form-control mt-2'/>
                <input type="number" defaultValue={datastudio[indexedit].jumlahKursi} ref='editkursi' placeholder='Jumlah Kursi' className='form-control mt-2'/>
                
            </ModalBody>
            <ModalFooter>
                
                <Button variant="success" onClick={this.editStudio}>Save</Button>
                <Button variant="danger" onClick={()=>this.setState({modaledit:false})}>Cancel</Button>
                

            </ModalFooter>
            </Modal>


            <div className='container'>
            <div style={{textAlign:'center', marginTop:'20px',paddingBottom:'15px'}}>
            <h3 style={{paddingBottom:'10px'}}>Manage Studio</h3>
            <Button onClick={()=>this.setState({modaladd:true})} variant='secondary'>Tambah Data</Button>
            </div>
            <center style={{marginBottom:'50px'}}>
            <Table style={{width:900
            }} >
                <thead>
                    <tr>
                        <th style={{width:100}}>No.</th>
                        <th style={{width:500}}>Studio</th>
                        <th style={{width:300}}>Seat</th>
                        <th style={{width:100}}>Edit</th>
                        <th style={{width:100}}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {this.renderStudio()}
                </tbody>
                
            </Table>
            
            </center>
            
            </div>


            
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
        roleUser:state.Auth.role
     
    }
}
export default connect(MapstateToprops,{LoginSuccessAction}) (ManageStudio);
 
