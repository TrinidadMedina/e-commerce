const app = require('./app');
//const minimist = require('minimist');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const loggerConsole = require('./src/utils/log4js').loggerConsole;

const options = {default:{PORT: 8080, MODO: 'FORK'}}

//const argParams = minimist(process.argv.slice(2), options);

const PORT = process.env.PORT || 3001;
const SERVER_TYPE = process.env.SERVER_TYPE || 'fork';

if(SERVER_TYPE==='cluster'){
    if(cluster.isPrimary){
        loggerConsole.info(`Primary ${process.pid} is running`);
        for(let i = 0; i < numCPUs; i++){
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            loggerConsole.info(`worker ${worker.process.pid} died`);
        })
    }else{
        app.listen(PORT, () => {
            loggerConsole.info(`Worker ${process.pid} started on port: ${PORT}`);
        });
    };
}else{
    app.listen(PORT, () => {
        loggerConsole.info(`Server up and running on port: ${PORT}`);
    });
};
