const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM cash_order', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM cash_order WHERE idorder = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
})

router.post('/', (req, res) => {
    const { iduser, total } = req.body;
    mysqlConnection.query(`INSERT INTO cash_order(iduser,total,createdAt) values (?,?,CURRENT_TIMESTAMP())`, [iduser, total],
        (err, rows, fields) => {
            if (!err) {
                res.status(201).json({ status: 'Order saved' });
            } else {
                console.log(err);
            }
        });
})


module.exports = router;