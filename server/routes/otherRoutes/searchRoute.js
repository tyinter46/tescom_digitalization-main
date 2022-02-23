const express = require("express");
const Router = express.Router();
const pool = require("../../db.js");

Router.get("/teachingStaff", async (req, res) => {
  try {
    const {    name    } = req.query;


const results = await pool.query("SELECT * FROM combined_school_teachers WHERE  name_of_teacher || remarks || sex || phone_number || file_number_tsc || school || school_zone || division || og_number  || date_of_birth || nationality || state || lg_of_origin || ward || qualifications_with_date ILIKE $1 UNION ALL SELECT * FROM junior_school_teachers WHERE  name_of_teacher || remarks || sex || phone_number || file_number_tsc || school || school_zone || division || og_number  || date_of_birth || nationality || state || lg_of_origin || ward || qualifications_with_date ILIKE $1 UNION ALL SELECT * FROM senior_school_teachers WHERE name_of_teacher || remarks || sex || phone_number || file_number_tsc || school || school_zone || division || og_number  || date_of_birth || nationality || state || lg_of_origin || ward || qualifications_with_date ILIKE $1", [`%${name}%`]);
//const results = await pool.query("SELECT * FROM combined_school_teachers WHERE  name_of_teacher || ' ' ||   remarks || ' ' || sex || ' ' || phone_number || ' ' ||   file_number_tsc || ' ' || school || ' '||  school_zone || ' '  ||  division || ' '|| og_number || ' ' ||  date_of_birth || ' ' ||  nationality || ' ' ||  state || ' ' || lg_of_||igin || ' ' || ward || ' ' ||  qualifications_with_date || ' ' ||  year_of_degree || ' ' ||  professional_status || ' ' || subject_of_specialization || ' ' || subject_taught || ' ' || date_posted_to_present_school || ' ' ||  cadre || ' ' ||   date_of_first_appointment || ' ' || date_of_last_promotion ||  ' ' || salary_grade_level || ' ' ||  pfa || ' ' ||  pension_number || ' ' ||  d|| || ' ' ||  trc_number ILIKE $1", [`%${name}%`]);
console.log(results.rows.length)
res.status(200).json(results.rows) 
} catch (error) {
    res.status(404).json(error.message);
    console.log(error.message)
  }
});


module.exports = Router
