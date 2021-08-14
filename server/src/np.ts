import SpotifyWebApi from 'spotify-web-api-node';
import { Response } from 'express';
import humanise from 'humanize-duration';
import moment from 'moment';
import Logger from './Logger';

export default async (
    res: Response,
    spotify: SpotifyWebApi,
    logger: Logger,
) => {
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

    logger.info(
        `Currently listening/most recently listening to: ${logger.bold(
            `${artists[0].name} - ${name}`,
        )}`,
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
