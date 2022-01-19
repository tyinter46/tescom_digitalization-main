Router.post('/login', async (req, res)=>{

  try {
    const {ogNumber, password } = req.body  
     
    
     const user = await pool.query("SELECT * FROM users WHERE (og_number = $1)", [ogNumber]) 
      if(user.rows.length === 0) {
       res.send("invalid credentials")
  }
  const validPassword = await bcrypt.compare (password, user.rows[0].password)
 if (validPassword) {
       const token = jwt.sign({
         id: user.users_id,
         role: user.role
       }, process.env.SECRET_KEY, {expiresIn : "24h"})
    res.cookie("jwt", token , {
      httpOnly: true,
      maxAge: 60*60*24*1000
    })
    res.status(user.users_id)
 }
 //  res.status(200).json(validPassword)
       
  } catch (error) {
      res.send(error.message)
      console.log(error.message)
  }
  }) 