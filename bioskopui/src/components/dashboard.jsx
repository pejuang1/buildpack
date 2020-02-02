import React, { Component } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import Axios from 'axios';
import {url} from '../ApiUrl/urlapi';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import Swal from 'sweetalert2';



class Dashboard extends Component {
    state = { 
        dataMovies:[],
        modaladd:false,
        readmoreselected:-1,
        modaledit:false,
        indexedit:0,
        jadwal:[12,14,16,18,20,22]
     }

     componentDidMount(){
        Axios.get(`${url}movies`)
        .then((res)=>{
            Axios.get(`${url}studios`)
            .then((res1)=>{

                this.setState({dataMovies:res.data, datastudio:res1.data})
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    onDeleteClick=(val)=>{
        Swal.fire({
            title:"Anda yakin mau delete? <br/>"  + val.title,
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
                val.title + ' ' + 'has been deleted.',
                'success'
              )
              Axios.delete(`${url}movies/${val.id}`, this.state.dataMovies)
              .then((res)=>{
                  Axios.get(`${url}movies`)
                  .then((res)=>{
                      this.setState({dataMovies:res.data,modaledit:false})
                  })
              }).catch((err)=>{
                  console.log(err)
              })
            }
          })
    }
    

    
    onSaveAddDataClick=()=>{
        var jadwaltemplate=[12,14,16,18,20]
        var jadwal=[]
        for(var i=0;i<jadwaltemplate.length;i++){
            if(this.refs[`editjadwal${i}`]){
                jadwal.push(jadwaltemplate[i])
            }
        }
        var iniref=this.refs
        var title=iniref.title.value
        var image=iniref.image.value
        var imgHeader=iniref.imageHeader.value
        var sinopsis=iniref.sinopsis.value
        var sutradara=iniref.sutradara.value
        var genre=iniref.genre.value
        var durasi=iniref.durasi.value
        var trailer=iniref.trailer.value
        var studioId=iniref.studio.value
        var produksi='RANS ENTERTAINMENT'
        var data={
            title:title,
            image,
            imgHeader,
            sinopsis,
            sutradara,
            genre,
            durasi,
            produksi,
            jadwal,
            trailer,
            studioId
        }
        Axios.post(`${url}movies`,data)
        .then(()=>{
            Axios.get(`${url}movies`)
            .then((res)=>{
                this.setState({dataMovies:res.data,modaladd:false})
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    
    onUpdateDataclick=()=>{
        var jadwaltemplate=this.state.jadwal
        var jadwal=[]
        var id=this.state.dataMovies[this.state.indexedit].id
        for(var i=0;i<jadwaltemplate.length;i++){
            if(this.refs[`editjadwal${i}`].checked){
                jadwal.push(jadwaltemplate[i])
            }
        }
        var iniref=this.refs
        var title=iniref.edittitle.value
        var image=iniref.editimage.value
        var imgHeader=iniref.editimageheader.value
        var sinopsis=iniref.editsinopsis.value
        var sutradara=iniref.editsutradara.value
        var genre=iniref.editgenre.value
        var durasi=iniref.editdurasi.value
        var trailer=iniref.edittrailer.value
        var studioId=iniref.editstudio.value
        var produksi='RANS ENTERTAINMENT'
        var data={
            title:title,
            image,
            imgHeader,
            sinopsis,
            sutradara,
            genre,
            durasi,
            produksi,
            jadwal,
            trailer,
            studioId
        }
        console.log(id)
        
        Axios.put(`${url}movies/${id}`,data)
        .then(()=>{
            Axios.get(`${url}movies/`)
            .then((res)=>{
                this.setState({dataMovies:res.data,modaledit:false})
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    
    renderEditCheckbox=(indexedit)=>{
        var indexarr=[]
        var datamoviesedit=this.state.dataMovies[indexedit].jadwal
        console.log(datamoviesedit)
        // console.log(this.state.jadwal)
        // console.log(this.state.jadwal.indexOf(datafilmedit[1]))
        // datafilmedit.forEach((val)=>{
        //     indexarr.push(this.state.jadwal.indexOf(val))
        // })
        for(var i=0;i<datamoviesedit.length;i++){
            for(var j=0;j<this.state.jadwal.length;j++){
                if(datamoviesedit[i]===this.state.jadwal[j]){
                    indexarr.push(j)
                }
            }
        }
        var checkbox=this.state.jadwal
        var checkboxnew=[]
        checkbox.forEach((val)=>{
            checkboxnew.push({jam:val,tampiledit:false})
        })
        indexarr.forEach((val)=>{
            checkboxnew[val].tampiledit=true
        })
        return checkboxnew.map((val,index)=>{
                if(val.tampiledit){
                        return (
                            <div key={index}>
                                <input type="checkbox" defaultChecked ref={`editjadwal${index}`} value={val.jam}/> 
                                <span className='mr-2'>{val.jam}.00</span>
                            </div>
                        )
                }else{
                    return (
                        <div key={index}>
                            <input type="checkbox"  ref={`editjadwal${index}`} value={val.jam}/> 
                            <span className='mr-2'>{val.jam}.00</span>
                        </div> 
                    )
                }
        })
    }

    renderMovies=()=>{
        return this.state.dataMovies.map((val,index)=>{
            return (

                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val.title}</td>
                    <td><img src={val.image} height="200px"></img></td>
                    {   this.state.readmoreselected===index?
                        <td style={{width:'300px'}}>
                            {val.sinopsis} 
                            <span style={{color:'blue'}} onClick={()=>this.setState({readmoreselected:-1})}>
                            {'\u00A0'} Read less
                            </span>
                        </td>
                    :
                    <td style={{width:'300px'}}>
                        {val.sinopsis.split('').filter((val,index)=>index<=50)}
                        <span style={{color:'red'}} onClick={()=>this.setState({readmoreselected:index})}>
                        {'\u00A0'} Read More
                        </span>
                    </td>
                    }
                    
                    <td>{val.jadwal.join(' PM, ')}</td>
                    <td>{val.sutradara}</td>
                    <td>{val.genre}</td>
                    <td>{val.durasi}</td>
                    <td>
                    <button className='btn btn-outline-primary my-2 px-4 ' onClick={()=>this.setState({modaledit:true,indexedit:index})}>Edit</button>
                    <button className='btn btn-outline-danger px-3' onClick={()=>this.onDeleteClick(val)}>Delete</button>
                    </td>
                </tr>
                
            )
        })
    }

    renderAddCheckbox=()=>{
        return this.state.jadwal.map((val,index)=>{
            return(
                <div key={index}>
                    <input type="checkbox" ref={`jadwal${index}`}/> 
                    <span className='mr-2'>{val}.00</span> 
                </div>
            )
        })
    }


    render() { 
        console.log('datastudio',this.state.datastudio)
        const {dataMovies,indexedit}=this.state
        const {length}=dataMovies
        if(length===0){
            return <div>loading</div>
        }

        return ( 
            <div>

            <Modal isOpen={this.state.modaledit} toggle={()=>this.setState({modaledit:false})}>
                    <ModalHeader>
                        Edit Data {dataMovies[indexedit].title}
                    </ModalHeader>
                    <ModalBody>
                        <input type="text" defaultValue={dataMovies[indexedit].title} ref='edittitle'  placeholder='title' className='form-control mt-2'/>
                        <input type="text" defaultValue={dataMovies[indexedit].image} ref='editimage' placeholder='image'className='form-control mt-2'/>
                        <input type="text" defaultValue={dataMovies[indexedit].imgHeader} ref='editimageheader' placeholder='imageheader'className='form-control mt-2'/>

                        <textarea rows='5' ref='editsinopsis' defaultValue={dataMovies[indexedit].sinopsis} placeholder='sinopsis' className='form-control mt-2 mb-2'/>
                        Jadwal:
                        <div className="d-flex">
                            {this.renderEditCheckbox(indexedit)}
                        </div>
                        <input type="text" defaultValue={dataMovies[indexedit].trailer} ref='edittrailer' placeholder='trailer'className='form-control mt-2' />
                        <select ref='editstudio'  defaultValue={dataMovies[indexedit].studioId} className='form-control mt-2'>
                        {
                            this.state.datastudio.map((val)=>{
                                return(
                                    <option value={val.id}>{val.nama}</option>
                                )
                            })
                        }  
                        </select> 
                        <input type="text" defaultValue={dataMovies[indexedit].sutradara}  ref='editsutradara' placeholder='sutradara' className='form-control mt-2'/>
                        <input type="number" defaultValue={dataMovies[indexedit].durasi}  ref='editdurasi' placeholder='durasi' className='form-control mt-2'/>
                        <input type="text" defaultValue={dataMovies[indexedit].genre} ref='editgenre' placeholder='genre' className='form-control mt-2'/>
                    </ModalBody>
                    <ModalFooter>
                
                        <Button variant="success" onClick={this.onUpdateDataclick}>Save</Button>
                        <Button variant="danger" onClick={()=>this.setState({modaledit:false})}>Cancel</Button>
                    </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modaladd} toggle={()=>this.setState({modaladd:false})}>
            <ModalHeader>
                Tambahkan Data Movies
            </ModalHeader>
            <ModalBody>
                <input type="text" ref='title'  placeholder='Title' className='form-control mt-2'/>
                <input type="text" ref='image' placeholder='Image' className='form-control mt-2'/>
                <input type="text" ref='imageHeader' placeholder='Image Header' className='form-control mt-2'/>

                <input type="text" ref='sinopsis'  placeholder='Sinopsis' className='form-control mt-2 mb-2'/>
                Jadwal:
                <div className="d-flex">
                    {this.renderAddCheckbox()}
                </div>
                <input type="text" ref='trailer' placeholder='Trailer' className='form-control mt-2' />
                <select ref='studio' className='form-control mt-2'>
                {
                    this.state.datastudio.map((val)=>{
                        return(
                            <option value={val.id}>{val.nama}</option>
                        )
                    })
                }   
                </select> 
                <input type="text"  ref='sutradara' placeholder='Sutradara' className='form-control mt-2'/>
                <input type="number"  ref='durasi' placeholder='Durasi' className='form-control mt-2'/>
                <input type="text" ref='genre' placeholder='Genre' className='form-control mt-2'/>
            </ModalBody>
            <ModalFooter>
                
                <Button variant="success" onClick={this.onSaveAddDataClick}>Save</Button>
                <Button variant="danger" onClick={()=>this.setState({modaladd:false})}>Cancel</Button>
            </ModalFooter>
            </Modal>





            <Container>
            <div className="heading-admin">
            
            <h2>Welcome Admin, What are you going to do today?</h2>
            </div>
            <div className='buttonadmin'>
            <Button variant="secondary" onClick={()=>this.setState({modaladd:true})}>Tambah Data Movie</Button>
            
            </div>

            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Judul</th>
                    <th>Image</th>
                    <th>Sinopsis</th>
                    <th>Jadwal</th>
                    <th>Sutradara</th>
                    <th>Genre</th>
                    <th>Durasi</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {this.renderMovies()}
                
            </tbody>
            </Table>
            
            </Container>
            </div>
         );
    }
}
 
export default Dashboard;