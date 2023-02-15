const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./connection');
const response = require('./response');

// routes /URL/ Endpoint utama method GET
app.use(bodyParser.json());

app.get('/', (req, res) => {
  response(200, 'API v1 Ready To Go', 'SUCCES', res);
});

//GET Data Pegawai
app.get('/pegawai', (req, res) => {
  const sql = 'SELECT * FROM datapegawai';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'Get all data from Pegawai', res);
  });
});

//GET Data Pasien
app.get('/pasien', (req, res) => {
  const sql = 'SELECT * FROM pasien';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'Get all data from Pasien', res);
  });
});

//GET Data Pegawai By ID
app.get('/pegawai/:IdPegawai', (req, res) => {
  const IdPegawai = req.params.IdPegawai;
  const sql = `SELECT * FROM datapegawai WHERE IdPegawai = ${IdPegawai}`;
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'Get detail Pegawai by ID', res);
  });
});

//GET Data Pasien By NoCM
app.get('/pasien/:NoCM', (req, res) => {
  const NoCM = req.params.NoCM;
  const sql = `SELECT * FROM pasien WHERE NoCM = ${NoCM}`;
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'Get detail Pasien by No Rekam Medis', res);
  });
});

// POST/Insert Data Pegawai
app.post('/pegawai', (req, res) => {
  const { IdPegawai, KdJenisPegawai, KdTittle, NamaLengkap, NamaKeluarga, NamaPanggilan, JenisKelamin, TempatLahir, TglLahir, TglMasuk, TglKeluar } = req.body;
  const sql = `INSERT INTO datapegawai (IdPegawai, KdJenisPegawai, KdTittle, NamaLengkap, NamaKeluarga, NamaPanggilan, JenisKelamin, TempatLahir, TglLahir, TglMasuk, TglKeluar) VALUES ('${IdPegawai}', '${KdJenisPegawai}', '${KdTittle}', '${NamaLengkap}', '${NamaKeluarga}', '${NamaPanggilan}', '${JenisKelamin}', '${TempatLahir}', '${TglLahir}', '${TglMasuk}', '${TglKeluar}')`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'Invalid', 'Error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, 'Data Added Successfuly', res);
    }
  });
});

// POST/Insert Data Pasien
app.post('/pasien', (req, res) => {
  const { NoCM, NoIdentitas, TglDaftarMembership, Title, NamaLengkap, NamaPanggilan, TempatLahir, TglLahir, JenisKelamin, Alamat, Telepon, Propinsi, Kota, Kecamatan, Kelurahan, RTRW, KodePos, QPasien } = req.body;
  const sql = `INSERT INTO pasien (NoIdentitas, TglDaftarMembership, Title, NamaLengkap, NamaPanggilan, TempatLahir, TglLahir, JenisKelamin, Alamat, Telepon, Propinsi, Kota, Kecamatan, Kelurahan , RTRW, KodePos, QPasien) VALUES ('${NoIdentitas}','${TglDaftarMembership}','${Title}','${NamaLengkap}','${NamaPanggilan}','${TempatLahir}','${TglLahir}','${JenisKelamin}','${Alamat}','${Telepon}','${Propinsi}','${Kota}','${Kecamatan}','${Kelurahan}','${RTRW}','${KodePos}','${QPasien}' )`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'Invalid', 'Error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, 'Data Added Successfuly', res);
    }
  });
});

// PUT/Update data Pegawai
app.put('/pegawai', (req, res) => {
  const { IdPegawai, NamaLengkap, JenisKelamin, TempatLahir, TglLahir, TglMasuk, TglKeluar } = req.body;
  const sql = `UPDATE datapegawai SET NamaLengkap = '${NamaLengkap}', JenisKelamin='${JenisKelamin}', TempatLahir='${TempatLahir}', TglLahir='${TglLahir}', TglMasuk='${TglMasuk}', TglKeluar='${TglKeluar}' WHERE IdPegawai = ${IdPegawai}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'Invalid', 'Error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, 'Update Data Pegawai', res);
    } else {
      response(404, 'User Not Found', 'Error', res);
    }
  });
});

// PUT/Update data Pasien
app.put('/pasien', (req, res) => {
  const { NoCM, NoIdentitas, TglDaftarMembership, Title, NamaLengkap, NamaPanggilan, TempatLahir, TglLahir, JenisKelamin, Alamat, Telepon, Propinsi, Kota, Kecamatan, Kelurahan, RTRW, KodePos, QPasien } = req.body;
  const sql = `UPDATE pasien SET NoIdentitas='${NoIdentitas}', TglDaftarMembership='${TglDaftarMembership}', Title='${Title}', NamaLengkap = '${NamaLengkap}', NamaPanggilan='${NamaPanggilan}', TempatLahir='${TempatLahir}', TglLahir='${TglLahir}', JenisKelamin='${JenisKelamin}', Alamat='${Alamat}', Telepon='${Telepon}', Propinsi='${Propinsi}', Kota='${Kota}', Kecamatan='${Kecamatan}', Kelurahan='${Kelurahan}', RTRW='${RTRW}',KodePos='${KodePos}', QPasien='${QPasien}' WHERE NoCM = ${NoCM}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'Invalid', 'Error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, 'Update Data Pegawai', res);
    } else {
      response(404, 'User Not Found', 'Error', res);
    }
  });
});

//DELETE Data Pegawai
app.delete('/pegawai', (req, res) => {
  const { IdPegawai } = req.body;
  const sql = `DELETE FROM datapegawai WHERE IdPegawai = ${IdPegawai}`;
  db.query(sql, (err, fields) => {
    if (err) response(500, 'Invalid', 'Error', res);
    if (fields?.affectedRows) {
      const data = {
        isDeleted: fields.affectedRows,
      };
      response(200, data, 'Delete Data Pegawai Success', res);
    } else {
      response(404, 'User Not Found', 'Error', res);
    }
  });
});

//DELETE Data Pasien
app.delete('/pasien', (req, res) => {
  const { NoCM } = req.body;
  const sql = `DELETE FROM pasien WHERE NoCM = ${NoCM}`;
  db.query(sql, (err, fields) => {
    if (err) response(500, 'Invalid', 'Error', res);
    if (fields?.affectedRows) {
      const data = {
        isDeleted: fields.affectedRows,
      };
      response(200, data, 'Delete Data Pasien Success', res);
    } else {
      response(404, 'User Not Found', 'Error', res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
