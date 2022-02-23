const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

const createToken = (user) => {
  //console.log(user.users_id)
  const token = sign(
 
    {
      id: user.rows[0].users_id,
    //  name: user.name,
      staffCategory: user.rows[0].staff_category,
      role: user.rows[0].role,
      ogNumber: user.rows[0].og_number
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
  return token
  }

module.exports = { createToken };
