const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth.middleware');
const {
  getOrder
} = require ('../../controllers/order.controllers');

router
.get('/one-order', authMiddleware, getOrder)

module.exports = router;