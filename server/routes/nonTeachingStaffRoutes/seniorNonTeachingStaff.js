const express = require('express')
const Router = express.Router();
const pool = require('../../db.js')

//Get all senior school  non-teachers
Router.get('/', async (req, res) => {
    try {
        //console.log(pool)
        const nonTeachers = await pool.query("SELECT * from senior_non_teaching_staff")
        res.send(nonTeachers.rows);
    } catch (error) {
        console.log(error.message)
    }
})
//Get one senior school teacher
Router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const nonTeacher = await pool.query("SELECT * FROM senior_non_teaching_staff WHERE id = $1", [id])
        res.send(nonTeacher.rows[0])
    } catch (error) {

        console.log(error.message)
    }

})

//Create a senior school teacher
Router.post('/', async function (req, res) {
    try {

        const {
            name_of_staff,
            remarks,
            sex,
            phone_no,
            file_no,
            school,
            zone,
            division,
            og_num,
            date_of_birth,
            nationality,
            state,
            lg_of_origin,
            ward,
            qualifications_with_date,
            date_posted_to_present_school,
            cadre, date_of_first_appointment,
            date_of_last_promotion,
            salary_grade_level,
            date_of_retirement,
            pfa,
            pen_number,
            passport
        } = req.body;


 const newTeacher = await pool.query("INSERT INTO senior_non_teaching_staff (name_of_staff, remarks, sex,phone_number, file_number, school_name, school_zone, division,  og_number, date_of_birth, nationality,  state, lg_of_origin, ward, qualifications_with_date,date_posted_to_present_school, cadre,date_of_first_appointment, date_of_last_promotion, grade_level, date_of_retirement, pfa, pension_number,passport) VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) RETURNING * ",
        [
        name_of_staff,
        remarks,
        sex,
        phone_no,
        file_no,
        school,
        zone,
        division,
        og_num,
        date_of_birth,
        nationality,
        state,
        lg_of_origin,
        ward,
        qualifications_with_date,
        date_posted_to_present_school,
        cadre, date_of_first_appointment,
        date_of_last_promotion,
        salary_grade_level,
        date_of_retirement,
        pfa,
        pen_number,
        passport
        ]);

if (res.statusCode === 200)
    res.send('Senior schools non teacher details posted successfully');

    } catch (error) {
    res.json(error.message);
    console.log(error.message);
}

})

//Update one senior school teacher
Router.put('/:id', async (req, res) => {
    try {

        const id = req.params.id
        const {
            name_of_staff,
            remarks,
            sex,
            phone_no,
            file_no,
            school,
            zone,
            division,
            og_num,
            date_of_birth,
            nationality,
            state,
            lg_of_origin,
            ward,
            qualifications_with_date,
            date_posted_to_present_school,
            cadre, date_of_first_appointment,
            date_of_last_promotion,
            salary_grade_level,
            date_of_retirement,
            pfa,
            pen_number,
            passport
        } = req.body
        const updateTeacher = await pool.query("UPDATE senior_non_teaching_staff SET name_of_staff = $1, remarks = $2, sex = $3, phone_number = $4, file_number = $5, school_name =$6, school_zone= $7, division=$8,  og_number= $9, date_of_birth =$10, nationality =$11,  state =$12, lg_of_origin =$13, ward =$14, qualifications_with_date =$15, date_posted_to_present_school =$16, cadre =$17, date_of_first_appointment =$18, date_of_last_promotion =$19, grade_level = $20, date_of_retirement = $21, pfa = $22, pension_number = $23 , passport =$24 WHERE id = $25 RETURNING *",
        [
        name_of_staff,
        remarks,
        sex,
        phone_no,
        file_no,
        school,
        zone,
        division,
        og_num,
        date_of_birth,
        nationality,
        state,
        lg_of_origin,
        ward,
        qualifications_with_date,
        date_posted_to_present_school,
        cadre, date_of_first_appointment,
        date_of_last_promotion,
        salary_grade_level,
        date_of_retirement,
        pfa,
        pen_number,
        passport,
        id
        ])
        res.json('updated successfully')
    } catch (error) {
        console.log(error.message)
        res.json(error.message)
    }

})

//Delete One senior school Teacher and add to table of retired teachers 
Router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const idExist = await pool.query("SELECT EXISTS (select * from senior_non_teaching_staff WHERE id = $1)", [id]); 
         console.log(idExist)
        if (!idExist.rows[0].exists) throw new Error ("staff not available")  
        const deleteOneSeniorSchoolTeacher = await pool.query("DELETE FROM senior_non_teaching_staff WHERE id = $1 RETURNING *", [id])
        if (res.statusCode === 200) res.send('Deleted Successfully') 
       
      
  
    } catch (error) {
        res.send(error.message)
        console.log(error.message)
    }
})



module.exports = Router