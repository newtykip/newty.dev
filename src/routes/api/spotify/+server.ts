import { json, type RequestHandler } from '@sveltejs/kit';
import SpotifyWebApi from 'spotify-web-api-node';
import { spotify } from '$lib/credentials';
import humanise from '$lib/utils/humanise';

const client = new SpotifyWebApi({
    clientId: spotify.clientId,
    clientSecret: spotify.clientSecret,
    refreshToken: spotify.refreshToken
});

// Refreshes and updates the client's access token
const refreshAccessToken = async () => {
    const { access_token } = (await client.refreshAccessToken()).body;

    client.setAccessToken(access_token);
};

// Filters artist data
const artistFilter = (artist: SpotifyApi.ArtistObjectSimplified) => {
    return {
        name: artist.name,
        id: artist.id,
        url: artist.external_urls.spotify
    };
};

export const GET: RequestHandler = async () => {
    await refreshAccessToken(); // todo: figure out a more effective way to refresh the access token

    const { is_playing: isPlaying, item: track } = (
        await client.getMyCurrentPlayingTrack({ market: 'GB' })
    ).body as { is_playing: boolean; item: SpotifyApi.TrackObjectFull };

    if (track && isPlaying) {
        const {
            name,
            album,
            duration_ms,
            track_number: trackNumber,
            preview_url: preview,
            id
        } = track;

        const filteredAlbum = {
            name: album.name,
            url: album.external_urls.spotify,
            id: album.id,
            releaseDate: album['release_date'],
            trackCount: album['total_tracks'],
            covers: album.images,
            artists: album['artists'].map(artistFilter)
        };

        const artists = track.artists.map(artistFilter);

        return json({
            name,
            id,
            album: filteredAlbum,
            artists,
            durationInMs: duration_ms,
            humanDuration: humanise(duration_ms),
            trackNumber,
            preview,
            url: track.external_urls.spotify
        });
    }

    return json({
        message: 'newt is not currently listening to anything!'
    });
};
