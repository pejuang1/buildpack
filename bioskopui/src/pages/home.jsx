import React, { Component } from 'react';
import HeaderHome from '../components/header'
import CarouselHome from '../components/carousel';
import MovieHome from '../components/moviehome';
import FooterHome from '../components/footer';

class HomePage extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <HeaderHome/>
                <CarouselHome/> 
                <MovieHome/>
                <FooterHome/>
            </div>
         );
    }
}
 
export default HomePage;