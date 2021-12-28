import SpotifyWebApi from 'spotify-web-api-node';
import config from '../apiHelpers/config';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { humanise } from '../apiHelpers/utils';

const spotify = new SpotifyWebApi({
    clientId: config.credentials.spotify.id,
    clientSecret: config.credentials.spotify.secret,
    refreshToken: config.credentials.spotify.refreshToken,
});

const refreshAccessToken = async () => {
    const newAccessToken = await spotify.refreshAccessToken();
    spotify.setAccessToken(newAccessToken.body.access_token);
};

const artistFilter = (a: SpotifyApi.ArtistObjectSimplified) => {
    return {
        name: a.name,
        id: a.id,
        url: a.external_urls.spotify,
    };
};

const getCurrentTrack = async () => {
    // Refresh the access token
    await refreshAccessToken();

    // Get the current track
    const res = (
        await spotify.getMyCurrentPlayingTrack({
            market: 'GB',
        })
    ).body;
    const track = res.item as SpotifyApi.TrackObjectFull;

    // If newt is currently listening to something, return filtered information about the track
    // otherwise return null
    if (track && res.is_playing) {
        const {
            name,
            album,
            duration_ms,
            track_number: trackNumber,
            preview_url: preview,
            id,
        } = track;

        const filteredAlbum = {
            name: album.name,
            url: album.external_urls.spotify,
            id: album.id,
            releaseDate: album['release_date'],
            trackCount: album['total_tracks'],
            covers: album.images,
            artists: album['artists'].map(artistFilter),
        };

        const artists = track.artists.map(artistFilter);

        return {
            name,
            id,
            album: filteredAlbum,
            artists,
            durationInMs: duration_ms,
            humanDuration: humanise(duration_ms),
            trackNumber,
            preview,
            url: track.external_urls.spotify,
        };
    } else {
        return null;
    }
};

export default async (_req: VercelRequest, res: VercelResponse) => {
    const track = await getCurrentTrack();

    if (!track) {
        return res.json({
            message: 'newt is not currently listening to anything!',
        });
    }

    return res.json(track);
};
