import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../img/jumanji.jpg';
import img2 from '../img/frozen.jpg';
import img3 from '../img/scorpion.jpg';





class CarouselHome extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
            <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={img1}
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>Jumanji: The Next Level</h3>
                <p>Dwayne Johnson, Karen Gillan, Jack Black, Kevin Hart, Nick Jonas, Danny DeVito, Danny Glover, Madison Iseman, Alex Wolff, Colin Hanks, Dania Ramirez, Awkwafina.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={img2}
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>Frozen 2</h3>
                <p>Kristen Bell, Idina Menzel, Jonathan Groff, Jason Ritter, Evan Rachel Wood, Sterling K. Brown, Rachel Matthews, Josh Gad, Martha Plimpton, Santino Fontana, Alfred Molina.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={img3}
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>Jogjarockarta International Rock Music Festival 2020</h3>
                <p>Scorpions adalah band rock Jerman yang dibentuk pada tahun 1965 di Hanover oleh Rudolf Schenker. WhitesnakeWHITESNAKE
                Whitesnake adalah band hard rock yang dibentuk di Inggris pada tahun 1978 oleh David Coverdale</p>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>

            
            </div>
         );
    }
}
 
export default CarouselHome;