const config = require('config');
const rp = require('request-promise-native');
const request = require('request');
const cheerio = require('cheerio');

let signIn = () => {

    const SIGN_IN_URL = 'https://www.electricobjects.com/sign_in';

    let j = request.jar();

    return rp({
        method: 'GET',
        uri: SIGN_IN_URL,
        jar: j,
        transform: (body) => {
            let $ = cheerio.load(body);
            return $('meta[name=csrf-token]').attr('content');
        }
    }).then((csrfToken) => rp({
        method: 'POST',
        uri: SIGN_IN_URL,
        jar: j,
        followAllRedirects: true,
        resolveWithFullResponse: true,
        form: {
            "user[email]": config.eo.email,
            "user[password]": config.eo.password,
            "user[remember_me]": "true"
        },
        headers: {
            "x-csrf-token": csrfToken
        }
    })).then(response => j);

};

let shuffleArt = j => rp({
    method: 'PUT',
    uri: `https://www.electricobjects.com/api/v6/devices/${config.eo.deviceId}/displayed/playlists/${config.eo.playlistId}`,
    jar: j,
    json: true,
    body: {
        shuffle: true
    }
}).then(response => j);

let displayBlank = j => rp({
    method: 'PUT',
    uri: `https://www.electricobjects.com/api/v6/devices/${config.eo.deviceId}/displayed/artworks/${config.eo.blankArtworkId}`,
    jar: j,
    json: true
}).then(response => j);

const sendShuffle = () => {
    return signIn()
        .then(displayBlank)
        .then(shuffleArt)
};

exports.sendShuffle = sendShuffle;