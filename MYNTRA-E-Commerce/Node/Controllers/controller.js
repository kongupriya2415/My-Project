const express = require('express');
 const cors = require('cors');
 const jwt = require('jsonwebtoken');
 const app=express();
 const bodyParser=require('body-parser'); 
 const bcrypt = require('bcryptjs')
 app.use(bodyParser.json());
 app.use(cors());
const schema = require('../models/User');
const register = require('../models/register');
const galleryImage =require('../models/galleryModel')
const {check,validationResult} =require('express-validator')
process.env.SECRET_KEY ='secret'
 
const postSlickImage = async function(req,res)
{
    const userData =
    {

        image:[req.body.image]
    }

    schema.findOne({
  image: req.body.image
})

.then(user=>{
  if(!user){
    schema.create(userData)
    .then(user =>
        {
            res.send(req.body.image);

            
       })
    .catch(err =>
      {
       res.send('error:'+err);
     })
  }
  else{
    res.json({error:'User Alredy Exist'})
  }
})
   
 
}

const getSlickImage = async function(req,res){
  await schema.find({},{image:1,_id:0})
    .then(image=>{
       res.json(image)
    }).catch(err=>{
        res.status(400).json('Error'+err)})

}
// *******************************************




const registerDetails = async (req,res)=>{
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(422).json({ errors: errors.array() });
}
  const regDetails={
      email:req.body.email,
      password:req.body.password,
      gender:req.body.gender,
  }
  
  register.findOne({
      email: req.body.email
    })
      .then(user => {
        if (!user) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
              regDetails.password =   hash
              register.create(regDetails)
        
              .then(user => {
                res.json({ status: true ,message:'Registered!' })
              })
              .catch(err => {
                res.send('error: ' + err)
              })
          })
        } else {
          res.json({ error: 'User already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
}





// const registerDetails = async (req,res)=>{
//     const regDetails={
//         email:req.body.email,
//         password:req.body.password,
//         gender:req.body.gender,
//     }
    
 


//     register.findOne({
//         email: req.body.email
//       })
//         .then(user => {
//           if (!user) {
//             bcrypt.hash(req.body.password, 10, (err, hash) => {
//                 regDetails.password =   hash
//                 register.create(regDetails)
          
//                 .then(user => {
//                   res.json({ status: user.email + 'Registered!' })
//                 })
//                 .catch(err => {
//                   res.send('error: ' + err)
//                 })
//             })
//           } else {
//             res.json({ error: 'User already exists' })
//           }
//         })
//         .catch(err => {
//           res.send('error: ' + err)
//         })
//   }




  const Login= async function(req, res) {
    console.log('hai')
    const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(422).json({ errors: errors.array() });
}
    register.findOne({
      email: req.body.email
    })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            // Passwords match
            const payload = {
              _id: user._id,
              email: user.email,
              first_name:user.first_name
            }
            let Token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: '2h'
            })
           
            res.send(Token);
            console.log(Token)
          } else {
            // Passwords don't match
            res.json({ error: 'User does not exist' })
          }
        } else {
          res.json({ error: 'User does not exist' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }


  const logout= async function(req, res) {
 
    var logout = jwt.destroy(req.headers['authorization'])
    
     
  }



  const Profile= async function (req, res)  {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  
    register.findOne({
      _id: decoded._id
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
  
  


const editProfile = async function(req, res) {
   const body = req.body;
   const validNum=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
   console.log(body.mobile)
   if(body.mobile.match(validNum)){
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    register.findOne({
      _id:decoded._id
    }).then(user=>{
      console.log(user)
      if(user){
      register.findByIdAndUpdate({_id:decoded._id},{$set:req.body}).then(data=>{
        console.log(req.body)
        res.json({data:"Changes Updated",message:"Success"})
      }).catch(err=>{
        console.log(err)
      })
    }})
   }
   else{
    res.json({data:"Plese Enter Valid Phone Number",message:"Failed"})

  
  }
};

// Gallery--------------------------------
const postGalleryImage = async function(req,res)
{
    const userData =
    {

        image:[req.body.image]
    }

    galleryImage.findOne({
  image: req.body.image
})

.then(user=>{
  if(!user){
    galleryImage.create(userData)
    .then(user =>
        {
            res.send(req.body.image);

            
       })
    .catch(err =>
      {
       res.send('error:'+err);
     })
  }
  else{
    res.json({error:'User Alredy Exist'})
  }
})
}

const getGalleryImage = async function(req,res){
  await galleryImage.find({},{image:1,_id:0})
    .then(image=>{
       res.json(image)
    }).catch(err=>{
        res.status(400).json('Error'+err)})

}


module.exports= {
    postSlickImage:postSlickImage,
    getSlickImage:getSlickImage,
    register:registerDetails,
    login:Login,
    profile:Profile,
    editProfile:editProfile,
    postGalleryImage:postGalleryImage,
    getGalleryImage:getGalleryImage
} 