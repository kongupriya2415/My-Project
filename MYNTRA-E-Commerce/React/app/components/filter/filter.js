/* eslint-disable arrow-body-style */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from "react";
import {Card,CardBody,CardTitle,CardImg,CardText,Button,Label,Form,Progress , FormGroup,Input,Row,Col,CardFooter} from 'reactstrap';
import axios from 'axios';
import './filter.css';
import $ from 'jquery';

function  Filter(){
   const [filterimage,setfilterimage]=useState([]);
   const [user,setUser]=useState([]);
   const [price,setPrice]=useState(10);
   const [categories,setCategories]=useState([])
   const [check,setCheck]=useState( )

    async function  catagries (e){
     if(e.target.checked){
      await setCategories([...categories, e.target.value])
     }
     else{
      let name = e.target.value;
      await setCategories(categories.filter((e)=>(e !== name)))
     }
   }
   useEffect(() => {
    if (categories.length > 0) {
      setUser({...user,catagries: { $in: categories } })
    } else {  
      setUser([])
    }
  }, [categories.length]);
   
   function onChange(e){
   setUser({...user,[e.target.name]:e.target.value})
     }

      function allClear(e){
      setUser([])    
        $('input[type="radio"]').prop("checked", false);
        $('input[type="checkbox"]').prop("checked", false);
       }

       if(user.product_name!='' || user.catagries!=''|| user.color!='' || user.discount!=''|| user.price!='' ){
            useEffect (()=>{
              axios
              .post("http://localhost:5000/route/getfilter",{...user})
              .then(res =>{
                // console.log("1",res);
                setfilterimage(res.data);
              })
              .catch(err=>{
                // console.log(err)
              })
            },[user]);
          }
          else{
            useEffect(()=>{
              axios
              .get('http://localhost:5000/route/getallfilter')
              .then(res=>{
                // console.log("product",res);
                setfilterimage(res.data)
              })
              .catch(err=>{
                // console.log(err)
              })
            },[]);
          }
         function productimg(){
  return filterimage.map(data =>{
    return (
      <Col lg="3">
      <Card className="hovereffect">
      <a href={`products/${data.product_code}` } style={{color:"grey",fontWeight:"500",textDecoration:"none"}}>
       <CardImg className="img-responsive" src={data.filterimage[0]}></CardImg>
         <CardText className="img-responsive">{data.product_name} </CardText>
         <CardText className="img-responsive"> Rs.{data.price} <span style={{textDecoration:"line-through",color:"orange"}}>Rs.({data.old_price})</span></CardText>
       <CardFooter className="overlay">
             <h2><Button color="danger" >Add Cart</Button></h2>
             <h2><Button color="danger">Buy Now</Button></h2>
         </CardFooter>
         </a>
      </Card>

   </Col>
    )
  });
}

return(
        <div className="container-fluid filter">

               <p style={{marginLeft:20,marginTop:20}}>Western Wear Dresses Menu - <span>27886 items</span></p>
               <h4 style={{marginLeft:20}}>FILTERS</h4><hr style={{width:"100%"}}/><Button color="danger" className="clearall" id="all" type="button"  value="" onClick={allClear}>CLEAR ALL</Button><br/>
               <Row>
               <Col xs="2">
               <Form className="rtcol">
               <FormGroup className="CATEGORIES" check>
                 <Label check><b>CATEGORIES</b></Label><br/>

                <Input type="checkbox" name="catagries" value="Lehenga Choli" onChange={catagries}/>{' '}Racers kurta(2632)<br/>
                <Input type="checkbox" name="catagries" value="Dresses" onChange={catagries}/>{' '}Dresses(185)<br/>
                <Input type="checkbox" name="catagries" value="Kurta" onChange={catagries} />{' '}Kurtas(25064)<br/>
                <Input type="checkbox" name="catagries" value="Saree"  onChange={catagries}/>{' '}Sarees(5)
             <hr />
               <Label className="filterbrand" check><b>BRAND</b></Label><br/>
                <Input type="text" className="brandinput" style={{display:"none"}}/>
                <Input type="radio" name="product_name" value="W" onChange={onChange} />{' '}RS(1464)<br/>
                <Input type="radio" name="product_name" value="Chhabra 555" onChange={onChange} />{' '}Cindrella(1405)<br/>
                <Input type="radio" name="product_name" value="Anouk" onChange={onChange} />{' '}Anjali(1081)<br/>
                <Input type="radio" name="product_name" value="LOCOMOTIVE" onChange={onChange} />{' '}Royal(1030)<br/>
               <br/>
            <hr />
            <Label className="filterprice" check><b>PRICE</b></Label><br/>
            <Progress animated color="danger" value={price} />
            <small> 1000 - {price*100}</small><br />
            <Button color="danger" style={{marginRight:"20px"}} onClick={()=>{
              if(price>=100)
                setPrice(price)
              else{
              setPrice(price+10);
              setUser({...user,price:{'$gte':1000,'$lte':price*100+1000}})
            }}}>+</Button>
            <Button color="danger" onClick={()=>{
              if(price<=10)
              setPrice(price)
              else{
              setPrice(price-10);
              setUser({...user,price:{'$gte':1000,'$lte':price*100}})
              
              }}}>&nbsp;-</Button>
            <hr />

                <Label className="filterprice" check><b>PRICE</b></Label><br/>
                <Input type="radio" name="price" onChange={(e)=>{setUser({...user,price:{'$gte':1001,'$lte':3000}})}} />Rs. 1000 to Rs. 3000<br/>
                <Input type="radio" name="price" onChange={(e)=>{setUser({...user,price:{'$gte':3001,'$lte':5000}})}}/>Rs. 3001 to Rs. 5000(8)<br/>
                <Input type="radio" name="price" onChange={(e)=>{setUser({...user,price:{'$gte':5001,'$lte':10000}})}}/>Rs. 5001 to Rs. 10000(2)<br/>
                <br/>
                <hr/>
                <Label check className="brand"><b>COLOR</b></Label><br/>
                <div style={{display:"flex"}}><Input type="radio" name="color" value="Black" onChange={onChange} inline></Input>{' '}<div style={{backgroundColor:"rgb(241, 169, 196)",height:"13px",width:"13px",borderRadius:"50%",margin:"5px"}}></div>Pink (6251)</div>
                <div style={{display:"flex"}}><Input type="radio" name="color" value="Maroon" onChange={onChange} />{' '}<div style={{backgroundColor:"rgb(176, 48, 96)",height:"13px",width:"13px",borderRadius:"50%",margin:"5px"}}></div>Maroon (2893)</div>
                <div style={{display:"flex"}}><Input type="radio" name="color" value="Pink" onChange={onChange} />{' '}<div style={{backgroundColor:"yellow",height:"13px",width:"13px",borderRadius:"50%",margin:"5px"}}></div>Pink (3005)</div>
                <div style={{display:"flex"}}><Input type="radio" name="color" value="white" onChange={onChange} />{' '}<div style={{backgroundColor:"white",height:"13px",width:"13px",borderRadius:"50%",margin:"5px",border:"1px solid silver"}}></div>White (1777)</div>
                <div style={{display:"flex"}}><Input type="radio" name="color" value="Grey" onChange={onChange} />{' '}<div style={{backgroundColor:"grey",height:"13px",width:"13px",borderRadius:"50%",margin:"5px"}}></div>Grey (1407)</div>
                <div style={{display:"flex"}}><Input type="radio" name="color" value="Green" onChange={onChange} />{' '}<div style={{backgroundColor:"green",height:"13px",width:"13px",borderRadius:"50%",margin:"5px"}}></div>Green (1313)</div>
                <br/>
                <hr/>
                <Label check><b>DISCOUNT RANGE</b></Label><br/>
                <Input type="radio" name="discount" value="10" onChange={onChange} />{' '}10% and above<br/>
                <Input type="radio" name="discount" value="20" onChange={onChange} />{' '}20% and above<br/>
                <Input type="radio" name="discount" value="30" onChange={onChange} />{' '}30% and above<br/>
                <Input type="radio" name="discount" value="40" onChange={onChange} />{' '}40% and above<br/>
                <Input type="radio" name="discount" value="50" onChange={onChange} />{' '}50% and above<br/>
                <br/>
                </FormGroup>
              </Form>
                </Col>
                <Col xs="10">
                <Row >
                {productimg()}
                </Row>
                <br/>
                </Col>
              </Row>

        </div>
      );

}
  export default Filter
