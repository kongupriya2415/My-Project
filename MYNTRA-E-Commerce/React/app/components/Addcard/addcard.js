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
import {Card,CardImg,Row,Col, Button,Input} from 'reactstrap';
 import axios from 'axios';
 import $ from 'jquery'
 import  './cart.css'

 function bags(props) {
     const token = localStorage.Token;
     const[bagData,setBagData] = useState([]);
     const count = bagData.length; 
      const[product,setProduct] = useState([]);
      const[productSize,setProductSize] = useState([]);
        const [size,sizeUpdate]=useState([])
const totalPriceCalculation = bagData.reduce((totalPrice, data) =>
Math.round(totalPrice + (data.product[0].old_price*data.quantity)),0);
const offerPrice = bagData.reduce((totalPrice, data) =>
Math.round(totalPrice +(((data.product[0].old_price*data.product[0].discount)/100)*data.quantity)),0);

const total=Math.round((totalPriceCalculation-offerPrice)+168);

console.log("BAG",size)

function items(){
  if(count==1)
  return "item"
  else
  return "items"
}
    //   get product
    if (token != ''){

        useEffect(() => {

            axios.get(`http://localhost:5000/route/baggetall/${token}`)
            .then(res =>{
              console.log(res.data.data);

              if(res.data.data==''){
              window.location = 'http://localhost:3000/'
              }
              return setBagData(res.data.data)
            })
            .catch(err=>{
              console.log(err)
            })
        }, [token]);
    }
    else{
        return window.location ="./login"
    }

    // delete page
    if(productSize.token != '' || productSize.token != undefined){
      console.log("Token",productSize._id)
      const requestOptions = {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' ,"Authorization":productSize.token,},
        body: JSON.stringify({
          _id:productSize._id,
          product: productSize.Product,
        token:productSize.token })
    };
      useEffect(() =>{
        fetch(`http://localhost:5000/route/delitem`,requestOptions)
          .then(res=>{
              alert(res.data.message)
              window.location = `http://localhost:3000/cart`
          })
          .catch(err =>{
              console.log(err)
              window.location = `http://localhost:3000/cart`

          })
      },[productSize])
      }
      // Quantity Update
      if (token != ''){
        useEffect(() => {
            axios
            .put(`http://localhost:5000/route/qtyUpdate`,product)
            .then(res =>{
              console.log(res.data.data);
              window.location = `http://localhost:3000/cart`
              if(res.data.data==''){
              window.location = 'http://localhost:3000/'
              }
              // return setBagData(res.data.data)
            })
            .catch(err=>{
              console.log(err)
            })
        }, [product]);
    }
    else{
        return window.location ="./login"
    }

 // Size Update
 if (token != ''){
  useEffect(() => {
      axios.put(`http://localhost:5000/route/sizeUpdate`,size)
      .then(res =>{
        console.log(res.data.data);
        window.location = `http://localhost:3000/cart`
        if(res.data.data==''){
        window.location = 'http://localhost:3000/'
        }
      })
      .catch(err=>{
        console.log(err)
      })
  }, [size]);
}
else{
  return window.location ="./login"
}


    function bagItems(){

      return bagData.map(data=>{

        return(

          <Row className="products" >
            <Col xs="3">

              <img src={data.product[0].filterimage[0] } height="100%" width="100%" />
            </Col>
            <Col xs="6" style={{"marginTop":"20px","color":"grey"}}>
              <h5>{data.product[0].product_name}</h5>
              <p>sold By : {data.product[0].sold_by}</p>
              Size: <select onChange={async (e) =>{sizeUpdate({id:data._id, size:(e.target.value)})}}>
              <option selected>{data.size}</option>
              {data.product[0].size.map(function (item) {
                  return (
                      <option key={item.id}>{item}</option>
                  );
                })} </select> &nbsp;&nbsp;&nbsp;
                Qty:
                <select onChange={async (e) =>{setProduct({id:data._id, quantity:Number(e.target.value)})}}>
                <option value={data.quantity} selected>{data.quantity}</option>
                  <option value="1" >1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <hr></hr>
                <div className="buttons"><p style={{"color":"grey"}} onClick={()=>{setProductSize({ ...productSize ,Product:data.product[0]._id,_id:data._id,token:token})}}>REMOVE</p>|<p style={{"color":"blue"}}>MOVE TO WHISHLIST</p></div>
            </Col>
            <Col xs="3" style={{"marginTop":"20px","color":"grey"}}>
            <h5>₹{data.product[0].price}</h5>
              <h5><strike>₹{data.product[0].old_price}</strike>&nbsp;|&nbsp;<span style={{"color":"red"}}>{data.product[0].discount}<small><b>%OFF</b></small></span></h5>
            </Col>


          </Row>

        )

      })
    }
return(
  <div>

  <div className="container cart">

<Row>
  <Col xs="7">
  <div className="offers">
    <p>Offers</p>
    <li>10% SuperCash on MobiKit Wallet.TCA</li>
    <li>Flat Rs 200 Cashback on Airtel Payment Bank. TCA</li>
  </div>
  <div className="heading">
    <h5>My Shopping Bag ({count} {items()})</h5>
    <h5 style={{"marginLeft":"200px"}}>Total:₹{total}</h5>
  </div>
{bagItems()}
  </Col>
  <Col xs="4" className="cartCalculation">
    <p><b>OPTIONS</b></p>
    <Row>
      <Col xs="6">
      <p><b>Coupons</b></p>
      </Col>
      <Col xs="6">
          <Button outline color="info">APPLY</Button>
      </Col>
    </Row>
    <hr />
    <Row>
      <Col xs="6">
      <p><b>Gift Wrap For ₹25 </b></p>
      </Col>
      <Col xs="6">
      <Input type="checkbox" />
      </Col>
     <Col> <p>Cash/Card on Delivery not available</p></Col>
    </Row>
    <hr />


    <Row>
      <Col xs="6">
      <p>Total MRP</p>
    <p>Bag Discount</p>
    <p>Estimated Tax</p>
    <p>Coupoun Discount</p>
    <p>Delivery Charges</p>
    <hr></hr>
      <p><b>Total</b></p>
      </Col>
      <Col xs="6" className="right">
        <p>₹{totalPriceCalculation}</p>
        <p style={{"color":"#14cda8"}}>-₹{offerPrice}</p>
        <p>₹18</p>
        <p style={{"color":"blue"}}>Apply Coupoun</p>
        <p>₹150</p>
        <hr></hr>
        <p><b>₹{total}</b></p>
      </Col>
    </Row>
    <Col>
    <Button color="danger" size="lg" block onClick={()=>window.location='/address'} >PLACE ORDER</Button>

    </Col>
  </Col>
  <Col xs="1"></Col>
</Row>
  </div>
  </div>
)
 }

  export default bags;
