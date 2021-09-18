import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Form, FormGroup, Label, Input, FormText 
} from 'reactstrap';
import '../SignUp/signup.css'
import { Component } from 'react';
import { register } from '../../../ApiService';


class Example extends Component{


  constructor(props){
    super(props)
    this.state={
      first_name:'',
      last_name:'',
      gender:'',
      dob:'',
      bio:'',
      mobile:'',
      location:'',
      email:'' 
    }
    this.onChange=this.onChange.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }
  onSubmit(e){
   

    e.preventDefault()
    let email=this.state.email
    let password=this.state.password
         let gender=this.state.gender
         
         register( email,password,gender ).then(res => {
           console.log(res)
          // this.props.history.push(`/login`)
          window.location= '/login'
        }).catch(err=>{
          console.log(err)
          // alert("please Enter All the fields")
          // window.location= '/login'

        })
      }


render(){
return (
    <div className="bodySignup">
      <Card className="mainCard" style={{width:"500px"}}>
<p className="heading">Signup With Myntra</p >
<Card className="card">
<Form  noValidate onSubmit={this.onSubmit}>
<ul className="error">
 
 </ul>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="email" value={this.state.email} onChange={this.onChange} placeholder="" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="password" value={this.state.password} onChange={this.onChange} />
      </FormGroup>

      <FormGroup tag="fieldset">
        <FormGroup check>
          <Label check>
            <Input type="radio" name="gender" value="Male" onChange={this.onChange} />{' '}
            Male
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="gender" value="Female" onChange={this.onChange} />{' '}
            Female
          </Label>
        </FormGroup>
        </FormGroup>
<Button color="danger" className="" size="lg" block>Register</Button>
      </Form>

</Card>
      </Card>
    </div>
  );
};
}
export default Example;