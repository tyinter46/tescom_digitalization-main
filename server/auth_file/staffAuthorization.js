
const jwt = require('jsonwebtoken');
require('dotenv').config();

const staffAuthorization =  (req, res, next ) => {
    const token = req.cookies.jwt 
    if (!token){
      return  res.send('you do not have a token')
   
    } else {
      try {
    const decode = jwt.verify(token, process.env.SECRET_KEY)
   
     req.userId = decode.id
  
     req.staffCategory = decode.staffCategory
     req.role= decode.role
     req.ogNumber = decode.ogNumber
     //console.log(req.userId, req.ogNumber, req.role, req.staffCategory)
   return  next()
        
      } catch (error) {
         res.sendStatus(403)
      }
    
    }
  
}

module.exports = {staffAuthorization}