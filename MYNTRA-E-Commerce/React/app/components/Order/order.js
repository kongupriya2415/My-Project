import React, { useState, useEffect } from "react";
import {Card,CardImg,Row,Col, Button,Input, Container, Modal, ModalHeader, ModalBody, ModalFooter ,CustomInput,Form, FormGroup, Label} from 'reactstrap';
import axios from 'axios';
import $ from 'jquery'
import  './order.css'
import SideNav from '../Order/sideNav'
var jwt = require("jsonwebtoken");

function order() {
    const [order,setOrder]=useState([])
    const [deleteOrder,setDeleteOrder]=useState([])
    const token = localStorage.Token;
    var decoded = jwt.decode(token);
    const email=decoded.email
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    var count= 1
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    console.log("Delete",deleteOrder)


    //------------------------------Get Order------------------------------
    if (token != ''){
        useEffect(() => 
        {
            axios.post(`http://localhost:5000/route/getOrder`,{token})
            .then(res =>
                {
                    console.log(res.data);
                    return setOrder(res.data.data)
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


     // Delete Address

       
     useEffect(() =>{
        const requestOptions = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' ,"authorization":token},
            body: JSON.stringify({
              id:deleteOrder.id })
        };
        fetch('http://localhost:5000/route/deleteOrder',requestOptions).then(res=>{
            console.log("delete",res)
        })
      },[deleteOrder])
      function remove(){
          return window.location='order'
      }
      function item(count){
        if(count<=1)
            return "item"
        else
            return "items"
      }

        function orderDetails(){
            return order.map(order=>{
                return (
                    <div className="order">
                        <b><span style={{color:"#14cda8"}}>{order.status}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Order No:{order.orderId}</span></b>
                        <p>Placed on {(new Date(order.date)).toLocaleDateString('en-US', DATE_OPTIONS)} / Rs. {order.Product[0].product.price} / {order.Product[0].quantity} {item(order.Product[0].quantity)}</p>
                        <hr />
                        <b style={{display:"flex"}}>Shipment {count++} : {order.Product[0].quantity} {item(order.Product[0].quantity)} | Delivered on {(new Date(order.deliveryDate)).toLocaleDateString('en-US', DATE_OPTIONS)}
                        <a style={{marginLeft:"100px",color:"rgb(52, 177, 199)"}} href={`order/${order.orderId}`}>View Details</a></b><br />
                        <a href={`products/${order.Product[0].product.product_code}`}><img src={order.Product[0].product.filterimage[0]} height="100px" style={{float:"left"}} /></a>
                        <div style={{"color":"silver",marginLeft:"500px",cursor:"pointer"}} ><b onClick={()=>{setDeleteOrder({...deleteOrder,id:order._id});remove();}}>REMOVE</b></div>
                        
                     </div>
                ) 
            })
        }
 
    return (
        <div className="orderDetails">
        <Container>
            <Row>
            <Col xs="1"></Col>
                <Col xs="10">
                    <h4>Account</h4>
                    <small>{email}</small>
                    <hr />
                </Col>
                  <Col xs="1"></Col>
            </Row>
            <Row>
            <Col xs="1"></Col>

            <Col xs="2" className="margin">
                <SideNav />
                </Col>
                <Col xs="8">
                    {orderDetails()}
                </Col>
                <Col xs="1"></Col>

            </Row>
            </Container>
        </div>
    )
}

export default order;
