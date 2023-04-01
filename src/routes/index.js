const router = require('express').Router();
const pagesRouter = require('./pages/pages.routes');
const sessionRouter = require('./session/session.routes');
const cartRouter = require('./cart/cart.routes');
const productRouter = require('./product/product.routes');
const infoRouter = require('./info/info.routes');

router.get('/health', (_req, res) => {
    res.status(200).json({
        health: 'up',
        enviroment: process.env.ENVIROMENT || 'Undefined'
    });
})
.use(pagesRouter)
.use(sessionRouter)
.use('/cart', cartRouter)
.use('/products', productRouter)
.use('/info', infoRouter);

module.exports = router;