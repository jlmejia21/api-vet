const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})



router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM user WHERE iduser = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
})

router.post('/', (req, res) => {
    const { username, password, nombres, apellidos, tipo_usuario } = req.body;
    mysqlConnection.query(`INSERT INTO user(username,password,nombres,apellidos,tipo_usuario) values (?,?,?,?,?)`, [username, password, nombres, apellidos, tipo_usuario],
        (err, rows, fields) => {
            if (!err) {
                res.status(201).json({ status: 'User saved' });
            } else {
                console.log(err);
            }
        });
})

router.put('/', (req, res) => {
    const { username, password, nombres, apellidos, tipo_usuario, iduser } = req.body;
    mysqlConnection.query(`update user set username=?,password=?,nombres=?,apellidos=?,tipo_usuario=? where iduser=?`, [username, password, nombres, apellidos, tipo_usuario, iduser],
        (err, rows, fields) => {
            if (!err) {
                res.json({ status: 'User updated' });
            } else {
                console.log(err);
            }
        });
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query(`delete from user where iduser=?`, [id],
        (err, rows, fields) => {
            if (!err) {
                res.json({ status: 'User deleted' });
            } else {
                console.log(err);
            }
        });
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    mysqlConnection.query(` SELECT * FROM user where username = ? and password = ?`, [username, password],
        (err, rows, fields) => {
            if (!err) {
                if (rows.length == 0) {
                    res.json({
                        status: 'error',
                        user: null,
                        message: "Usuario o clave incorrectos"
                    })
                } else {
                    res.json({
                        status: 'success',
                        user: rows[0],
                        message: "Login correcto"
                    })
                }
            } else {
                console.log(err);
            }
        });
})

router.get('/userType/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM user where  tipo_usuario = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

module.exports = router;