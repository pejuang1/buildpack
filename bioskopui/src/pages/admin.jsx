import React, { Component } from 'react';
import HeaderHome from '../components/header';
import Dashboard from '../components/dashboard'
import FooterAdmin from '../components/footer.admin';
import {LoginSuccessAction} from '../redux/action';
import NotFound from './notfound'
import {connect} from 'react-redux'


class AdminPage extends Component {
    state = {  }


    render() { 
        if (this.props.roleUser === "user") {
            return <NotFound />;
          } 
        if(this.props.UserId) {
        return ( 
           
            <div>
                <HeaderHome/>
                <Dashboard/>
                <FooterAdmin/>
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
export default connect(MapstateToprops,{LoginSuccessAction}) (AdminPage);
 
