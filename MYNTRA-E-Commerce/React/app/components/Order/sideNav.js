import React, { useState, useEffect } from "react";
import {Card,CardImg,Row,Col, Button,Input, Container, Modal, ModalHeader, ModalBody, ModalFooter ,CustomInput,Form, FormGroup, Label} from 'reactstrap';
import axios from 'axios';
import $ from 'jquery'
import  './order.css'
function sideNav() {
    const token = localStorage.Token;

    return (
        <div className="sideNav">
        
      
                    <p>Overview</p>
                   <hr />
                   <p>ORDERS</p>
                   <p style={{fontWeight:"700",color:"#14cda8"}}>Orders&Returns</p>
                   <hr />
                   <p>CREDITS</p>
                   <p>Coupuns</p>
                   <p>Myntra Credit</p>
                   <p>Myntra Points</p>
                   <hr />
                   <p>ACCOUNT</p>
                   <p>Profile</p>
                   <p>Saved Cards</p>
                   <p>Addresses</p>
                   <p>Myntra Insider</p>
           
        </div>
    )
}

export default sideNav;
