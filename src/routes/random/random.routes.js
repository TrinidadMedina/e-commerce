const router = require('express').Router();
const {fork} = require('child_process');

router.get('/randoms', (req, res) => {
    const cant = req.query.cant || 100000000
    const forked = fork(process.cwd() + '/src/services/random/random.services.js')
    forked.send(cant);
    forked.on('message', (randomNumbers) => {
      res.status(200).json({randomNumbers})
    });
});

module.exports = router;
