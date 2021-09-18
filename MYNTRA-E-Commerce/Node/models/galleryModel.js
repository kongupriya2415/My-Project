const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
     image:{
         type:Array,

     }

});
 
module.exports = gallery = mongoose.model('gallery',UserSchema);