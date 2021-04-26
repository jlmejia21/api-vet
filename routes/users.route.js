const express = require('express');
const router = express.Router();

const {
    usersGet,
    usersGetById,
    usersPost,
    usersPut,
    usersDelete,
    usersLogin,
    usersGetUserType
} = require('../controllers/users.controller');

router.get('/', usersGet);
router.get('/:id', usersGetById);
router.post('/', usersPost);
router.put('/', usersPut);
router.delete('/:id', usersDelete);
router.post('/login', usersLogin);

router.get('/userType/:id', usersGetUserType)

module.exports = router;