const express = require('express')
const Router = express.Router();
const pool = require('../../db.js')

//Get all teachers
Router.get('/', async (req, res)=>{
    try {
        //console.log(pool)
        const teachers = await pool.query("SELECT * from senior_school_teachers")
        res.send(teachers.rows);
    } catch (error) {
        console.log(error.message)
    }   
      })
//Get one teacher
Router.get('/:id', async (req, res)=>{
     try {
        const id = req.params.id
        const teacher = await pool.query("SELECT * FROM senior_school_teachers WHERE id = $1", [id])  
        res.send(teacher.rows[0])       
    } catch (error) {
        console.log(error.message)
    }

})



//Create a teacher
Router.post('/', async function (req, res) {
        try {

            const {
                name_of_teacher, remarks, sex, phone_no, file_no, school, zone, division, og_num, date_of_birth, nationality, state, lg_of_origin, ward, qualifications_with_date, year_of_degree, professional_status, subject_of_specialization, subject_taught, date_posted_to_present_school, cadre, date_of_first_appointment, date_of_last_promotion, salary_grade_level, pfa, pen_number, dor_by_birth, dor_by_first_appointment, trc_number, passport
            } = req.body;

            const newTeacher = await pool.query("INSERT INTO senior_school_teachers ( name_of_teacher, remarks, sex, phone_number, file_number_tsc, school, school_zone, division, og_num, date_of_birth, nationality, state, lg_of_origin, ward, qualifications_with_date, year_of_degree, professional_status, subject_of_specialization, subject_taught, date_posted_to_present_school, cadre, date_of_first_appointment, date_of_last_promotion, salary_grade_level, pfa, pension_number, dor_by_birth, dor_by_first_appointment, trc_number, passport) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27,$28,$29,$30 ) RETURNING *",
                [name_of_teacher, remarks, sex, phone_no, file_no, school, zone, division, og_num, date_of_birth, nationality, state, lg_of_origin, ward, qualifications_with_date, year_of_degree, professional_status, subject_of_specialization, subject_taught, date_posted_to_present_school, cadre, date_of_first_appointment, date_of_last_promotion, salary_grade_level, pfa, pen_number, dor_by_birth, dor_by_first_appointment, trc_number, passport]);

            if (res.statusCode === 200)
                res.send('posted successfully');

        } catch (error) {
            res.json(error.message);
            console.log(error.message);
        }

    })
 

//Update one teacher
Router.put('/:id', async(req, res)=>{
try {

    const id = req.params.id
    const  { 
        name_of_teacher, remarks, sex, phone_no, file_no, school, zone, division, og_num, date_of_birth, nationality,  state,  lg_of_origin, ward, qualifications_with_date, year_of_degree, professional_status, subject_of_specialization, subject_taught, date_posted_to_present_school, date_of_first_appointment, cadre, date_of_last_promotion, salary_grade_level, pfa, pen_number, dor_by_birth, dor_by_first_appointment, trc_number, passport
      } = req.body
    const updateTeacher = await pool.query("UPDATE senior_school_teachers SET name_of_teacher = $1, remarks = $2, sex = $3,  phone_number =$4, file_number_tsc =$5, school =$6, school_zone =$7, division=$8, og_num =$9, date_of_birth =$10, nationality=$11, state =$12, lg_of_origin =$13, ward =$14, qualifications_with_date =$15, year_of_degree =$16, professional_status =$17, subject_of_specialization =$18, subject_taught = $19,  date_posted_to_present_school = $20, cadre = $21, date_of_first_appointment = $22, date_of_last_promotion = $23, salary_grade_level = $24, pfa = $25, pension_number = $26, dor_by_birth =$27, dor_by_first_appointment = $28, trc_number =$29, passport=$30 WHERE id = $31 RETURNING *", [name_of_teacher, remarks, sex, phone_no, file_no, school, zone, division, og_num, date_of_birth, nationality, state, lg_of_origin, ward, qualifications_with_date, year_of_degree, professional_status, subject_of_specialization, subject_taught, date_posted_to_present_school, cadre, date_of_first_appointment, date_of_last_promotion, salary_grade_level, pfa, pen_number, dor_by_birth, dor_by_first_appointment, trc_number, passport, id
    ]) 
      res.json('updated successfully')
} catch (error) {
    console.log(error.message)
    res.json(error.message)
}

})

//Delete One Teacher and add to table of retired teachers 
Router.delete('/:id', async (req, res)=>{
    try {
const {id} = req.params
const idExist = await pool.query("SELECT EXISTS (select * from senior_school_teachers WHERE id = $1)", [id]); 
if (!idExist.rows[0].exists) throw new Error ("staff not available")  
const deleteOneSeniorSchoolTeacher = await pool.query("DELETE FROM senior_school_teachers WHERE id = $1 RETURNING *", [id])
     if (res.statusCode === 200)  res.send('Deleted Successfully')
   } catch (error) {
        res.send(error.message)
        console.log(error.message)
    }
})


module.exports = Router