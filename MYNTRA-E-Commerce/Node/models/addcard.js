const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product ={
    type: Schema.Types.ObjectId,
  ref:"filter"
}
var UserSchema=({
  size: {
    type: String,
    required: true
},
user:{
  type:String,
  required:true
},
product:[product],
quantity:{
  type: Number,
  required: true
}
})
module.exports = mongoose.model('addcard', UserSchema)
