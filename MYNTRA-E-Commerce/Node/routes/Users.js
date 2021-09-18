
 const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const controller = require('./../Controllers/controller');
const addcontrollers = require('./../Controllers/addcontroler');
const address=require('../Controllers/addresscontrolar')
const orderController=require('../Controllers/orderController')

const auth=passport.authenticate('jwt', {session:false});
const {check,validationResult} =require('express-validator')


router.post('/image',controller.postSlickImage)
router.get('/slick',controller.getSlickImage)


router.post('/registerdetails',[
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 8 })
  ],controller.register)

router.post('/login',[
    // username must be an email
    check('email','Enter Valid Email Id').isEmail().withMessage('Email Field is Required'),
    // password must be at least 5 chars long
    check('password').isLength({ min: 8 }).withMessage('Minimum 8 Charecter is Required')
  ],controller.login);
router.get('/profile',controller.profile)
router.put('/editProfile',controller.editProfile)

router.post('/postGalleryImage',controller.postGalleryImage)
router.get('/getGalleryImage',controller.getGalleryImage)

// create filter
router.post('/filter',addcontrollers.Filter); 
//  getall
router.get('/getallfilter',addcontrollers.getallfilter);
// read filter
router.post('/getfilter',addcontrollers.getfilter);
//  get product
router.get('/getproduct/:product_code',addcontrollers.getprodect);
//   add card
router.post('/addcard',addcontrollers.Adcard);
//  get add card
router.get('/baggetall/:token',addcontrollers.bagall);
// delete item 
router.delete('/delitem',addcontrollers.delitem);
//Update quantity
router.put('/qtyUpdate',addcontrollers.qtyUpdate);
//Size Update
router.put('/sizeUpdate',addcontrollers.sizeUpdate);
// post address
router.post('/Address/:token',address.create);
// get address
router.get('/getAddress',address.getAddress);
// findone address
router.post('/oneAddress',address.oneAddress);
// update
router.put('/updateAddress',address.updateAddress);
// delete
router.delete('/delAddress',address.delAddress);
//User Order List
router.post("/createOrder", orderController.createOrder); //Posr Order
router.post("/getOrder", orderController.getOrder); //Get Order By UserID
router.post("/getOrderByProductId/:productId", orderController.getOrderByProductId); //Get Order By ProductId
router.post("/getOrderByOrderId/:orderId", orderController.getOrderByOrderId); //Get Order By OrderId
router.put("/cancelOrder", orderController.cancelOrder); //Put Order(cancel order)
router.delete("/deleteOrder", orderController.deleteOrder); //delete Order
module.exports=router