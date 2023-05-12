const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth.middleware');
const {
  createCart,
  createProduct,
  insertProduct,
  deleteProduct,
  buyCart
} = require ('../../controllers/cart.controllers');

router
.post('/create', authMiddleware, createCart)
.post('/create-product', createProduct)
.post('/insert', authMiddleware, insertProduct)
.post('/delete', authMiddleware, deleteProduct)
.post('/buy', authMiddleware, buyCart)

module.exports = router;