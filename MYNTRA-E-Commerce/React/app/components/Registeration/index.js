import React from 'react';
import { Button, Form, FormGroup, Label, Input, Card,FormText ,Container} from 'reactstrap';
import { Component } from 'react';
import { editProfile,Profile } from '../../../ApiService';
import './register.css'
class Register extends Component{
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
      email:'' ,
      
    }
    this.onChange=this.onChange.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }

  componentDidMount(){
    Profile().then(data=>data)
    .then(data=>this.setState({
      first_name:data.first_name,
      last_name:data.last_name,
      gender:data.gender,
      dob:data.dob,
      bio:data.bio,
      mobile:data.mobile,
      location:data.location,
    })
    
     ).catch(err=>{
       alert(err)
     }) }
  onSubmit(e){

    e.preventDefault()
    const reg={
      first_name:this.state.first_name,
      last_name:this.state.last_name,
      gender:this.state.gender,
      dob:this.state.dob,
      bio:this.state.bio,
      mobile:this.state.mobile,
      location:this.state.location,
    } 
    
    editProfile(reg)
    .then(res=>{alert(res.data)
      if(res.message=='Success')
      window.location= '/profile'
  })
    .catch(err=>{
      alert("Changes Cancelled")
    })
  }

   Gender=()=>{
     if(this.state.gender=='Male'){
       return(
       <div className="container">
       
           <FormGroup tag="fieldset">
        <Label for="last_name">Gender</Label>
      <FormGroup >
      <Label check>
        <Input type="radio" checked name="gender" value="Male" onChange={this.onChange} />{' '}
        Male
      </Label>
    </FormGroup>
    <FormGroup>
      <Label check>
        <Input type="radio" name="gender" value="Female" onChange={this.onChange}/>{' '}
        Female
      </Label>
    </FormGroup>
    <FormGroup  >
      <Label check>
        <Input type="radio" name="gender" value="Others" onChange={this.onChange} />{' '}
        Others
      </Label>
    </FormGroup>
    </FormGroup>

</div>)
    }
    else if(this.state.gender=='Female'){
      return(
      <div className="container">
     
      <FormGroup tag="fieldset">
        <Label for="last_name">Gender</Label>
     <FormGroup>
     <Label check>
       <Input type="radio" name="gender" value="Male" onChange={this.onChange} />{' '}
       Male
     </Label>
   </FormGroup>
   <FormGroup>
     <Label check>
       <Input type="radio" checked name="gender" value="Female" onChange={this.onChange}/>{' '}
       Female
     </Label>
   </FormGroup>
   <FormGroup  >
     <Label check>
       <Input type="radio" name="gender" value="Others" onChange={this.onChange} />{' '}
       Others
     </Label>
   </FormGroup>
   </FormGroup>

</div>)
   }
   else{
     return(
    <div className="container">
    <FormGroup tag="fieldset">
        <Label for="last_name">Gender</Label>
     <FormGroup>
     <Label check>
       <Input type="radio" name="gender" value="Male" onChange={this.onChange} />{' '}
       Male
     </Label>
   </FormGroup>
   <FormGroup>
     <Label check>
       <Input type="radio" name="gender" value="Female" onChange={this.onChange}/>{' '}
       Female
     </Label>
   </FormGroup>
   <FormGroup  >
     <Label check>
       <Input type="radio" checked name="gender" value="Others" onChange={this.onChange} />{' '}
       Others
     </Label>
   </FormGroup>
   </FormGroup>

</div>)
   }

  }

 
render()
{
  return (
    <div style={{backgroundColor: "#FEEDF6",padding:"50px 0 50px 400px"}}>
<Card  className="register">
<center><h5>Edit Profile</h5></center>
    <Form className="container" noValidate onSubmit={this.onSubmit}>

    <FormGroup>
        <Label for="first_name">First Name</Label>
        <Input type="text" name="first_name" id="first_name" value={this.state.first_name} onChange={this.onChange} />
      </FormGroup>
      <FormGroup>
        <Label for="last_name">Last Name</Label>
        <Input type="text" name="last_name" id="last_name" value={this.state.last_name} onChange={this.onChange} />
      </FormGroup>

  
          {this.Gender()}


      <FormGroup>
        <Label for="exampleDate">Date of Birth</Label>
       
        <Input
          type="date"
          name="dob"
          value={new Date(this.state.dob).getFullYear()+'-'+("0"+(new Date(this.state.dob).getMonth()+1)).slice(-2)+'-'+("0"+new Date(this.state.dob).getDate()).slice(-2)}
          onChange={this.onChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="bio">Bio</Label>
        <Input type="text" name="bio" id="bio" value={this.state.bio} onChange={this.onChange} />
      </FormGroup>



      <FormGroup>
        <Label for="mobile">Mobile Number</Label>
        <Input
          type="number"
          name="mobile"
          id="mobile"
          value={this.state.mobile}
          onChange={this.onChange}
        />
      </FormGroup>


      <FormGroup>
        <Label for="location">Location</Label>
        <Input type="text" name="location" id="location"  value={this.state.location} onChange={this.onChange}/>
      </FormGroup>



      <Button color="danger" block >Submit</Button>

    </Form>
    </Card>
    </div>
  );
}
}
export default Register;








