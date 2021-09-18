import React, { useState, useEffect } from "react";
import {Card,CardImg,Row,Col, Button,Input, Container, Modal, ModalHeader, ModalBody, ModalFooter ,CustomInput,Form, FormGroup, Label} from 'reactstrap';
import axios from 'axios';
import $ from 'jquery'
import  './order.css'
import SideNav from '../Order/sideNav'
import { useParams} from "react-router";

var jwt = require("jsonwebtoken");

function order() {
    const [order,setOrder]=useState([])
  let { orderId } = useParams();
    const token = localStorage.Token;
    var decoded = jwt.decode(token);
    const email=decoded.email
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    var count=0
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };




    //------------------------------Get Order------------------------------
    if (token != ''){
        useEffect(() => 
        {
            axios.post(`http://localhost:5000/route/getOrderByOrderId/${orderId}`,{token})
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

    function item(count){
        if(count<=1)
            return "Item"
        else
            return "Items"
      }

        function orderDetails(){
            return order.map(order=>{
                return (
                    <div className="order">
                    <Row><Col xs="4">
                        <p style={{color:"silver"}}>Shipment {count+1}</p>
                        <b>Rs {order.Product[0].product.price}</b>
                    </Col>
                    <Col xs="4">
                        <p>Status</p>
                        <b><span style={{color:"#14cda8"}}>{order.status}</span></b>
                    </Col>
                    <Col xs="4">
                        <p>{item(order.Product[0].quantity)}</p>
                        <b>{order.Product[0].quantity}</b>
                    </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs="3">
                        <a href={`products/${order.Product[0].product.product_code}`}><img src={order.Product[0].product.filterimage[0]} height="120px" /></a>
                        </Col>
                        <Col xs="3">
                            <b>{order.Product[0].product.product_name}</b>
                            <p>{order.Product[0].product.shop_name}</p>
                            <p>Size:{order.Product[0].productSize} / Qty:{order.Product[0].quantity}</p>
                            <p>Code: {order.Product[0].product.product_code}</p>
                        </Col>
                        <Col xs="3">
                            <b>Rs.  {order.Product[0].product.price}</b>
                        </Col>
                        <Col xs="3">
                            <p><span style={{color:"rgb(247, 200, 71)"}}>Please Note:</span>You Cannot return or exchange this as the day 30 return period has expired <span style={{color:"rgb(106, 184, 204)"}}>(?)</span> </p>
                            </Col>
                    </Row>
                         </div>
                )
            })
        }
        function additionalDetails(){
            return order.map(order=>{
                return (
                    <div className="order" style={{height:"305px"}}>
                    <p>Order No : {order.orderId}</p>
                    <p>Order Placed : {(new Date(order.date)).toLocaleDateString('en-US', DATE_OPTIONS)}</p>
                    <hr />
                    <p>Total Amount :<br /><b>{order.Product[0].product.price}</b> </p><br />
                    <p><b>Shipping Address: <br /></b>
                    {order.address.name}, {order.address.address}....</p><br />
                    <p>Payment Mode: <br />{order.paymentStatus}</p>
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
                    <p style={{color:"grey",textDecoration:"underline",marginBottom:"10px"}}>ORDER DETAILS</p>
                    {additionalDetails()}
                </Col>
                <Col xs="1"></Col>

            </Row>
            </Container>
        </div>
    )
}

export default order;
