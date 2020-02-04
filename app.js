const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const eo = require('./lib/eo');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
    if (req.body.secret === config.secret) {
        console.log('Shuffling artwork...');
        eo.sendShuffle();
        return res.send('OK');
    }
    res.sendStatus(401);
});

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));