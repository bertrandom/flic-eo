const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const eoClient = require('eo-api-client');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/shuffle', async (req, res) => {
    if (req.body && req.body.secret === config.secret) {
        console.log('Shuffling artwork...');
        await eoClient.displayArtwork(config.eo.deviceId, config.eo.blankArtworkId);
        await eoClient.displayPlaylist(config.eo.deviceId, config.eo.playlistId, true);
        return res.send('OK');
    }
    res.sendStatus(401);
});

app.post('/off', async (req, res) => {
    if (req.body && req.body.secret === config.secret) {
        console.log('Turning off...');
        await eoClient.turnOff(config.eo.deviceId);
        return res.send('OK');
    }
    res.sendStatus(401);
});

app.post('/on', async (req, res) => {
    if (req.body && req.body.secret === config.secret) {
        console.log('Turning on...');
        await eoClient.turnOn(config.eo.deviceId);
        return res.send('OK');
    }
    res.sendStatus(401);
});

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));