require("dotenv").config();
const express = require("express");
const Router = express.Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

Router.post("/register", async (req, res) => {
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
      );
      if (userExist) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await pool.query(
          "INSERT INTO users (og_number, staff_category, password) VALUES ($1, $2, $3) RETURNING *",
          [ogNumber, staffCategory, hashedPassword]
        );
        const token = jwt.sign(
          {
            id: user.users_id,
            role: user.role,
          },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 1000,
        });
        res.status(200).json(token);
        // console.log(req.cookies)
      }
    }
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
});

Router.post("/login", async (req, res) => {
  try {
    const { ogNumber, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE (og_number = $1)",
      [ogNumber]
    );
    if (user.rows.length === 0) {
      res.send("invalid credentials");
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (validPassword) {
      const token = jwt.sign(
        {
          id: user.users_id,
          role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
      });
      res.status(200).json(token.id);
    }
    else {
      res.status(200).json("Invalid OG-Number or password")
    }
    //  res.status(200).json(validPassword)
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
});

module.exports = Router;
