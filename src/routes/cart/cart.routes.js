const router = require('express').Router();
const {
  createCart,
  createProduct,
  insertProduct,
  deleteProduct,
  buyCart
} = require ('../../controllers/cart.controllers');

router
.post('/', createCart)
.post('/', createProduct)
.post('/insert', insertProduct)
.post('/delete', deleteProduct)
.post('/buy', buyCart)

module.exports = router;