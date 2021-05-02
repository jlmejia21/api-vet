const express = require('express');
const router = express.Router();

const {
    ordersPost
} = require('../controllers/orders.controller');

router.post('/', ordersPost);


module.exports = router;