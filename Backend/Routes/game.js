const express = require("express")
const cors = require("cors");
const fileUpload = require("express-fileupload");
const Products = require("../model/products")
const User = require("../model/user")


const app = express()

app.use(fileUpload())
app.use(cors())
app.use(express.json()); 

app.get("/user", async (req, res) => {
    const userid = req.user;
    //console.log(userid)
    const user = await User.findOne({ _id: userid }); 
    res.status(200).json({
      name: user.name,
      gems:user.gems ,
      coins:user.coins
    });  
  });
  
app.post("/" , async (req,res) => {
    try{  
        //console.log("hi")
        const {offerId,image,offerTitle,description,url,order,target,item_id,quantity,days_of_week,dates_of_month,months_of_year,currency,cost} = req.body
        //console.log(req.body )
        await Products.create({
            offerId,
            offerTitle,
            description,
            url,
            image,
            order,
            target,
            item_id,
            quantity,
            days_of_week,
            dates_of_month,
            months_of_year,
            currency,cost
        })
        res.json({
            Status:"Success",
            message:"Offer added successfully"
        })
    }catch(e){
        res.status(404).json({
            message:e.message
        })
    }
       
}) 

app.get("/" , async (req,res) => {
    const data = await Products.find().sort({ createdAt: -1 });
    res.json(data);
})

app.delete("/remove/:id", async (req, res) => {
  await Products.deleteOne({ _id: req.params.id });
    res.json({
      massage: "Succesfully deleted post"
    });
});


module.exports = app
