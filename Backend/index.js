const express = require("express");
const Port = 5050;
const cors = require("cors")
const userRoute = require("./Routes/user")
const db = require("mongoose")
const gameRoute = require("./Routes/game");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Secret = "E-commerce";


 
const app = express();
app.use(cors());
app.use(express.json());

// console.log(process.env.MONGODB_URL)
app.use("/product", (req, res, next) => {  
  const token = req.headers.authorization;
    //console.log(token)
    if (token) {
      jwt.verify(token, Secret, function (err, decoded) {
        if (err) {  
          console.log(err);
          return res.status(403).json({
            status: "Failed",
            message: "Token is not valid",
          });
           
        }
        req.user = decoded.data; 
        //console.log("HII")
        next(); 
      });
    } else {
      console.log("hii");
      res.status(403).json({
        status: "Failed",
        message: "User is not authenticated",
      }); 
    }
  });  
 


app.use("/user", userRoute)
app.use("/product" , gameRoute)

db.connect(
   process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to db")
  );
  

app.listen(Port , () => console.log(`Server is up and running at port number ${Port}`)) 