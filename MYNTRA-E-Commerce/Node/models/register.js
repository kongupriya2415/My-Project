const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product ={
    type: Schema.Types.ObjectId,
    ref:"addcard"
  }
  const orders ={
    type: Schema.Types.ObjectId,
    ref:"order"
  }
const UserSchema = new Schema({
    first_name:{type:String},
    last_name:{type:String},
    gender:{type:String},
    dob:{type:Date},
    bio:{type:String},
    mobile:{type:Number},
    location:{type:String},
    email:{type:String,require:true},  
    password:{type:String},
    bag:[product],
    order:[orders]
   
});
 
module.exports = register = mongoose.model('register',UserSchema);