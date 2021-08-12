const SpotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv');
dotenv.config();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFYID,
    clientSecret: process.env.SPOTIFYSECRET,
    redirectUri: process.env.SPOTIFYREDIRECT
});

console.log(spotifyApi.createAuthorizeURL(['user-read-playback-state'], '34fFs29kd09'))
