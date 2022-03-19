import SpotifyWebApi from 'spotify-web-api-node';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import config from '@utils/config';
import humanise from '@utils/humanise';

const spotify = new SpotifyWebApi({
    clientId: config.credentials.spotify.clientId,
    clientSecret: config.credentials.spotify.clientSecret,
    refreshToken: config.credentials.spotify.refreshToken
});

const refreshAccessToken = async () => {
    const newAccessToken = await spotify.refreshAccessToken();
    spotify.setAccessToken(newAccessToken.body.access_token);
};

const artistFilter = (a: SpotifyApi.ArtistObjectSimplified) => {
    return {
        name: a.name,
        id: a.id,
        url: a.external_urls.spotify
    };
};

const getCurrentTrack = async () => {
    await refreshAccessToken();

    const { is_playing: isPlaying, item: track } = (
        await spotify.getMyCurrentPlayingTrack({
            market: 'GB'
        })
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

        return {
            name,
            id,
            album: filteredAlbum,
            artists,
            durationInMs: duration_ms,
            humanDuration: humanise(duration_ms),
            trackNumber,
            preview,
            url: track.external_urls.spotify
        };
    } else {
        return null;
    }
};

export default async (_req: VercelRequest, res: VercelResponse) => {
    const track = await getCurrentTrack();

    if (!track) {
        return res.json({
            message: 'newt is not currently listening to anything!'
        });
    }

    return res.json(track);
};
