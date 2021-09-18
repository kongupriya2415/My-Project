/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-sequences */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-alert */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Card, CardImg, Row, Col,Button } from 'reactstrap';
import axios from 'axios';
import $ from 'jquery'
import '../products/products.css';
import { useParams} from "react-router";
function Product(props) {
  // const { match } = props
  const token=localStorage.Token
  // const { product_code } = match.params
  let { product_code } = useParams();
  const [filterimage, setfilterimage] = useState([]);
  const [id, setId] = useState({token});
  const [sizedata, setSizeData] = useState([]);

  // product details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/route/getproduct/${product_code}`)
      .then(res => {
        console.log("product", res.data);
        setfilterimage(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [product_code]);

  console.log('id',id);

  // go to bag
  // useEffect(() => {
  //   axios
  //     .post(`http://localhost:5000/users/addcard`, { ...id
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //       alert(res.data.message);
  //       return setSizeData(res.data.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }, [id])
  useEffect(() => {

        axios.post('http://localhost:5000/route/addcard', id)
            .then(response => response.json())
            .then(data => console.log("add to bag",data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [id]);

  // wistlist
  function Bag() {
    // eslint-disable-next-line eqeqeq
    if (id.size == undefined) {
      alert("click product size")

    }
      else if (token == undefined || token == "") {
        return window.location = "./login"
      }



    else {


      $("#addcard").hide(100);
      $('#gobag').show(100);
    }
    // if (id.size) {
    //   // go to bag

    //   alert(id.size)
    // }
  }

  const Gotoback = () => {
    return window.location = "/cart"
  }
  // size

  function prdimg(images) {
    return images.map(data => (
      <Col lg="6" key={data}>
        <Card className="gallerycard">
          <CardImg className="galleryimg" alt="" src={data} />
        </Card>
      </Col>
    ));
  }
  return (
    <div className="container-fluid product">
      {filterimage.map(data => (
        <div>
          <div className="row" >
            <Col xs="6">
              <Row >
                {prdimg(data.filterimage)}
              </Row>
              <br />
            </Col>
            <Col xs='6' style={{ marginTop: "43px" }}>
              <h3>{data.product_name}</h3>
              <h4 style={{ color: "grey" }}>{data.catagries}</h4>
              <hr style={{ width: "99%" }} />
              <h4 style={{ display: "flex" }}>Rs.{data.price} &nbsp;&nbsp;<div style={{ textDecoration: " line-through", color: "grey" }}> Rs. {data.old_price}</div><div style={{ color: "#ff905a" }}>({data.discount}% OFF)</div></h4>
              <div style={{ color: "#03a685" }}>inclusive of all taxes</div><br />
              <div><b>SELECT SIZE</b></div>
              <div><span className="sizespan">
                <button  className="btn btn-outline-primary buttonss" name="size" onClick={() => { setId({ ...id, size: data.size[0] }) }}>{data.size[0]}</button>
                <button  className="btn btn-outline-secondary buttonss" name="size" id={data} value={data} onClick={() => { setId({ ...id, size: data.size[1] }) }}>{data.size[1]}</button>
                <button  className="btn btn-outline-success buttonss" name="size" id={data} value={data} onClick={() => { setId({ ...id, size: data.size[2] }) }}>{data.size[2]}</button>
                <button  className="btn btn-outline-info buttonss" name="size" id={data} value={data} onClick={() => { setId({ ...id, size: data.size[3] }) }}>{data.size[3]}</button>
              </span></div>
              <br />
              <Button className="fa fa-shopping-bag  buttonss1" color="danger" id="addcard" type="submit" onClick={async () => { await setId({ ...id, product: data._id}), await Bag() }}>ADD TO BAG</Button>
              <Button className="fa fa-shopping-bag  buttonss1" color="danger" id="gobag" type="submit" style={{ display: "none" }} onClick={Gotoback}>GO TO BAG</Button>
              <Button className="buttonss1" color="secondary" type="submit">WHISHLIST</Button>
              <br />
              <hr style={{ width: "99%" }} />
              <h5>PRODUCT DETAILS</h5>
              <div >{data.product_details}</div><br />
              <hr style={{ width: "99%" }} />
              <h6>DELIVERY OPTIONS</h6> 


              <p>Tax: Applicable tax on the basis of exact location & discount will be charged at the time of checkout</p>
              <p>100% Original Products</p>
              <p>Cash on delivery might be available</p>
              <p>Sold by:<a href=""><b> {data.sold_by}</b></a>( Supplied By Partner )</p>
            </Col>
          </div>
        </div>))}
    </div>
  );
}
export default Product;

