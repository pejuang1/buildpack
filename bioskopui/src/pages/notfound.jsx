import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import HeaderHome from '../components/header'
import FooterHome from '../components/footer';

class NotFound extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
            <HeaderHome/>
            <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                <h1>404</h1>
                <h2>Page not found</h2>
                </div>
                <Link to={'/'}>
                Homepage
                </Link>
            </div>

            </div>
            <FooterHome/>
            
            </div>
         );
    }
}
 
export default NotFound;