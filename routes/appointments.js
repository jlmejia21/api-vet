const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database/config');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM appointment', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

router.get('/:id', (req, res) => {
    const {
        id
    } = req.params;
    mysqlConnection.query('SELECT * FROM appointment WHERE idappointment = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
})

router.post('/', (req, res) => {
    const {
        propietario,
        mascota,
        tipo_mascota,
        peso,
        sexo,
        id_medico,
        fecha,
        observaciones
    } = req.body;
    mysqlConnection.query(`INSERT INTO appointment(propietario, mascota, tipo_mascota, peso,sexo,id_medico,fecha,observaciones) 
            values (?,?,?,?,?,?,?,?)`, [propietario, mascota, tipo_mascota, peso, sexo, id_medico, fecha, observaciones],
        (err, rows, fields) => {
            if (!err) {
                res.status(201).json({
                    status: 'appointment  saved'
                });
            } else {
                console.log(err);
            }
        });
})

router.put('/', (req, res) => {
    const {
        username,
        password,
        nombres,
        apellidos,
        tipo_usuario,
        iduser
    } = req.body;
    mysqlConnection.query(`update appointment set username=?,password=?,nombres=?,apellidos=?,tipo_usuario=? where iduser=?`, [username, password, nombres, apellidos, tipo_usuario, iduser],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    status: 'appointment updated'
                });
            } else {
                console.log(err);
            }
        });
})

router.delete('/:id', (req, res) => {
    const {
        id
    } = req.params;

    mysqlConnection.query(`delete from appointment where idappointment=?`, [id],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    status: 'Appointment deleted'
                });
            } else {
                console.log(err);
            }
        });
})


module.exports = router;