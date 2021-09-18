import React,{Component} from 'react';
import {
    Card, Row, Col,Container, CardImg,Button
  } from 'reactstrap';
  import {Profile} from '../../../ApiService'
  import {Link} from 'react-router-dom';
  import './profile.css'
class profile extends Component{


  constructor(props){
    super(props)
    this.state={

  data:[]}
  }

  componentDidMount(){
    Profile().then(data=>data)
    .then(data=>{this.setState({data})
  }
    
     ).catch(err=>{
       alert(err)
     }) }
  render(){


        return (   
      <Container fluid className="profileDetails" >
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
            <tr>
                <td>Email</td>
                <td>{this.state.data.email}</td>
              </tr>
              <tr>
                <td>Fist Name</td>
                <td>{this.state.data.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.data.last_name}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{this.state.data.gender}</td>
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td>{new Date(this.state.data.dob).getFullYear()+'-'+("0"+(new Date(this.state.data.dob).getMonth()+1)).slice(-2)+'-'+("0"+new Date(this.state.data.dob).getDate()).slice(-2)}</td>
              </tr>
              <tr>
                <td>Mobile</td>
                <td>{this.state.data.mobile}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{this.state.data.location}</td>
              </tr>

            </tbody>
            <Link to="/register">
<Button color="danger" block>EDIT</Button></Link>
          </table>
          
           

      </Container>
        )
      
}
}
export default profile;



























// import React, { Component } from 'react'
// import jwt_decode from 'jwt-decode'

// class Profile extends Component {
//   constructor() {
//     super()
//     this.state = {
//       email: '',
//       first_name: '',
//       last_name: '',
//       gender: '',
//       dob: '',
//       mobile: '',
//       location: '',
//       errors: {}
//     }
//   }

//   componentDidMount() {
//     const token = localStorage.Token
//     const decoded = jwt_decode(token)
//     this.setState({
//       email: decoded.email,
//       first_name: decoded.first_name,
//       last_name: decoded.last_name,
//       gender: decoded.gender,
//       dob: decoded.dob,
//       mobile: decoded.mobile,
//       location: decoded.location
//     })
//   }

//   render() {
//     return (
//       <div className="container">
//         <div className="jumbotron mt-5">
//           <div className="col-sm-8 mx-auto">
//             <h1 className="text-center">PROFILE</h1>
//           </div>
//           <table className="table col-md-6 mx-auto">
//             <tbody>
//             <tr>
//                 <td>Email</td>
//                 <td>{this.state.email}</td>
//               </tr>
//               <tr>
//                 <td>Fist Name</td>
//                 <td>{this.state.first_name}</td>
//               </tr>
//               <tr>
//                 <td>Last Name</td>
//                 <td>{this.state.last_name}</td>
//               </tr>
//               <tr>
//                 <td>Gender</td>
//                 <td>{this.state.gender}</td>
//               </tr>
//               <tr>
//                 <td>Date of Birth</td>
//                 <td>{this.state.dob}</td>
//               </tr>
//               <tr>
//                 <td>Mobile</td>
//                 <td>{this.state.mobile}</td>
//               </tr>
//               <tr>
//                 <td>Location</td>
//                 <td>{this.state.location}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     )
//   }
// }

// export default Profile
