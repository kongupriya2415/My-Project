import React, { Component } from 'react';
import Slider from 'react-slick';
import {getAllSlickImages} from '../../../ApiService'
import  '../Slider/slick.css';
import 'slick-carousel/slick/slick-theme.css';
 import 'slick-carousel/slick/slick.css';

class Home extends Component {

    constructor() {
        super();
        this.state = {
          product: []
        }
      }
  componentDidMount(){
    getAllSlickImages().then(product=>
        product)
        .then(product=>this.setState({product}))
        
  }

  sliders() {

    return this.state.product.map(data =>{ 
      return (
        <div key={data}>
          <img alt="slickimage" src={data.image} className="slickimage" />
        </div>
      )
    });
  }

  render() {
    const settings = {
      dots: true,
      autoplay: true,
      Speed: 900,
      arrow: true,
      slideToShow:1,
      slideToScroll:1

    }
    return (
      <div className="slick">
        <Slider {...settings}>
          {this.sliders()}
        </Slider>
      </div>
    );
  }
}
export default Home;