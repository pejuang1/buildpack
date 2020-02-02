import React, { Component, isValidElement } from 'react';
import Axios from 'axios';
import {url} from '../ApiUrl/urlapi';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {Input} from 'reactstrap'



class MovieHome extends Component {
    state = { 
        dataMovies:[]
     }

    componentDidMount(){
        Axios.get(`${url}movies`)
        .then((res)=>{
            this.setState({dataMovies:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    renderMovies=()=>{
        return this.state.dataMovies.map((val,index)=>{
            return (
                
                   <div key={index} className="col-md-3 py-5 pr-3 pl-1 ">
                   <div className="card kartu " style={{width: '100%'}}>
                       <div className="gambaar1">
                           <Link to={'/moviedetail/' + val.id}><img src={val.image} height='350px' className="card-img-top kartu gambar" alt="..." /></Link>
                       </div>
                       <div className="card-body">
                           <h5 className="card-title">{val.title}</h5>
                           <p>{val.genre}</p>
                       </div>
                       <div className='row'>
                        <div className='col-md-12'>
                        <Link to={'/moviedetail/' + val.id}><Button block variant="danger">Show Detail</Button></Link>
                        </div>

                       </div>
                   </div>
                    </div>
                    
                   
            )
        })
    }
    render() { 

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4
          };


        return (
        <div className='bg-movie'>
        <div className="judul ">
            <u><h2>Book Your Movies Now!</h2></u>

        </div>
        <div style={{marginTop:'40px'}} className='container'>
       <center>
       <Input style={{width:'370px', }} placeholder='Search Movie...' type='search'/>
       </center>
        </div>
                
       
        <div className='mx-5'>
        <div className="row" style={{paddingLeft: '10%', paddingRight: '10%'}}>
        {this.renderMovies()}
        </div>
        </div>
        
            
            </div>
          );
    }
}
 
export default MovieHome;