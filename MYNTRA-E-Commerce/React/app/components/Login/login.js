import React,{Component} from 'react';
import {
  Card, Button, Form, FormGroup, Label, Input 
} from 'reactstrap';
import '../login/login.css'
import { login } from '../../../ApiService';


class Login extends Component{


  constructor(props){
    super(props)
    this.state={

      email:'' ,
      passwor:'',
    
    }

    this.onChange=this.onChange.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
  }


  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }
  onSubmit(e){
   

    e.preventDefault()
    const email=this.state.email
    const password=this.state.password
         
    login(email,password).then(res=>{
      window.location= '/'
    })
  }



render(){
return (
  
    <div className="body">
      <Card className="mainCard">
<p className="heading">Login With Myntra</p >
<Card className="card">
<Form  noValidate onSubmit={this.onSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="email" value={this.state.email} onChange={this.onChange} placeholder="" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="password" value={this.state.password} onChange={this.onChange} />
      </FormGroup>


<Button color="danger" className="" size="lg" block>Login</Button>
      </Form>

</Card>
      </Card>
    </div>
  );
};
}


export default Login;