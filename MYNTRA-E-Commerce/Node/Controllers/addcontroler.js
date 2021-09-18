const bcrypt = require('bcryptjs');
const Addcard = require('../models/addcard');
const Filter = require('../models/filter');
const register = require('../models/register'); 

const jwt = require("jsonwebtoken");


const Filter_product = async (req, res) => {
   
   var decoded = jwt.verify(req.headers['authorization']||req.body.token, process.env.SECRET_KEY)
 register.findOne({
   _id: decoded._id
 }).then(user => {
     if (user) {
       Filter.findOne({product_code:req.body.product_code})
       .then(data=>{
         if(!data){
   const userData = {
       user:decoded._id,
       filterimage: req.body.filterimage,
       product_name: req.body.product_name,
       shop_name: req.body.shop_name,
       price: req.body.price,
       color:req.body.color,
       size:req.body.size,
       product_code:req.body.product_code, 
       sold_by:req.body.sold_by,
       catagries:req.body.catagries,
       discount:req.body.discount,
       old_price:req.body.old_price,
       product_details:req.body.product_details
   }
   Filter.create(userData)
   .then(stored =>{
   res.json({
           status:'detiale  stored Successfully!',
           user: stored
         })
 })
 .catch(err =>{
      res.json({
        error : err
      })
  })
 }
 else{
       res.status(500).send({
         message:"product already exits"
       });
 }
})
.catch(err=>{
 res.send(err);
})
     } else {
       res.send('User does not exist')
     }
   })
   .catch(err => {
     res.send('error: ' + err)
   })
  
}
const getallfilter=async(req,res)=>{
await Filter.find()
   .then(data =>{
    const product=data
     res.json(product)
   }).catch(err =>{res.json(err)});
}
const getfilter=async(req,res)=>{
await Filter.find(req.body)
   .then(data =>{
    const product=data
     res.json(product)
   }).catch(err =>{res.json(err)});
}
// prodect get
const getprodect= async(req,res)=>{
// console.log(req.params.product_code);
await Filter.find({product_code:req.params.product_code})
.then(data=>{
const product=data
res.json(product)
}).catch(err =>{res.json(err)});
}

const Adcard = async function (req, res) {
   console.log(req.body)
   var decoded = jwt.verify(req.headers['Authorization'] || req.body.token, process.env.SECRET_KEY)
   console.log('id',decoded._id);
   
   register.findOne({ 
      _id: decoded._id
   }) 
      .then(user => { 
         if (user) {
            if (req.body.size == '' || req.body.size == 'undefined') {
             return res.send({ message:'plz click size'})
            }
            else {
               if (req.body.product == '' || req.body.product == 'undefined') {
                return res.send({ message:'product id add your product bag'})
               }
               else {
                  Filter.findOne({
                     _id: req.body.product
                  })
                     .then(prod => {
                 if (prod) {
                           Addcard.findOne({ product: req.body.product, user: decoded._id })
                              .then(bagdata => {
                                 console.log("ok", decoded._id)
                                 if (!bagdata) {
                                    var bag = new Addcard({
                                       size: req.body.size,
                                       quantity: 1,
                                       product: prod,
                                       user: decoded._id

                                    })
                                    console.log(bag)
                                    bag.save().then(bags => {
                                       if (!bags) {
                                          return res.send({ message: 'errr' })
                                       }
                                       else {
                                          Addcard.find({ user: bags.user }, async (err, bagstore) => {
                                             if (bagstore) {
                                                await register.updateOne({ _id: decoded._id }, { $set: { bag: bags } })
                                                return res.status(200).send({ message: 'product add your bag successfully', data: bags })
                                          
                                             
                                             }
                                             else {
                                                return res.send({ message: ' some problem add your product' })
                                             }
                                          })
                                       }
                                    }).catch(err => {
                                       console.log(err)
                                    })
                                 }
                                 else {
                                    Addcard.find({ user: decoded._id }, async (err, bagstore) => {
                                       if (bagstore) {
                                          return res.json({ message: 'already product added', data: bagstore })
                                       }
                                       else {
                                          return res.send({ message: ' some problem add your product' })
                                       }
                                    })
                                 }
                              })
                              .catch
                              (err => { res.json(err) })
                        }
                        else {
                           return res.send({ message: 'sorry product not found' })
                        }
                     })
                     .catch(err => { res.json(err) });
               }
            }
         }
         else {
            return res.send({ message: 'sry user' })
         }
      })
      .catch(err => { res.json(err) });
}

// get all
const bagall = async function (req, res) {
   console.log(req.body)
   var decoded = jwt.verify(req.headers['Authorization'] || req.params.token, process.env.SECRET_KEY)
   register.findOne({
      _id: decoded._id
   })
      .then(data => {
         if (data) {
            Addcard.find({ user: data._id })
               .populate('product')
               .then(data => {
                  if (data) {
                     return res.send({ message: 'product get succefully', data: data });
                  }
                  else {
                     return res.send({ message: 'add somtimes problem' })
                  }
               })
               .catch(err => { res.send({ message: 'somtime wrom', err: err }) })
         }
      })
      .catch(err=> {res.send({message:'something wrong get your account'})})
}
// delete card item
  const delitem  = async function (req, res) {
     console.log(req.body)
   var decoded = jwt.verify( req.body.token, 'secret')
   register.findOne({
      _id: decoded._id
   })
   .then(user=>{
      if (user) {
         Addcard.findOne({ user: decoded._id ,_id:req.body._id,product:req.body.product}) 
         .then(data=> {
            if (data) {
               Addcard.deleteOne({user:decoded._id ,_id:req.body._id,product:req.body.product},async(err,deldata)=>{
                  if (deldata) {
                     await register.updateOne({ _id: decoded._id }, { $set: { bag: data } })
                     return res.status(200).send({ message: 'product deleted successfully', data: data })
                  }
                  else {
                     return res.send({ message: ' some problem delete your product' })
                  }
            }).catch(err=> {res.send({message:'something wrong delete ur product'})})
         }
            else{
               return res.send({ message: ' cannot find your account' })
            }
         }).catch(err=> {res.send({message:'somthing wrong to find your product'})})
      }
       
   })
   .catch(err=> {res.send({message:'cannot find your account'})})
}



const qtyUpdate = async function(req, res) {
   const body = req.body;
   console.log(body)
 
   // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

   Addcard.findOne({
      _id:req.body.id
    }).then(user=>{
      console.log(user)
      if(user){
         Addcard.findByIdAndUpdate({_id:req.body.id},{$set:req.body}).then(data=>{
            res.json(data)
        console.log(req.body)
        
      }).catch(err=>{
        console.log(err)
      })
    }})
 
};
const sizeUpdate = async function(req, res) {

   console.log("Size",req.body)
 
   Addcard.findOne({
      _id:req.body.id
    }).then(user=>{
      console.log(user)
      if(user){
         Addcard.findByIdAndUpdate({_id:req.body.id},{$set:req.body}).then(data=>{
            res.json(data)
        console.log(req.body)
        
      }).catch(err=>{
        console.log(err)
      })
    }})
 
};


module.exports = {
   Filter:Filter_product,
        getallfilter:getallfilter,
        getfilter:getfilter,
        getprodect:getprodect,
   Adcard: Adcard,
   bagall:bagall,
   delitem:delitem,
   qtyUpdate:qtyUpdate,
   sizeUpdate:sizeUpdate,
   // order:order
}