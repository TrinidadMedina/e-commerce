const {server} = require('./app');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
//const loggerConsole = require('./src/utils/log4js').loggerConsole;

const PORT = process.env.PORT || 3001;
const SERVER_TYPE = process.env.SERVER_TYPE || 'fork';

if(SERVER_TYPE==='cluster'){
    if(cluster.isPrimary){
        //loggerConsole.info(`Primary ${process.pid} is running`);
        console.info(`Primary ${process.pid} is running`);
        for(let i = 0; i < numCPUs; i++){
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            //loggerConsole.info(`worker ${worker.process.pid} died`);
            console.info(`worker ${worker.process.pid} died`);
        })
    }else{
        server.listen(PORT, () => {
            //loggerConsole.info(`Worker ${process.pid} started on port: ${PORT}`);
            console.info(`Worker ${process.pid} started on port: ${PORT}`);
        });
    };
}else{
    server.listen(PORT, () => {
        console.info(`Server up and running on port: ${PORT}`)
        //loggerConsole.info(`Server up and running on port: ${PORT}`);
    });
};
