const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Create Schema
const UserSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  filterimage: {
    type: Array,
    required: true
  },
  product_name: {  
    type: String,
  },
  shop_name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  color:{
    type:String,
    required: true
  },
  size: {
    type: Array,
    required: true
},
product_code: {
  type:Number,
  required:true
},
sold_by:{
  type:String,
  required:true
},
catagries:{
  type:String,
  required:true
},
discount:{
  type:Number,
  required:true
},
old_price:{
  type:Number,
  required:true
},
product_details:{
  type:String,
  required:true
}
})
module.exports = Filter = mongoose.model('filter', UserSchema)