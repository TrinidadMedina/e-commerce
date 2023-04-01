const router = require('express').Router();
const {
  createCart,
  createProduct,
  insertProduct,
  deleteProduct
} = require ('../../controllers/cart.controllers');

router
.post('/', createCart)
.post('/', createProduct)
.post('/insert', insertProduct)
.post('/delete', deleteProduct)

module.exports = router;