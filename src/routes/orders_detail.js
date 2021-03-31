const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM cash_order_detail', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM cash_order_detail WHERE idorder_detail = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
})

router.post('/', (req, res) => {
    const { idorder, idproduct, cantidad, subtotal } = req.body;
    mysqlConnection.query(`INSERT INTO cash_order_detail(idorder,idproduct,cantidad,subtotal) values (?,?,?,?)`, [idorder, idproduct, cantidad, subtotal],
        (err, rows, fields) => {
            if (!err) {
                res.status(201).json({ status: 'Order detail saved' });
            } else {
                console.log(err);
            }
        });
})


module.exports = router;