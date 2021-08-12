import SpotifyWebApi from 'spotify-web-api-node';
import chalk from 'chalk';
import { Response } from 'express';
import humanise from 'humanize-duration';
import moment from 'moment';

export default async (res: Response, spotify: SpotifyWebApi) => {
    // Find the newt's current/most recent track
    const currentTrack = await spotify.getMyCurrentPlayingTrack({
        market: 'GB',
    });
    const track = currentTrack.body.item as SpotifyApi.TrackObjectFull;

    // Get data from Spotify
    const { name, popularity, explicit, album } = track;
    const artists = track.artists.map((a) => {
        return {
            name: a.name,
            spotifyId: a.id,
        };
    });
    const artistHuman = track.artists
        .map((a) => a.name)
        .join(', ')
        .replace(/, ((?:.(?!, ))+)$/, ' and $1');

    console.log(
        chalk.yellow(
            `Currently listening/most recently listening to: ${chalk.bold(
                `${artists[0].name} - ${name}`,
            )}`,
        ),
    );

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
        durationHuman: humanise(track.duration_ms, {
            round: true,
            conjunction: ' and ',
        }),
        explicit,
        preview: track.preview_url,
        trackNumber: track.track_number,
        album: {
            title: album.name,
            spotifyId: album.id,
            images: album.images,
            releaseDate: moment(album.release_date).format('DD/MM/YYYY'),
        },
    });
};
