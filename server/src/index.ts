import chalk from 'chalk';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import SpotifyWebApi from 'spotify-web-api-node';
import np from './np';
import osu from './osu';

// Load environmental variables
dotenv.config();

// Find the port
const port = process.env.PORT ?? 8080;

// Create servers
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new SocketServer(server);

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
                    console.log(chalk.green('Refreshed access token!'));
                    spotify.setAccessToken(data.body['access_token']);
                },
                (err) => console.error('Could not refresh access token', err),
            );
        }, data.body['expires_in'] * 1000);
    },
    (err) => console.error('Could not complete authorization code grant', err),
);

// osu! profile lookup
app.get('/api/osu/:id?', async (req, res) => await osu(req, res));

// Now Playing
app.get('/api/np', async (_, res) => await np(res, spotify));

// Socket.io
io.on('connection', (socket) => {
    console.log('A new user has connected!');
});

// Start all of the servers
server.listen(port, () => {
    console.log(chalk.green(`Server starting on *:${port} (:`));
});
