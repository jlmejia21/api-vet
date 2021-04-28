const {
    response,
    request
} = require('express');
const db = require('../database/config');

const productsGet = (req = request, res = response) => {
    db.query('SELECT * FROM product', (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            console.log(err);
    })
}
const productsGetById = (req = request, res = response) => {
    const {
        id
    } = req.params;
    db.query('SELECT * FROM product WHERE idproduct = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
}
const productsPost = (req = request, res = response) => {
    const {
        nombre,
        descripcion,
        precio,
        imgUrl
    } = req.body;
    db.query(`INSERT INTO product(nombre, descripcion, precio, imgUrl) values (?,?,?,?)`, [nombre, descripcion, precio, imgUrl],
        (err, rows, fields) => {
            if (!err)
                res.status(201).json({
                    status: 'Product saved'
                });
            else
                console.log(err);
        });
}
const productsPut = (req = request, res = response) => {
    const {
        idproduct,
        nombre,
        descripcion,
        precio,
        imgUrl
    } = req.body;
    db.query(`UPDATE product set nombre = ? , descripcion = ?, precio = ?, imgUrl =?  where idproduct = ? `, [nombre, descripcion, precio, imgUrl, idproduct],
        (err, rows, fields) => {
            if (!err)
                res.json({
                    status: 'Product updated'
                });
            else
                console.log(err);

        });
}
const productsDelete = (req = request, res = response) => {
    const {
        id
    } = req.params;
    db.query('DELETE  FROM product WHERE idproduct = ?', [id], (err, rows, fields) => {
        if (!err)
            res.json({
                status: 'Product deleted'
            });
        else
            console.log(err);
    })
}
module.exports = {
    productsGet,
    productsGetById,
    productsPost,
    productsPut,
    productsDelete
}