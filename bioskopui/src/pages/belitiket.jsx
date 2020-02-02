  
import React, { Component } from 'react';
import {connect} from 'react-redux'
import Axios from 'axios'
import {url} from '../ApiUrl/urlapi'
import {Redirect} from 'react-router-dom'
import {Modal,ModalBody,ModalFooter} from 'reactstrap'
import Numeral from 'numeral'
import { Button} from 'react-bootstrap';
import HeaderHome from '../components/header';
import NotFound from './notfound'
import cartplus from '../img/cartplus.svg'




class Belitiket extends Component {
    state = {  
        datamovie:{},
        seats:200,
        baris:0,
        booked:[],
        loading:true,
        jam:12,
        pilihan:[],    
        openmodalcart:false,
        redirecthome:false
    }

    componentDidMount(){
        this.onJamchange()
    }
    onJamchange=()=>{
        var studioId=this.props.location.state.studioId
        var movieId=this.props.location.state.id
        Axios.get(`${url}studios/${studioId}`)
        .then((res1)=>{
            Axios.get(`${url}orders?movieId=${movieId}&jadwal=${this.state.jam}`)
            .then((res2)=>{
                var arrAxios=[]
                res2.data.forEach((val)=>{
                    arrAxios.push(Axios.get(`${url}ordersDetails?orderId=${val.id}`))
                })
                var arrAxios2=[]
                console.log(arrAxios)
                Axios.all(arrAxios)
                .then((res3)=>{
                    console.log(res3)
                    res3.forEach((val)=>{
                        arrAxios2.push(...val.data)
                    })
                    console.log(arrAxios2)
                    this.setState({
                        datamovie:this.props.location.state,
                        seats:res1.data.jumlahKursi,
                        baris:res1.data.jumlahKursi/20,
                        booked:arrAxios2,
                        loading:false
                    })  
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err2)=>{
                console.log(err2)
            })
        }).catch((err1)=>{
            console.log(err1)
        })
    }
    onButtonjamclick=(val)=>{
        this.setState({jam:val,pilihan:[]})
        this.onJamchange()   
    }

    onPilihSeatClick=(row,seat)=>{
        var pilihan=this.state.pilihan
        pilihan.push({row:row,seat})//seat:seat bisa juga ditulis begitu 
        this.setState({pilihan:pilihan})
    }
    
    onResetSeat=()=>{
        this.setState({pilihan:[]})
    }

    onOrderClick=()=>{
        var userId=this.props.UserId
        var movieId=this.state.datamovie.id
        var pilihan=this.state.pilihan
        var jadwal=this.state.jam
        var totalharga=this.state.pilihan.length*25000
        var bayar=false
        var dataorders={
            userId,
            movieId,
            totalharga,
            jadwal,
            bayar
        }

        Axios.post(`${url}orders`,dataorders)
        .then((res)=>{
            
            var dataordersdetail=[]

            pilihan.forEach((val)=>{
                dataordersdetail.push({
                    orderId:res.data.id,
                    seat:val.seat,
                    row:val.row
                })
            })
            console.log(dataordersdetail)
            
            var dataordersdetail2=[]
            dataordersdetail.forEach((val)=>{
                dataordersdetail2.push(Axios.post(`${url}ordersDetails`,val))
            })
            Axios.all(dataordersdetail2)
            .then((res1)=>{
                console.log(res1)
                this.setState({openmodalcart:true})
            }).catch((err)=>{
                console.log(err)
            })
            
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderHargadanQuantity=()=>{
        var jumlahtiket=this.state.pilihan.length
        var harga=jumlahtiket*25000
        return(
        <div>
        <p style={{fontWeight:'bold',
    paddingBottom:'5px',
paddingTop:'10px'}}>Jumlah :</p>
            {jumlahtiket} tiket X {'Rp.'+Numeral(25000).format('0,0.00') }= {'Rp.' +Numeral(harga).format('0,0.00')}
        </div>

        )
    }

    onCancelseatClick=(row,seat)=>{
        var pilihan=this.state.pilihan
        var rows=row
        var seats=seat
        var arr=[]
        for (var i=0;i<pilihan.length;i++){
            if(pilihan[i].row!==rows||pilihan[i].seat!==seats){
                arr.push(pilihan[i])
            }
        }
        this.setState({pilihan:arr})
    }

    reloadWindows=()=> {
        this.setState({openmodalcart:false})
        window.location.reload()
    }

    renderseat=()=>{
        var arr=[]
        for(let i=0;i<this.state.baris;i++){
            arr.push([])
            for(let j=0;j<this.state.seats/this.state.baris;j++){
                arr[i].push(1)
            }
        }
        console.log(this.state.booked)
        for(let j=0;j<this.state.booked.length;j++){
            arr[this.state.booked[j].row][this.state.booked[j].seat]=3
        }
        
        for(let a=0;a<this.state.pilihan.length;a++){
            arr[this.state.pilihan[a].row][this.state.pilihan[a].seat]=2
        }
        var alphabet='abcdefghijklmnopqrstuvwxyz'.toUpperCase()
        var jsx=arr.map((val,index)=>{
            return(
                <div key={index}>
                    {
                        val.map((val1,i)=>{
                            if(val1===3){
                                return(
                                    <Button style={{width:'50x'}} key={i} disabled className='rounded  mr-1 mt-2  bg-danger text-center' variant='info'>
                                        {alphabet[index] +(i+1)} 
                                    </Button>
                                )
                            }else if(val1===2){
                                return(
                                    <Button style={{width:'50px'}} key={i} onClick={()=>this.onCancelseatClick(index,i)} variant='primary'  className='rounded btn-order  mr-1 mt-2 btn-pilih text-center'>
                                        {alphabet[index] +(i+1)}
                                    </Button>      
                                )
                            } 
                            return(
                                <Button style={{width:'50px'}} key={i} onClick={()=>this.onPilihSeatClick(index,i)} variant='danger' className='rounded btn-order  mr-1 mt-2 text-center'>
                                    {alphabet[index]+(i+1)}
                                </Button>
                            )
                        })
                    }
                </div>
            )
        })
        return jsx
    }
    renderbutton=()=>{
        return this.state.datamovie.jadwal.map((val,index)=>{
            if(this.state.jam===val){
                return(
                    <Button className='mx-2 ' variant='primary' >{val}.00</Button>
                )
            }
            return(
                <Button className='mx-2 ' variant='danger' onClick={()=>this.onButtonjamclick(val)}>{val}.00</Button>
            )
        })
    }
    render(){
        if (this.props.roleUser === "admin" ) {
            return  <Redirect to={'/'}/>
           
          }
        

        if(this.props.location.state &&this.props.AuthLog){
            if(this.state.redirecthome){
                return <Redirect to={'/'}/>
            }
            if(this.props.UserId){
            return (

                <div>
                    <Modal centered isOpen={this.state.openmodalcart}>
                        <ModalBody>
                            <center>
                            <div>
                                <img src={cartplus} height='100px'/> <br/>
                               <h3>Tiket berhasil ditambahkan ke dalam Cart</h3>
                            </div>
                            </center>
                        </ModalBody>
                        <ModalFooter>
                            <center>
                             <a href='/cart'><Button onClick={this.reloadWindows} variant='success' centered >Lihat Cart</Button></a>
                            </center>
                        </ModalFooter>
                    </Modal>
                    <HeaderHome/>

                    <div className='container'>
                        <div className='row belitiketimg'>
                            <div className='col-md-6'>
                            <center>
                            <img src={this.state.datamovie.image} height='300'/>
                            </center>
                            </div>

                            <div className='col-md-6'>
                            
                            <div>
                            <h3 style={{marginTop:'25px',
                            marginBottom:'25px'}}> {this.state.datamovie.title}</h3>
                            </div>
                            <p style={{fontWeight:'bold'}}>Pilih Jam Tayang :</p>
                            {this.state.loading?null:this.renderbutton()}
                            <div>

                            {
                                
                                this.renderHargadanQuantity()
                               
                            }

                                {this.state.pilihan.length?
                                <button onClick={this.onOrderClick} className='btn btn-primary mr-3 mt-3'>Order</button>
                                :
                                null
                            }

                            {this.state.pilihan.length?
                                <button onClick={this.onResetSeat} className='btn btn-warning mt-3'>Reset Seat</button>
                                :
                                null
                            }
                           
                            
                            </div>
                            
                        
                            </div>

                        </div>
                        
                    </div>
                  
                    <div className="d-flex justify-content-center mt-4">
                        <div style={{marginBottom:'50px'}} >
                            {this.state.loading?null:this.renderseat()} 
                        </div>
                    </div>
                </div>
              );
         }
        }
        return(
            <div>
              <NotFound/>
            </div>
        )
    }
}

const MapstateToprops=(state)=>{
    return{
        AuthLog:state.Auth.login,
        UserId:state.Auth.id,
        roleUser:state.Auth.role
    }
}
export default connect(MapstateToprops) (Belitiket);