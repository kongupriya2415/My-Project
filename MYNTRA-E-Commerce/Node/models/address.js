const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema={
    type: Schema.Types.ObjectId,
      ref:"register"
  }
const AddressSchema = new Schema({
    userId:UserSchema,
    name:{
        type:String,
           required:true
    },
       address:{
           type:String,
           required:true
       },
       phone:{
           type:Number,
           required:true
       },
       pincode:{
           type:Number,
           required:true
       },
       state:{
        type:String,
        required:true
       },
       locality:{
        type:String,
        required:true
       },
       city:{
        type:String,
        required:true
       },
       type:{
        type:String,
        enum:['Home','Office'],
        default:"Home"
       }
})

module.exports = address = mongoose.model('address',AddressSchema)