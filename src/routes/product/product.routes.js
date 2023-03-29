const {Router} = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct
} = require ('../../controllers/product.controllers');

const router = Router();

router
.post('/', createProduct)
.get('/', getProducts)
.post('/product', getProduct)
.delete('/:uuid', deleteProduct)

module.exports = router;