const mongoose = require("mongoose");
const Schema = mongoose.Schema;




var User = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'register'
}

var order = new Schema({
    Product: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'filter'
        },
        quantity: Number,
        productSize: String
    }],
   
    user: User,
    orderId: {
        type: Number,
        createIndexes: {
            unique: true
        },
        default: () => {
            return Math.floor(100000 + Math.random() * 9000000000)
        }
    },
    status: {
        type: String,
        required: true,
        enum: ["DELEVERED", "CANCELED", "APPROVED"],
        default: "APPROVED"
    },
    total: {
        type: Number
    },
    date: { 
        type: Date, 
        default: Date.now
    },
    deliveryDate:{
        type:Date,

    },
    paymentStatus: {
        type: String,
        enum:["Cash on Delivery","Online","Card on Deleivery"],
    },
    address: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        locality: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['Home', 'Office'],
            default: "Home"
        }
    }


})
module.exports = Order = mongoose.model("order", order);