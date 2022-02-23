require("dotenv").config();
const express = require("express");
const Router = express.Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");

const { createToken } = require("./createToken");
const {  check } = require("express-validator");

Router.post(
  "/login",
  [
    check("password")
      .isLength({ min: 6 })
      .withMessage("password has to be a minimun of 6 characters"),
    check("ogNumber").not().isEmpty().withMessage("ogNumber feild is empty"),
    check("password").not().isEmpty().withMessage("password feild is empty"),
  ],
  async (req, res) => {
    try {
      const { ogNumber, password } = req.body;

      const user = await pool.query(
        "SELECT * FROM users WHERE (og_number = $1)",
        [ogNumber]
      );
      if (user.rows.length === 0) {
        res.send("invalid credentials");
      } else {
        const validPassword = await bcrypt.compare(
          password,
          user.rows[0].password
        );
        if (validPassword) {
          const token = createToken(user);
         // console.log(user.rows[0])

          return res.cookie("jwt", token, {
            httpOnly : true,
            secure: process.env.NODE_ENV === "production" 
          }).status(200).json({message:"logged in successfuly"}
          )

        
         // console.log(req.staffCategory) 
          // res.json(req.cookies.jwt)
        } else {
          res.status(200).json("Invalid OG-Number or password");
        }
      }
    } catch (error) {
      res.send(error.message);
      console.log(error.message);
    }
  }
);

module.exports = Router;
