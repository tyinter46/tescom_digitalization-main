const  { sign, verify } = require ("jsonwebtoken"); 
require('dotenv').config()
 
const createToken = (user) => {
 return  sign(
    {
      id: user.users_id,
      role: user.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );

  }

const verifyUserToken = (token )=>{
  return verify(token, process.env.SECRET_KEY )
}  

module.exports = {createToken, verifyUserToken} 