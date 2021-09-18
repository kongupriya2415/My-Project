var User=require('../models/register'); 
var Product=require("../models/filter");
var Cart=require('../models/addcard');
var Order=require("../models/order");
var Address=require('../models/address')
const jwt = require("jsonwebtoken");

/* ---------------------------------------------------------- *create Order*------------------------------------------------- */

const createOrder=async(req,res)=>{
    var decoded = jwt.verify(req.headers['authorization'] || req.body.token || req.params.token, 'secret')
    var userId=decoded._id;
    // var userId=req.body.id;
    var address=req.body.address;
   //  var cart=req.body.cart;
   if(address=='' || address==undefined)
   res.send("Please Select Shipping Address")

    if(userId!='' || userId!="undefined" || cart!=''){
        Address.findOne({_id:req.body.address}).then(location=>{
            let address={address:location.address,phone:location.phone,pincode:location.pincode,state:location.state,locality:location.locality,city:location.city,type:location.type,name:location.name};
            // console.log("address",address);
            if(address!=null){
                Cart.find({user:userId}).then(data=>{
                    let order=data.map(x=>{return {product:x.product,quantity:x.quantity,productSize:x.size}});
                    

                    

                    // console.log("order",order.product);
                    let total=new Order({
                        user:userId,
                        Product:order,
                        address:address,
                        total:req.body.total,
                        paymentStatus:req.body.paymentMode,
                        deliveryDate:req.body.deliveryDate
                        
                    }).save().then(docs=>{
                        res.status(200).json({message:"Order Created",data:docs})
                    }).catch(err=>{
                        res.status(400).json({error:err})
                    })
                }).catch(err=>{
                    res.status(400).json({error:err})
                })
            }else{
                res.status(400).json({warning:"please add your address"})
            }
        }).then(data=>{
            Cart.deleteMany({user:userId}).then(data=>{
                res.status(200).json({message:"cart deleted",data:data})
            }).catch(err=>res.json(err))
        })
    }else{
        res.status(404).json({message:"invalid process"})
    }
}
/* ---------------------------------------------------------- *get Order By USERID* ------------------------------------------------- */
const getOrder=async(req,res)=>{
    var decoded = jwt.verify(req.headers['authorization'] || req.body.token || req.params.token, 'secret')
    var userId=decoded._id;
    Order.find({user:userId},[],{sort:{'_id':-1}})
    .populate('Product.product')
    .then(data=>{
        res.status(200).json({message:"Order Got Successfully By UserId",data:data});
    }).catch(err=>{
        res.status(401).json({error:err});
    })
}

/* ---------------------------------------------------------- *get Order By PRODUCTID*------------------------------------------------- */
const getOrderByProductId=async(req,res)=>{
    var productId=req.params.productId;
    Order.find({'Product._id' : productId} ,
    {Product:
        {$elemMatch:       // particular take a product details only
        {
            _id:productId
        }} 
    })
    .then(data=>{
        {data?res.status(200).json({message:"Order Got Successfully By ProductId",data:data}) :
              res.status(200).json({message:"Product Not Found for this ProductId"})}
    }).catch(err=>{
        res.status(401).json({error:err});
    })  
}
/* ---------------------------------------------------------- *get Order By orderId*------------------------------------------------- */
const getOrderByOrderId=async(req,res)=>{
    var orderId=req.params.orderId;
    Order.find({orderId})
    .populate('Product.product')
    .then(data=>{
        res.status(200).json({message:"Order Got Successfully By OrderId",data:data});
    }).catch(err=>{
        res.status(401).json({error:err});
    })
}
/* ---------------------------------------------------------- *Cancel Order*------------------------------------------------- */
const cancelOrder=async(req,res)=>{
    try{
        if(req.body.id !=null && req.body.id != undefined){
            const data=await Order.updateOne({_id:req.body.id},{$set:{status:req.body.status}});
            res.status(200).json({message:"Order Canceled Successfully",data:data})
        }
    }catch(err){
        res.status(401).json({error:err})
    }
}
/* ---------------------------------------------------------- *Delete Order*------------------------------------------------- */
const deleteOrder=async(req,res)=>{
    var id=req.body.id;
    Order.deleteOne({_id:id}).then(data=>{
        res.status(200).json({message:"Order delete Successfully By OrderId",data:data});
    }).catch(err=>{
        res.status(401).json({error:err});
    })
}
module.exports={
    createOrder:createOrder,
    getOrder:getOrder,
    getOrderByProductId:getOrderByProductId,
    getOrderByOrderId:getOrderByOrderId,
    cancelOrder:cancelOrder,
    deleteOrder:deleteOrder
}
