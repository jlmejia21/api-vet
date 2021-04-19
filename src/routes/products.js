const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM product', (err, rows, fields) => {
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
    mysqlConnection.query('SELECT * FROM product WHERE idproduct = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
})

router.post('/', (req, res) => {
    const {
        nombre,
        descripcion,
        precio,
        imgUrl
    } = req.body;
    mysqlConnection.query(`INSERT INTO product(nombre, descripcion, precio, imgUrl) values (?,?,?,?)`, [nombre, descripcion, precio, imgUrl],
        (err, rows, fields) => {
            if (!err) {
                res.status(201).json({
                    status: 'Product saved'
                });
            } else {
                console.log(err);
            }
        });
})

router.put('/', (req, res) => {
    const {
        idproduct,
        nombre,
        descripcion,
        precio,
        imgUrl
    } = req.body;
    mysqlConnection.query(`UPDATE product set nombre = ? , descripcion = ?, precio = ?, imgUrl =?  where idproduct = ? `, [nombre, descripcion, precio, imgUrl, idproduct],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    status: 'Product updated'
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
    mysqlConnection.query('DELETE  FROM product WHERE idproduct = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({
                status: 'Product deleted'
            });
        } else {
            console.log(err);
        }
    })
})



module.exports = router;