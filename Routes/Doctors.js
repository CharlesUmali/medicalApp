"use restrict";
const Joi = require("joi");
const express = require("express");
const { conn } = require('../Connection.js');
let router = express.Router();

router
.route("/")
.get((req, res) => {
  const sql = "SELECT * FROM tblDoctors"; //No tblDoctors are created yet.
  conn.query(sql, (err, result, fields) => {
    if(err) throw err;
    res.send(result);
  })
})
.post((req, res) => {
  const { error } = validateDoctor(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const sql = "INSERT INTO tblDoctors (doctorFirstName, doctorLastName, doctorSpecialization, doctorAge, doctorGender, doctorContactNumber, doctorAddress) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const doctor = [req.body.doctorFirstName, req.body.doctorLastName, req.body.doctorSpecialization, req.body.doctorAge, req.body.doctorGender, req.body.doctorContactNumber, req.body.doctorAddress];
  conn.query(sql, doctor, (err, result, fields) => {
    if(err) throw err;
    res.send(doctor);
  })
})

router
.route('/id:')
.get((req, res) => {
  const sql = "SELECT * FROM tblDoctors where doctorID = ?";
  conn.query(sql, [req.params.id], (err, result, fields) => {
    if(err) throw err;
    if(!result[0]) return res.status(400).send('Doctor not found!');
    res.send(result);
  });
})
.delete((req, res) => {
  let sql = "SELECT * FROM tblDoctors WHERE doctorID = ?";
  conn.query(sql, [req.params.id], (err, result, fields) => {
    if(err) throw err;
    if(!result[0]) return res.status(400).send('Doctor not found!');
    sql = "DELETE FROM tblDoctors WHERE doctorID = ?";

    conn.query(sql, [req.params.id], (err, result, fields) => {
      if(err) throw err;
      res.send(result);
    });
  });
})
.put((req, res) => {
  const { error } = validateDoctor(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let sql = "SELECT * FROM tblDoctors WHERE doctorID = ?";
  conn.query(sql, [req.params.id], (err, result, fields) => {
    if(err) throw err;
    if(!result[0]) return res.status(404).send('Doctor Not Found!');
    sql = "UPDATE tblDoctors SET doctorFirstName = ?, doctorLastName = ?, doctorSpecialization = ?, doctorAge = ?, doctorGender = ?, doctorContactNumber = ?, doctorAddress = ? WHERE doctorID = ?";

    const doctor = [req.body.doctorFirstName, req.body.doctorLastName, req.body.doctorSpecialization, req.body.doctorAge, req.body.doctorGender, req.body.doctorContactNumber, req.body.doctorAddress, req.params.id];
    conn.query(sql, doctor, (err, result, fields) => {
      if(err) throw err;
      res.send(doctor);
    });
  });
})

function validateDoctor(doctor){
  const schema = Joi.object({
    doctorFirstName: Joi.string().min(3).max(15).required(),
    doctorLastName: Joi.string().min(3).max(15).required(),
    doctorSpecialization: Joi.string().min(5).max(20).required(),
    doctorAge: Joi.number().integer().min(1).max(100).required(),
    doctorGender: Joi.string().required(),
    doctorContactNumber Joi.string().max(11),
    doctorAddress: Joi.string().required(),
  });
  return schema.validate(doctor);
}

module.exports = router;
