const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../model/user");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Secret = "E-commerce";

const router = express.Router();
mongoose.set("strictQuery", true);
router.use(cors()); 
router.use(fileUpload());
router.use(express.json());

router.post(
  "/register",
  body("age").isNumeric(),
  body("name").isAlphanumeric().isLength({ min: 4 }),
  body("country"),
  body("password").isLength({ min: 6}),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = errors.array()[0];
        if (error.param == "age") {
          return res.status(400).json({
            message: "Invalid Age",
          });
        } else if (error.param == "name") {
          return res.status(400).json({
            message: "Invalid Name",
          });
        } else if (error.param == "country") { 
          return res.status(400).json({
            message: "Invalid Country",
          });
        } else {
          return res.status(400).json({
            message: "Invalid Password",
          });
        }
      }

      const { name, age, password, country } = req.body;


      const username = await User.findOne({ name });
      if (username) {
        return res.status(409).json({
          status: "Failed",
          message: "Player_id already exists, please use another name",
        });
      }

      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          return res.status(500).json({
            status: "Failed",
            message: err.message,
          });
        }
         await User.create({
          name,
          country,
          age,
          password: hash,
        });
        return res.status(200).json({
          status: "Success",
          message: "User registered successfully",
          
          
        });
      });
    } catch (e) {
      return res.status(500).json({
        status: "Failed",
        message: e.message,
      });
    }
  }
);

router.post("/login", body("name").isAlphanumeric(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid Player_id",
      });
    }

    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({
        status: "Failed",
        message: "User not registered, please register",
      });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(500).json({
          status: "Failed",
          message: err.message,
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: user._id,
          },
          Secret
        );

        return res.status(200).json({
          status: "Succces",
          message: "Login successfully",
          token,
        });
      } else {
        return res.status(400).json({
          status: "Failed",
          message: "Wrong Password",
        });
      }
    });
  } catch (e) {
    return res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});
module.exports = router;
