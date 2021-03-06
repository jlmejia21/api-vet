const {
    response,
    request
} = require('express');
const db = require('../database/config');

const usersGet = (req = request, res = response) => {
    db.query('SELECT * FROM user', (err, rows, fields) => {
        if (!err) {
            let users = [];
            if (rows.length > 0) {
                users = rows.map(({
                    password,
                    ...resto
                }) => resto);
            }
            res.json(users);
        } else
            console.log(err);
    })
}
const usersGetById = (req = request, res = response) => {
    const {
        id
    } = req.params;
    db.query('SELECT * FROM user WHERE iduser = ?', [id], (err, rows, fields) => {
        if (!err)
            res.json(rows[0]);
        else
            console.log(err);
    })
}
const usersPost = (req = request, res = response) => {
    const {
        username,
        password,
        nombres,
        apellidos,
        tipo_usuario
    } = req.body;
    db.query(`INSERT INTO user(username,password,nombres,apellidos,tipo_usuario) values (?,?,?,?,?)`,
        [username, password, nombres, apellidos, tipo_usuario],
        (err, rows, fields) => {
            if (!err)
                res.status(201).json({
                    status: 'User saved'
                });
            else
                console.log(err);
        });
}
const usersPut = (req = request, res = response) => {
    const {
        username,
        password,
        nombres,
        apellidos,
        tipo_usuario,
        iduser
    } = req.body;
    db.query(`update user set username=?,password=?,nombres=?,apellidos=?,tipo_usuario=? where iduser=?`, [username, password, nombres, apellidos, tipo_usuario, iduser],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    status: 'User updated'
                });
            } else {
                console.log(err);
            }
        });
}
const usersDelete = (req = request, res = response) => {
    const {
        id
    } = req.params;
    db.query(`delete from user where iduser=?`, [id],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    status: 'User deleted'
                });
            } else {
                console.log(err);
            }
        });

}

const usersLogin = (req = request, res = response) => {
    const {
        username,
        password
    } = req.body;
    db.query(` SELECT * FROM user where username = ? and password = ?`, [username, password],
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

}

const usersGetUserType = (req = request, res = response) => {
    const {
        id
    } = req.params;
    db.query('SELECT * FROM user where  tipo_usuario = ?', [id], (err, rows, fields) => {
        if (!err) {
            let users = [];
            if (rows.length > 0) {
                users = rows.map(({
                    password,
                    ...resto
                }) => resto);
            }
            res.json(users);
        } else
            console.log(err);
    })

}
module.exports = {
    usersGet,
    usersGetById,
    usersPost,
    usersPut,
    usersDelete,
    usersLogin,
    usersGetUserType
}