const express = require('express')
const seniorTeachersRoutes = require('./routes/teachingStaffRoutes/seniorTeachersRoutes.js');
const juniorTeachersRoutes= require('./routes/teachingStaffRoutes/juniorTeachersRoutes.js');
const combinedTeachersRoutes = require('./routes/teachingStaffRoutes/combinedTeachersRoutes.js')
const combinedNonTeachersRoutes = require('./routes/nonTeachingStaffRoutes/combinedNonTeachingStaff')
const juniorNonTeachersRoutes = require('./routes/nonTeachingStaffRoutes/juniorNonTeachingStaff')
const seniorNonTeachersRoutes = require ('./routes/nonTeachingStaffRoutes/seniorNonTeachingStaff')
const usersAuth = require ('./auth_file/usersAuth')
const cors = require('cors');
const cookieParser = require('cookie-parser'); 

const app = express()

app.use(cors());
app.use(cookieParser())
app.use(express.json())


app.use('/senior_teachers', seniorTeachersRoutes );
app.use('/junior_teachers', juniorTeachersRoutes );
app.use('/combined_teachers', combinedTeachersRoutes );
app.use('/combined_non_teachers', combinedNonTeachersRoutes)
app.use('/junior_non_teachers', juniorNonTeachersRoutes )
app.use('/senior_non_teachers', seniorNonTeachersRoutes)
app.use('/', usersAuth);
app.get('/', (req, res)=>{
    res.send('welcome to Tescom Management portal')
})



app.listen(5000, ()=>{
    console.log('the server is listening on port 5000')
});
