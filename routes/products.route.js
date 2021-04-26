const express = require('express');
const router = express.Router();
const {
    productsGet,
    productsGetById,
    productsPost,
    productsPut,
    productsDelete
} = require('../controllers/products.controller');

router.get('/', productsGet);
router.get('/:id', productsGetById);
router.post('/', productsPost);
router.put('/', productsPut);
router.delete('/:id', productsDelete);

module.exports = router;