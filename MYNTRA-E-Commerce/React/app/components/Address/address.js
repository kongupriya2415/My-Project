 /* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
/* eslint-disable eqeqeq */
/* eslint-disable one-var */
/* eslint-disable no-var */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import {Card,CardImg,Row,Col, Button,Input, Container, Modal, ModalHeader, ModalBody, ModalFooter ,CustomInput,Form, FormGroup, Label} from 'reactstrap';
import axios from 'axios';
import $ from 'jquery'
import  './address.css'
import plus from './images/plus.png'


 function Address(props) {
     const token = localStorage.Token;
     const today = new Date()
     const [bagData,setBagData] = useState([]);
     const [newAddress,setNewAddress]=useState({})
     const [addresses,setAddresses]=useState([])
     const [updateAddress,setUpdateAddress]=useState({})
     const [deleteAddress,setDeleteAddress]=useState([])
     const [orderDetails,setOrderDetails]=useState({})
    
     const initiateDate = new Date(today)
     const deliveryDate = new Date(today)
     initiateDate.setDate(initiateDate.getDate() + 5);
     deliveryDate.setDate(deliveryDate.getDate() + 10);
     const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
     const validNum=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
     

     const totalPriceCalculation = bagData.reduce((totalPrice, data) =>
     Math.round(totalPrice + (data.product[0].old_price*data.quantity)),0);
     const offerPrice = bagData.reduce((totalPrice, data) =>
     Math.round(totalPrice +(((data.product[0].old_price*data.product[0].discount)/100)*data.quantity)),0);
     const totalPrice=Math.round((totalPriceCalculation-offerPrice));
     const total=Math.round((totalPriceCalculation-offerPrice)+168);

     const {buttonLabel,className} = props;
     const [modal, setModal] = useState(false);
     const toggle = () =>{ setModal(!modal)};

     const {addressUpdate,edit} = props;
     const [modalUpdate, setModalUpdate] = useState(false);
     const toggleUpdate = () => {
         setModalUpdate(!modalUpdate)
         setModal(modal)
        };

    console.log("Address",orderDetails)
        //   Get Bag
        if (token != ''){
            useEffect(() => 
            {
                axios.get(`http://localhost:5000/route/baggetall/${token}`)
                .then(res =>
                    {
                        console.log(res.data.data);
                         if(res.data.data=='')
                         {
                             window.location = 'http://localhost:3000/'
                        }
                        return setBagData(res.data.data)
                    })
                .catch(err=>
                {
                    console.log(err)
                })
            }, [token]);
        }
        else
        {
            return window.location ="./login"
        }
        
        

                //   Get Addresses
                if (token != ''){
                    useEffect(() => 
                    {
                        const requestOptions = {
                            method: 'get',
                            headers: { 'Content-Type': 'application/json' ,"authorization":token},
                        }
                        axios.get(`http://localhost:5000/route/getAddress`,requestOptions)
                        .then(res =>
                            {
                                console.log(res.data.data);
                                return setAddresses(res.data)
                            })
                        .catch(err=>
                        {
                            console.log(err)
                        })
                    }, [token]);
                }
                else
                {
                    return window.location ="./login"
                }

                      // Address Update
      if (token != ''){
        useEffect(() => {
            axios
            .put(`http://localhost:5000/route/updateAddress`,updateAddress)
            .then(res =>{
              console.log(res.data);
              if(res.data.data==''){
              }
              // return setBagData(res.data.data)
            })
            .catch(err=>{
              console.log(err)
            })
        }, [updateAddress]);
    }
    else{
        return window.location ="./login"
    }


        if(newAddress.name=='' || newAddress.name==undefined)
        var error='please Enter Name'
        else if(newAddress.address=='' || newAddress.address==undefined)
        var error='please Enter Address';
        else if(newAddress.phone=='' || newAddress.phone==undefined)
        var error='please Enter Phone';
        else if(! newAddress.phone.match(validNum))
        var error='please Enter valid Phone Number';
        else if(newAddress.pincode=='' || newAddress.pincode==undefined)
        var error='please Enter pincode';
        else if(newAddress.pincode.length != 6)
        var error='please Enter valid 6 letter pincode';
        else if(newAddress.state=='' || newAddress.state==undefined)
        var error='please Enter state';
        else if(newAddress.city=='' || newAddress.city==undefined)
        var error='please Enter city';
        else if(newAddress.type=='' || newAddress.type==undefined)
        var error='please Enter type';
        else if(newAddress.locality=='' || newAddress.locality==undefined)
        var error='please Enter Locality';


        useEffect(() => { 

            axios.post(`http://localhost:5000/route/Address/${token}`,newAddress )
                
                .then(data => {
                    if(data.data.message== "Sucess"){
                        window.location='/address'
                    }
                    console.log("add to bag",data.data.message)
            
            });
    
        }, [newAddress]);

       // Delete Address

       
       useEffect(() =>{
        const requestOptions = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' ,"authorization":token},
            body: JSON.stringify({
              id:deleteAddress.id })
        };
        fetch('http://localhost:5000/route/delAddress',requestOptions).then(res=>{
            console.log("delete",res)
        })
      },[deleteAddress])
      function remove()
      {
          window.location='/address'
      }
    
       
//--------------------Order Post----------------------------------
      useEffect(() => { 
        axios .post(`http://localhost:5000/route/createOrder`,orderDetails )
            
            .then(data => {
                if(data.data.data.deletedCount== 1){
                    window.location='/order'
                }
                
                console.log("Order",data.data.message)

        
        })
    }, [orderDetails]);

    function deleveryType(type)
{
    if(type=='Home')
    {
        return(
        <FormGroup tag="fieldset">
<legend>Delivery Type</legend>
     <FormGroup check>
          <Label check>
          <Input type="radio" name="type" checked value="Home" onChange={(e)=>{setUpdateAddress({...updateAddress,[e.target.name] : e.target.value})}} />{' '}
              Home
           </Label>
       </FormGroup>
       <FormGroup check>
            <Label check>
       <Input type="radio" name="type" value="Office" onChange={(e)=>{setUpdateAddress({...updateAddress,[e.target.name] : e.target.value})}}/>{' '}
          Office
       </Label>
        </FormGroup>
    </FormGroup>
        )
    }
    else{
        return(
        <FormGroup tag="fieldset">
        <legend>Delivery Type</legend>
             <FormGroup check>
                  <Label check>
                  <Input type="radio" name="type" value="Home" onChange={(e)=>{setUpdateAddress({...updateAddress,[e.target.name] : e.target.value})}} />{' '}
                      Home
                   </Label>
               </FormGroup>
               <FormGroup check>
                    <Label check>
               <Input type="radio" checked name="type" value="Office" onChange={(e)=>{setUpdateAddress({...updateAddress,[e.target.name] : e.target.value})}}/>{' '}
                  Office
               </Label>
                </FormGroup>
            </FormGroup>
        )
    }
}
        function bagItems(){
            return bagData.map(data=>{     
              return(
                <Row style={{"margin":"5px 0 10px 0"}} >
                  <Col xs="4">
                    <img src={data.product[0].filterimage[0] } height="100%" width="100%" />
                  </Col>
                  <Col xs="8">
                    <b>{initiateDate.getDate()} {monthNames[initiateDate.getMonth()]} {initiateDate.getFullYear()}</b>
                    <p style={{"color":"silver"}}><b>Eligible for Try and Buy</b></p>
                  </Col>
                </Row>
              ) })}

              const typeStyle=()=>{
                  return {
                    border: "1px double silver",
                    height: "25px",
                    marginLeft: "42px",
                    borderRadius: "11px",
                    paddingTop: "5px",
                    paddingLeft: "2px",
                    paddingRight: "2px",

               } }

        function addressItems(){
            return addresses.map(data=>{
                return(
                    <Col xs="6">
                        <Card className="addressDetails" >
                        <div style={{"lineHeight":"8px"}}>
                        <FormGroup>
                              <CustomInput type="radio" id={data._id} name="address" value={data._id} inline onChange={(e)=>{setOrderDetails({...orderDetails,[e.target.name] : e.target.value})}}><p style={{"marginTop":"8px"}}><b>{data.name}</b></p><small style={typeStyle()}>{data.type}</small></CustomInput>
                         </FormGroup>
                            
                            <p>{data.address}</p>
                            <p>{data.locality}</p>
                            <p>{data.city}-{data.pincode}</p>
                            <p>{data.state}</p><br />
                            <p>Mobile <b>{data.phone}</b></p>
                            <hr />
                            <div style={{"color":"silver","fontWeight":"900px"}} ><span onClick={()=>{setDeleteAddress({...deleteAddress,id:data._id});remove()}}>REMOVE</span>
                            <div style={{"marginLeft":"130px",display: "inline-block"}} onClick={()=>{setUpdateAddress({...updateAddress,id:data._id,name:data.name,address:data.address,phone:data.phone,pincode:data.pincode,state:data.state,locality:data.locality,city:data.city,type:data.type});{toggleUpdate()};}}>{addressUpdate} EDIT</div>
                            </div>
                            </div>
                            
                        </Card>
                    </Col>
                )
            })
        } 
                  
              
    
    return(
            <div className="address">
            <Container fluid >
                <Row>
                    <Col xs="1">

                    </Col>
                     <Col xs="6">
                         <h5>Select Delevery Address</h5>
                         <Container>
                         <Row>
                         {addressItems()}
                             <Col xs="6">
                             <Card onClick={toggle} className="newAddress">{buttonLabel}
                                <center>
                                    <img src={plus} height="70px" width="70px" />
                                    <p><b>Add New Address</b></p>
                                </center>
                                <div>
                                     <Modal isOpen={modal} toggle={toggle} className={className}>
                                        <ModalHeader toggle={toggle}>Add New Address</ModalHeader>
                                             <ModalBody>
                                             <p style={{"color":"red"}}>{error}</p>
                                             <Form className="container">
                                                <FormGroup>
                                                    <Label for="Name">Name</Label>
                                                        <Input type="text" name="name" id="name"  onChange={(e)=>{setNewAddress({...newAddress,[e.target.name] : e.target.value})}} />
                                                 </FormGroup>
                                                 
                                            <FormGroup>
                                                <Label for="Address">Address</Label>
                                                 <Input type="text" name="address" id="address" onChange={(e)=>{setNewAddress({...newAddress,[e.target.name] : e.target.value})}} />
                                             </FormGroup>
                                                 <FormGroup>
                                                    <Label for="mobile">Mobile Number</Label>
                                                        <Input type="number"name="phone" id="phone"  onChange={(e)=>{setNewAddress({...newAddress,[e.target.name] : e.target.value})}} />
                                                </FormGroup>
                                             <FormGroup>
                                                    <Label for="Pincode">Pincode</Label>
                                                     <Input type="number" name="pincode" id="pincode" onChange={(e)=>{setNewAddress({...newAddress,[e.target.name] : e.target.value})}} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="State">State</Label>
                                                 <Input type="text" name="state" id="state"  onChange={(e)=>{setNewAddress({...newAddress,[e.target.name] : e.target.value})}} />
                                             </FormGroup>
                                             <FormGroup>
                                                 <Label for="Locality">Locality</Label>
                                                  <Input type="text" name="locality" id="locality" onChange={(e)=>{setNewAddress({...newAddress,[e.target.name] : e.target.value})}} />
                                            </FormGroup>
                                            <FormGroup>
                                                 <Label for="City">City</Label>
                                                  <Input type="text" name="city" id="city" onChange={(e)=>{setNewAddress({...newAddress,[e.target.name] : e.target.value})}} />
                                            </FormGroup>
                                            <FormGroup tag="fieldset">
                                          <legend>Delivery Type</legend>
                                               <FormGroup check>
                                                    <Label check>
                                                    <Input type="radio" name="type" value="Home" onChange={(e)=>{setNewAddress({...newAddress,[e.target.name] : e.target.value})}} />{' '}
                                                        Home
                                                     </Label>
                                                 </FormGroup>
                                                 <FormGroup check>
                                                      <Label check>
                                                 <Input type="radio" name="type" value="Office" onChange={(e)=>{setNewAddress({...newAddress,[e.target.name] : e.target.value})}}/>{' '}
                                                    Office
                                                 </Label>
                                                  </FormGroup>
                                              </FormGroup>
                                    </Form>

                                             </ModalBody>
                                                  <ModalFooter>
                                                    <Button color="danger" block onClick={toggle}>Save</Button>
                                              </ModalFooter>
                                         </Modal>
                                 </div>
                             </Card>
                             </Col>
                         </Row>
    
                         </Container>
                    </Col>
                    <Col xs="3" className="details">
                        <div>
                            <CustomInput type="checkbox" id="buy" inline>
                            <h6>Try And Buy Not Available</h6></CustomInput>
                            <p>Orders below ₹1199 are not eligible</p>
                            <p style={{"color":"blue"}}><b>HOW IT WORKS</b></p>
                        </div><hr />
                        <div>
                            <p style={{"color":"silver"}}><b>CHOOSE DELIVERY SPEED</b></p>
                            <div>
                                <CustomInput type="radio" name="delivery" id="delivery"><b>Standard Delivery</b></CustomInput>
                                <p>Get it by {initiateDate.getDate()} {monthNames[initiateDate.getMonth()]} - {deliveryDate.getDate()} {monthNames[deliveryDate.getMonth()]} | Delivery Charge</p>
                                <p>₹150</p>
                                <FormGroup>
                                   <Label for="exampleSelect">Payment Mode</Label>
                                   <Input type="select" name="paymentMode" id="paymentMode" onChange={(e)=>{setOrderDetails({...orderDetails,[e.target.name] : e.target.value})}}>
                                      <option value="Online">Online</option>
                                      <option value="Cash on Delivery">Cash on Delivery</option>
                                      <option value="Card on Delivery">Card on Delivery</option>
                                    </Input>
                                 </FormGroup>
                            </div><hr />
                        </div>
                        <div>
                        <p style={{"color":"silver"}}><b>ESTIMATED DELIVERY DATES</b></p>
                        {bagItems()}
                        </div>
                        <div>
                            <p><b>PRICE DETAILS</b></p>
                            <hr />
                            <Row>
                                <Col xs="9">
                                    <p>Order Total</p>
                                    <p>Delivery Charges</p>
                                </Col>
                                <Col xs="3">
                                <p>₹{totalPrice}</p>
                                <p>₹150</p>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col xs="9">
                                <p><b>Total</b></p>
                                </Col>
                                <Col xs="3">
                                <p><b>₹{total}</b></p>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Button color="danger" size="lg" block onClick={(e)=>{
                                if(orderDetails.address=='' || orderDetails.address==undefined)
                                alert("Plese Select Address")
                                else if(orderDetails.paymentMode=='' || orderDetails.paymentMode==undefined)
                                alert("Please slelect Payment Mode")
                                else
                                setOrderDetails({...orderDetails,token : token,deliveryDate:deliveryDate})
                                }}>CONTINUE</Button>
                        </div>
                    </Col>
                    <Col xs="2">
               
                    </Col>
                </Row>
                </Container>
                <div>
                            <Modal isOpen={modalUpdate} toggle={toggleUpdate} className={edit}>
                                        <ModalHeader toggle={toggleUpdate}>Update Address</ModalHeader>
                                             <ModalBody>
                                             <Form className="container">
                                             <FormGroup>
                                                 <Label for="Name">Name</Label>
                                                  <Input type="text" name="name" id="name" value={updateAddress.name} onChange={(e)=>{setUpdateAddress({...updateAddress,[e.target.name] : e.target.value})}} />
                                            </FormGroup>                                               
                                                 <FormGroup>
                                                 <Label for="Address">Address</Label>
                                                  <Input type="text" name="address" id="address" value={updateAddress.address} onChange={(e)=>{setUpdateAddress({...updateAddress,[e.target.name] : e.target.value})}} />
                                            </FormGroup>
                                                 <FormGroup>
                                                    <Label for="mobile">Mobile Number</Label>
                                                        <Input type="number"name="phone" id="phone" value={updateAddress.phone} onChange={(e)=>{setUpdateAddress({...updateAddress,[e.target.name] : e.target.value})}} />
                                                </FormGroup>
                                             <FormGroup>
                                                    <Label for="Pincode">Pincode</Label>
                                                     <Input type="number" name="pincode" id="pincode" value={updateAddress.pincode} onChange={(e)=>{setUpdateAddress({...updateAddress,[e.target.name] : e.target.value})}} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="State">State</Label>
                                                 <Input type="text" name="state" id="state" value={updateAddress.state} onChange={(e)=>{setUpdateAddress({...updateAddress,[e.target.name] : e.target.value})}} />
                                             </FormGroup>
                                             <FormGroup>
                                                 <Label for="Locality">Locality</Label>
                                                  <Input type="text" name="locality" id="locality" value={updateAddress.locality} onChange={(e)=>{setUpdateAddress({...updateAddress,[e.target.name] : e.target.value})}} />
                                            </FormGroup>
                                            <FormGroup>
                                                 <Label for="City">City</Label>
                                                  <Input type="text" name="city" id="city" value={updateAddress.city} onChange={(e)=>{setUpdateAddress({...updateAddress,[e.target.name] : e.target.value})}} />
                                            </FormGroup>
                                            {deleveryType(updateAddress.type)}
                                      
                                    </Form>

                                             </ModalBody>
                                                  <ModalFooter>
                                                    <Button color="danger" block onClick={()=>{toggleUpdate;window.location='/address'}}>Save</Button>
                                              </ModalFooter>
                                         </Modal>
                            </div>

             </div>



     )
     
    }

  export default Address;
