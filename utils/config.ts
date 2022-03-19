export default {
    credentials: {
        spotify: {
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
        },
        osu: {
            apiKey: process.env.OSU_API_KEY,
            userId: '16009610'
        },
        twitch: {
            clientId: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET,
            userId: '428663118'
        },
        github: {
            username: 'newtykins'
        }
    },
    endpoints: {
        osu: {
            getUser: 'https://osu.ppy.sh/api/get_user',
            getAvatar: 'https://a.ppy.sh'
        },
        twitch: {
            getAccessToken: 'https://id.twitch.tv/oauth2/token',
            getStream: 'https://api.twitch.tv/helix/streams',
            getUser: 'https://api.twitch.tv/helix/users',
            getTags: 'https://api.twitch.tv/helix/tags/streams'
        }
    }
};