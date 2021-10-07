<div align="center">
    <img src="./img/meow.png">
    <h1>newtt.me</h1>
</div>

## What is newtt.me?

This repository is the source code for newt's website, hosted on Vercel.
It consists of serverless functions to handle things such as live stream checks and Spotify now playing indicators.

Some API endpoints are also useful for other projects that I make - and maybe even your own. Documentation can be found below. Example outputs are at the bottom of the readme too.

## Documentation

### /api/osu

Gets key statistics and information about an osu! profile. While both query parameters are optional, **one** is required always. If both are provided, it prefers IDs. If nothing is provided, it returns information about newt's profile. This is used in [osu-profile](https://github.com/newtykins/osu-profile)!

#### Query Parameters

| Parameter | What is it?                     | Required? | Example  |
| --------- | ------------------------------- | --------- | -------- |
| username  | The username of an osu! profile | No        | Newt x3  |
| id        | The ID of an osu! profile       | No        | 16009610 |

### /api/np

Fetches information about the song newt is currently listening to, if any. It fetches this data live from the Spotify API, so it is as accurate as I can possibly realistically get it. There are no parameters for this, and no you can not track your own now playing. However, you could try and take inspiration from this repo and the [Spotify library file](lib/spotify.ts) if you'd like. This is used solely for the website itself.

### /api/twitch

Fetches information about a Twitch streamer and - if they are streaming - their current stream. If no query (q) is provided, it returns information about [newt's Twitch channel](https://twitch.tv/newtykin)!

| Parameter | What is it?                                    | Required? | Example                                |
| --------- | ---------------------------------------------- | --------- | -------------------------------------- |
| q         | Either the username or ID of a Twitch channel. | No        | [newtykin](https://twitch.tv/newtykin) |

### Example Results

#### /api/osu

```json
{
    "username": "Newt x3",
    "id": 16009610,
    "globalRank": 70642,
    "countryRank": 2457,
    "country": "United Kingdom",
    "countryCode": "GB",
    "pp": 4527.14,
    "level": 100.019,
    "timePlayedInMs": 1918859000,
    "humanTimePlayed": "3 weeks, 1 day, 5 hours, and 59 seconds",
    "playCount": 41560,
    "accuracy": 99.51,
    "avatar": "https://a.ppy.sh/16009610",
    "joinDate": "2020-01-18 19:18:48",
    "hits": {
        "50": 48221,
        "100": 411817,
        "300": 5439744,
        "total": 5899782
    },
    "scores": {
        "ranked": 5470896112,
        "total": 28876296662,
        "unranked": 23405400550
    },
    "ranks": {
        "ss": {
            "gold": 29,
            "silver": 101,
            "total": 130
        },
        "s": {
            "gold": 317,
            "silver": 291,
            "total": 608
        },
        "a": 774
    }
}
```

#### /api/np

```json
{
    "name": "Snowdin Town",
    "album": {
        "name": "UNDERTALE Soundtrack",
        "url": "https://open.spotify.com/album/2M2Ae2SvZe3fmzUtlVOV5Z",
        "id": "2M2Ae2SvZe3fmzUtlVOV5Z",
        "releaseDate": "2015-09-15",
        "trackCount": 101,
        "covers": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b27324edb22d068eb245a924b7f2",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e0224edb22d068eb245a924b7f2",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d0000485124edb22d068eb245a924b7f2",
                "width": 64
            }
        ],
        "artists": [
            {
                "name": "Toby Fox",
                "id": "57DlMWmbVIf2ssJ8QBpBau",
                "url": "https://open.spotify.com/artist/57DlMWmbVIf2ssJ8QBpBau"
            }
        ]
    },
    "artists": [
        {
            "name": "Toby Fox",
            "id": "57DlMWmbVIf2ssJ8QBpBau",
            "url": "https://open.spotify.com/artist/57DlMWmbVIf2ssJ8QBpBau"
        }
    ],
    "durationInMs": 76168,
    "humanDuration": "1 minute and 16 seconds",
    "trackNumber": 22,
    "preview": "https://p.scdn.co/mp3-preview/b76b1f5f666d3a29599f2b489587d1c539761dec?cid=c7bd28a5b6aa4277966a5585addc46a0",
    "url": "https://open.spotify.com/track/6VhLpbQlPWgU11As8woUIC"
}
```

#### /api/twitch?q=BTMC

```json
{
    "id": 46708418,
    "username": "BTMC",
    "broadcasterType": "partner",
    "description": "Welcome to the channel! My name is Edward. I'm a top 100 osu! player who live-streams full time here on Twitch. Thanks for checking by!",
    "images": {
        "profilePicture": "https://static-cdn.jtvnw.net/jtv_user_pictures/45a8bc2e-8b4d-43ac-8678-8082c5e834fa-profile_image-300x300.png",
        "offline": "https://static-cdn.jtvnw.net/jtv_user_pictures/e0526e4d-f847-43cb-bc40-c94d990676c8-channel_offline_image-1920x1080.png"
    },
    "viewCount": 14201381,
    "createdAt": "2013-07-27T17:41:27Z",
    "stream": {
        "title": "#908 REPORTING FOR DUTY | !video",
        "viewerCount": 1871,
        "startedAt": "2021-10-07T16:55:50Z",
        "language": "English",
        "thumbnail": "https://static-cdn.jtvnw.net/previews-ttv/live_user_btmc-{width}x{height}.jpg",
        "isMature": true
    }
}
```
