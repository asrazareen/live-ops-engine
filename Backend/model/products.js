const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductData = new Schema({ 
   offerId:{type:String},
      // ,required:true},
   offerTitle:{type:String},
      //,required:true},
   description:{type:String},
      //,required:true},
   image:{type:String},
      //,required:true},
   order:{type:Number},
      //,required:true},
   item_id:{type:String},
      //,required:true },
   quantity:{type:Number},
      //,required:true},
   days_of_week:{type:Number}, 
      //,required:true},
   dates_of_month:{type:Number},
      //,required:true},
   months_of_year:{type:Number},
      //,required:true},
   target:{type:String},
      //required:true},
   currency:{type:String},
      //,required:true},
   cost:{type:Number}
      //,required:true},
},{timestamps:true})

const ProductModel = mongoose.model("Product",ProductData);

module.exports = ProductModel; 