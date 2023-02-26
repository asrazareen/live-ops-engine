const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserData = new Schema({
    name:{type:String , require:true,unique:true},
    age:{type:Number , require:true },
    country:{type:String,require:true},
    password:{type:String , require:true, min: 6, max: 16},
    installed_days:{type:Number , default:1},
    gems:{type:Number,default:0}, 
    coins:{type:Number,default:0},
    game_level:{type:Number,default:0}, 
    purchaser:{type:Boolean,default:false}
},{timestamps:true})

const userModel = mongoose.model("players",UserData);

module.exports = userModel; 