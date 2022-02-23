require("dotenv").config();
const express = require("express");
const Router = express.Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");

const {createToken} = require("./createToken")
const {check} = require("express-validator")


Router.post("/register", [
  check("ogNumber").not().isEmpty().withMessage("ogNumber feild is empty"),
  check("staffCategory").not().isEmpty().withMessage("staffCategory feild is empty"),
  check("password").not().isEmpty().withMessage("password feild is empty"),
], async (req, res) => {
  try {
    const { ogNumber, staffCategory, password } = req.body;

    const userAnEmployee = await pool.query(
      "SELECT EXISTS (SELECT og_number FROM tsc_caps WHERE (og_number = $1))",
      [ogNumber]
    );
    console.log(userAnEmployee.rows[0].exists);
    const isUserAnEmployee = userAnEmployee.rows[0].exists;
    //res.send(isUserExist)

    if (isUserAnEmployee) {
      const userExist = await pool.query(
        "SELECT EXISTS (SELECT og_number FROM users WHERE (og_number = $1))",
        [ogNumber]
      )    
     
      if (userExist) {
        const userDetailsFromCapsDb = await pool.query("SELECT name_of_officer, grade_level, date_of_birth, date_of_first_appointment, date_of_retirement FROM tsc_caps WHERE og_number = $1", [ogNumber])  
        console.log (userDetailsFromCapsDb.rows[0])
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await pool.query(
          "INSERT INTO users (og_number, staff_category, password) VALUES ($1, $2, $3) RETURNING *",
          [ogNumber, staffCategory, hashedPassword]
        );
         const token =  createToken(user)
        // userDetailsFromCapsDb.rows[0]    
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1000,
          });
     
      //  res.status(200).json(  createToken(user));
        // console.log(req.cookies)
      }
    }
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
});


module.exports = Router