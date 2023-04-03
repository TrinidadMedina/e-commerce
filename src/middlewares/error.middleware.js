const loggerFile = require('../utils/log4js').loggerFile;

const errorMiddleware = (err, req, res, _next) => {
    const userData = req.user; 
    loggerFile.error(err.message);
    if(req.path === '/' || req.path === '/signup'){
        return res.render('auth-error', {message: err.message})
    }
    return res.render('error', {message: err.message, userData})
    
}

module.exports = errorMiddleware;