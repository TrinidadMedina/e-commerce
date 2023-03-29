const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    res.render('/')
/*     res.status(500).json({
        success: false,
        error: err.message
    }) */
}

module.exports = errorHandler;