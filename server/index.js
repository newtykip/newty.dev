const app = require('express')();
const axios = require('axios');
const humanise = require('humanize-duration');
const chalk = require('chalk');
const SpotifyWebApi = require('spotify-web-api-node');
const moment = require('moment');
const dotenv = require('dotenv');
const port = process.env.PORT ?? 8080;

dotenv.config();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFYID,
    clientSecret: process.env.SPOTIFYSECRET,
    redirectUri: 'https://about.newtt.me/'
});

spotifyApi.authorizationCodeGrant(process.env.SPOTIFYGRANT).then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);

    setInterval(() => {
        spotifyApi.refreshAccessToken().then(data => {
            console.log(chalk.green('Refreshed access token!'));
            spotifyApi.setAccessToken(data.body['access_token']);
        }, err => console.error('Could not refresh access token', err))
    }, data.body['expires_in'] * 1000)
}, err => console.error('Could not complete authorization code grant', err));

const cors = require('cors')({
    methods: ['GET', 'HEAD'],
});

const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
};

app.get('/api/osu/:id?', async (req, res) => {
    await runMiddleware(req, res, cors);

    const id = req.params.id ? req.params.id : (process.env.OSUID ?? '16009610');
    const user = (await axios.get(`https://osu.ppy.sh/api/get_user?k=${process.env.OSU}&u=${id}&type=id`)).data[0];

    res.send({ 
        username: user ? user.username : null,
        id: user ? parseFloat(user.user_id) : null,
        globalRank: user ? parseFloat(user.pp_rank) : null,
        countryRank: user ? parseFloat(user.pp_country_rank) : null,
        country: user ? user.country : null,
        pp: user ? parseFloat(user.pp_raw) : null,
        level: user ? parseFloat(user.level) : null,
        timePlayed: user ? humanise(parseFloat(user.total_seconds_played) * 1000, { round: true, conjunction: ' and ' }) : null,
        accuracy: user ? parseFloat(user.accuracy).toFixed(2) : null,
        avatar: user ? `https://a.ppy.sh/${user.user_id}` : null,
        joinDate: user ? user.join_date : null,
        hits: {
            total: user ? parseFloat(user.count300) + parseFloat(user.count100) + parseFloat(user.count50) : null,
            300: user ? parseFloat(user.count300) : null,
            100: user ? parseFloat(user.count100) : null,
            50: user ? parseFloat(user.count50) : null,
        },
        playCount: user ? parseFloat(user.playcount) : null,
        scores: {
            ranked: user ? parseFloat(user.ranked_score) : null,
            total: user ? parseFloat(user.total_score) : null,
        },
        ranks: {
            ss: {
                nomod: user ? parseFloat(user.count_rank_ss) : null,
                hidden: user ? parseFloat(user.count_rank_ssh) : null,
                total: user ? parseFloat(user.count_rank_ss) + parseFloat(user.count_rank_ssh) : null,
            },
            s: {
                nomod: user ? parseFloat(user.count_rank_s) : null,
                hidden: user ? parseFloat(user.count_rank_sh) : null,
                total: user ? parseFloat(user.count_rank_s) + parseFloat(user.count_rank_sh) : null,
            },
            a: user ? parseFloat(user.count_rank_a) : null,
        },
    });
});

app.get('/api/np', async (req, res) => {
    await runMiddleware(req, res, cors);

    // Find the newt's current/most recent track
    const currentTrack = await spotifyApi.getMyCurrentPlayingTrack({ market: 'GB' });
    const track = currentTrack.body.item;

    // Get data from Spotify
    const { name, popularity, explicit, album } = track;
    const artists = track.artists.map(a => {
        return {
            name: a.name,
            spotifyId: a.id
        }
    });
    const artistHuman = track.artists.map(a => a.name).join(', ').replace(/, ((?:.(?!, ))+)$/, ' and $1');

    console.log(chalk.yellow(`Currently listening/most recently listening to: ${chalk.bold(`${artists[0].name} - ${name}`)}`));

    // Send back the data
    res.send({
        isPlaying: currentTrack.body.is_playing,
        artists,
        artistHuman, 
        name,
        spotifyId: track.id,
        url: track.external_urls.spotify,
        spotifyUri: track.uri,
        popularity, 
        duration: track.duration_ms,
        durationHuman: humanise(track.duration_ms, { round: true, conjunction: ' and ' }),
        explicit,
        preview: track.preview_url,
        trackNumber: track.track_number,
        album: {
            title: album.name,
            spotifyId: album.id,
            images: album.images,
            releaseDate: moment(album.release_date).format('DD/MM/YYYY')
        }
    });
});

app.listen(port, () => {
    console.log(chalk.green('Server starting (:'));
})
