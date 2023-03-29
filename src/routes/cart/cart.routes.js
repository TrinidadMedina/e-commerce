const router = require('express').Router()
const {createCart, insertProduct, deleteProduct} = require ('../../controllers/cart.controllers');

router
.post('/', createCart)
.post('/insert', insertProduct)
.post('/delete', deleteProduct)

module.exports = router;