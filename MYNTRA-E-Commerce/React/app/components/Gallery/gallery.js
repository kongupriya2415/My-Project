import React,{Component} from 'react';
import {
    Card, Row, Col,Container, CardImg
  } from 'reactstrap';
  import {getAllGalleryImages} from '../../../ApiService'
  import './gallery.css'
class gallery extends Component{
  state={
    gallery:[]
  }
  componentDidMount(){
    getAllGalleryImages().then(gallery=>
        gallery)
        .then(gallery=>this.setState({gallery}))
        
  }
  Image(){
    return this.state.gallery.map(gallery =>{ 
return(
  <Col lg="3">
    <Card>
        <CardImg src={gallery.image} onClick={()=>{window.location='/products'}}></CardImg>
    </Card>
  </Col>

)
    })
  }
  render(){


        return (   
          <div className="gallery">   
       <Container fluid >
         <div className="heading">
           <h2>Making Wonderful SHOPPING</h2>
           <h6>On MYNTRA</h6>
         </div>
       <div className="row">   {this.Image()}</div>
     
      
        </Container>
        </div> 
        )
      
}
}
export default gallery;
