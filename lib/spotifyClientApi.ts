import config from './config';
import SpotifyWebApi from 'spotify-web-api-node';
import { humanise } from './utils';

const spotify = new SpotifyWebApi({
    clientId: config.spotify.id,
    clientSecret: config.spotify.secret,
    refreshToken: config.spotify.refreshToken,
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
    const track = (
        await spotify.getMyCurrentPlayingTrack({
            market: 'GB',
        })
    ).body.item as SpotifyApi.TrackObjectFull;

    // If newt is currently listening to something, return filtered information about the track
    // otherwise return null
    if (track) {
        const {
            name,
            album,
            duration_ms,
            track_number: trackNumber,
            preview_url: preview,
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
            album: filteredAlbum,
            artists,
            durationInMs: duration_ms,
            humanDuration: humanise(duration_ms),
            trackNumber,
            preview,
        };
    } else {
        return null;
    }
};

export { getCurrentTrack };
