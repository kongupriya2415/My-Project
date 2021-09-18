import React from "react";
import { Jumbotron, Container } from "reactstrap";
import { Row, Col } from "reactstrap";
import "./footer.css";
import { Badge } from "react-bootstrap";
import facebooklogo from "./images/facebook.png"
import twitter from "./images/twitter_logo.png"
import youtube from './images/YOUTUBE.png';
import insta from './images/insta.png';
import original from './images/original-stamp.png';
import truck from './images/truck.png';
import days from './images/30days.png';

// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Jumbotron fluid>
          <Container fluid className="text-center text-md-left">
            <Row>
              <Col XS lg="1" />
              <Col XS lg="2">
                <ul className="list-unstyled">
                  <p>
                    <b>ONLINE SHOPPING</b>
                  </p>
                  <li>
                    <a href="#men">Men</a>
                  </li>
                  <li>
                    <a href="#women">Women</a>
                  </li>
                  <li>
                    <a href="#kids">Kids</a>
                  </li>
                  <li>
                    <a href="#home&living">Home & Living</a>
                  </li>
                  <li>
                    <a href="#discover">Discover</a>
                  </li>
                  <li>
                    <a href="#gift cards">Gift Cards</a>
                  </li>
                  <li>
                    <a href="#insider">
                      Myntra Insider<Badge variant="danger">New</Badge>
                    </a>
                  </li>
                </ul>
              </Col>
              <Col XS lg="2">
                <ul className="list-unstyled">
                  <p>
                    <b>USEFUL LINKS</b>
                  </p>
                  <li>
                    <a href="#contact us">Contact Us</a>
                  </li>
                  <li>
                    <a href="#faq">FAQ</a>
                  </li>
                  <li>
                    <a href="#t&c">T & C</a>
                  </li>
                  <li>
                    <a href="#terms">Terms Of Use</a>
                  </li>
                  <li>
                    <a href="#track">Track Orders</a>
                  </li>
                  <li>
                    <a href="#shipping">Shipping</a>
                  </li>
                  <li>
                    <a href="#cancellation">Cancellation</a>
                  </li>
                  <li>
                    <a href="#returns">Returns</a>
                  </li>
                  <li>
                    <a href="#whitehad">Whitehad</a>
                  </li>
                  <li>
                    <a href="#blog">Blog</a>
                  </li>
                  <li>
                    <a href="#careers">Careers</a>
                  </li>
                  <li>
                    <a href="#privacy">Privacy policy</a>
                  </li>
                </ul>
              </Col>
              <Col XS lg="3">
                <ul className="list-unstyled">
                  <p>
                    <b>EXPERIENCE MYNTRA APP ON MOBILE</b>
                  </p>
                  <li>
                    <img
                      className="play"
                      alt="google play"
                      src="https://assets.myntassets.com/assets/images/retaillabs/2018/10/16/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png"
                    />
                    <img
                      className="ios"
                      alt="ios"
                      src="https://assets.myntassets.com/assets/images/retaillabs/2018/10/16/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png"
                    />
                  </li>
                  <p>
                    <b>KEEP IN TOUCH</b>
                  </p>
                  <li>
                    <img className="icon" src={facebooklogo} />
                    <img className="icon" src={twitter} />
                    <img className="icon" src={youtube} />
                    <img className="icon" src={insta} />
                  </li>
                </ul>
              </Col>
              <Col XS lg="3">
                <ul className="list-unstyled">
                  <li>
                    <strong>
                      <img src={original} className="icons" />
                      100% ORIGINAL
                    </strong>
                    guarantee for all products at myntra.com
                  </li>
                  <li>
                    <strong>
                    <img src={days} className="icons"/>
                      Return within 30days{' '}
                    </strong>
                    of receiving your order
                  </li>
                  <li>
                    <strong><img src={truck} className="icon"/>Get free delivery </strong>for every order above
                    Rs.1199
                  </li>
                </ul>
              </Col>
              <Col XS lg="1" />
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
export default footer;
