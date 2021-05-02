const {
    response,
    request
} = require('express');
const db = require('../database/config');


const ordersPost = async (req = request, res = response) => {
    const {
        persona,
        productos,
        total
    } = req.body;

    const promesaOrder = new Promise((resolve, reject) => {
        db.query(`INSERT INTO cash_order(nombres, apellidos,correo,dni, total, createdAt) values (?,?,?,?,?,?)`,
            [persona.nombres, persona.apellidos, persona.correo, persona.dni, total, new Date()],
            (err, rows) => {
                if (!err) {
                    const {
                        insertId
                    } = rows;
                    idorder = insertId;
                    resolve(idorder)
                } else {
                    reject(err)
                }
            })
    });

    const idOrder = await promesaOrder;
    productos.map(producto => {
        db.query(`INSERT INTO cash_order_detail(idorder, idproduct, cantidad, precio,subtotal) values (?,?,?,?,?)`,
            [idOrder, producto.idproduct, producto.cantidad, producto.precio, (Number(producto.precio) * Number(producto.cantidad))],
            (err, rows) => {
                if (!err)
                    console.log('se registor ok el producto');
                else
                    console.log(err);
            });
    });

    res.status(201).json({
        status: 'Order saved',
        idOrder
    });




}

module.exports = {
    ordersPost
}