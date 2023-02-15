const db = require('./connection');
const mysql = require('mysql');
const md5 = require('MD5');
const response = require('./response');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');

//controller untuk Register
app.post('/pegawai/registrasi', (req, res) => {
  const { IdPegawai, Username, Status, KdKategoryUser } = req.body,
    Password = md5.req.body;

  const sql = `INSERT INTO login (IdPegawai, Username, Password, Status, KdKategoryUser) VALUES ('${IdPegawai}', '${Username}', '${Password}', '${Status}', '${KdKategoryUser}')`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'Invalid', 'Error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, 'Register Successfuly', res);
    }
  });
});
