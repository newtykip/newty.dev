export default {
    credentials: {
        spotify: {
            id: process.env.SPOTIFY_CLIENT_ID,
            secret: process.env.SPOTIFY_CLIENT_SECRET,
            refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
        },
        osu: {
            apiKey: process.env.OSU_API_KEY,
            newtId: '16009610',
        },
    },
    endpoints: {
        osu: {
            getUser: 'https://osu.ppy.sh/api/get_user',
            getAvatar: 'https://a.ppy.sh',
        },
    },
};
