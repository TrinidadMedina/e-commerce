const app = require('./app');
const minimist = require('minimist');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const options = {default:{PORT: 8080, MODO: 'FORK'}}

const argParams = minimist(process.argv.slice(2), options);
/* const PORT = argParams.PORT;
const MODO = argParams.MODO;

 if(MODO==='CLUSTER'){
    if(cluster.isPrimary){
        console.log(`Primary ${process.pid} is running`);
        for(let i = 0; i < numCPUs; i++){
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        })
    }else{
        app.listen(PORT, () => {
            console.info(`Worker ${process.pid} started on port: ${PORT}`);
        });
    };
}else{
    app.listen(PORT, () => {
        console.info(`Server up and running on port: ${PORT}`);
    });
} */

const PORT = process.env.PORT || 3001;

 app.listen(PORT, () => {
    console.info(`Server up and running on port: ${PORT}`)
})
