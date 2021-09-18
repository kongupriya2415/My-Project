const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const Users = require('./routes/Users')
const Register = require('./routes/Users')
const Gallery = require('./routes/Users')
const Product = require('./routes/Users')
const Cart = require('./routes/Users')

const mongo = require('mongodb');
//Initialize the app
const app = express();

//Defining the PORT
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
const mongoURI = 'mongodb://localhost:27017/My_Myntra'
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex',true);
mongoose
  .connect(mongoURI,{useNewUrlParser:true ,useUnifiedTopology: true})
  .then(()=>console.log("Database Connected"))
  .catch(err =>console.log(err))
    
 

  app.use('/route',Users);
 

app.get('/',(req,res)=>{
    return res.json({
        message:"Authentication"
    });
});


app.listen(PORT,()=>{
    console.log('Server started on Port ',PORT);
});