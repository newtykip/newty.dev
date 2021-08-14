import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import SpotifyWebApi from 'spotify-web-api-node';
import TwitchPS from 'twitchps';
import np from './np';
import osu from './osu';
import Logger from './Logger';

// Load environmental variables
dotenv.config();

// Set up variables
const port = process.env.PORT ?? 8080;
const twitchUsername = process.env.TWITCH ?? 'newtykin';
var isLive = false;

// Create logger
const logger = new Logger();

// Create servers
const app = express();
app.use(cors());

// Set up Twitch PubSub
const ps = new TwitchPS({
    init_topics: [{ topic: `video-playback.${twitchUsername}` }],
});

ps.on('stream-up', () => {
    logger.twitch('newt is now live!');
    isLive = true;
});

ps.on('stream-down', () => {
    logger.twitch('newt is no longer live!');
    isLive = false;
});

logger.twitch('Connected to Twitch PubSub!');

// Initiate the Spotify client and authorise it
const spotify = new SpotifyWebApi({
    clientId: process.env.SPOTIFYID,
    clientSecret: process.env.SPOTIFYSECRET,
    redirectUri: 'https://about.newtt.me/',
});

spotify.authorizationCodeGrant(process.env.SPOTIFYGRANT).then(
    (data) => {
        spotify.setAccessToken(data.body['access_token']);
        spotify.setRefreshToken(data.body['refresh_token']);

        setInterval(() => {
            spotify.refreshAccessToken().then(
                (data) => {
                    logger.spotify('Refreshed access token!');
                    spotify.setAccessToken(data.body['access_token']);
                },
                (err) => logger.error('Could not refresh access token', err),
            );
        }, data.body['expires_in'] * 1000);

        logger.spotify('Connected to Spotify!');
    },
    (err) => logger.error('Could not connect to spotify:', err),
);

// Now Playing
app.get('/api/np', async (_, res) => await np(res, spotify, logger));

// osu! profile lookup
app.get('/api/osu/:id?', async (req, res) => await osu(req, res, logger));

// Twitch
app.get('/api/twitch', async (_req, res) => {
    res.send({ isLive });
});

// Start all of the servers
app.listen(port, () => logger.info(`Server starting on *:${port} (:`));
