import config from '@utils/config';
import SteamAPI from 'steamapi';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import formatDate from '@utils/formatDate';
import countries from 'i18n-iso-countries';
import humanise from '@utils/humanise';

const communityIdTest = /^[0-9]*$/;

const steam = new SteamAPI(config.credentials.steam.apiKey);

const getSteamId = async (input: string) => {
    const isCommunityId = communityIdTest.test(input);

    if (isCommunityId) {
        return input;
    } else {
        const params = new URLSearchParams({
            vanityurl: input,
            key: config.credentials.steam.apiKey
        });

        const {
            response: { steamid }
        } = await fetch(`${config.endpoints.steam.getId}?${params}`).then(res => res.json());

        return steamid;
    }
};

export default async (req: VercelRequest, res: VercelResponse) => {
    const { id } = req.query;
    const steamId = await getSteamId((id as string) ?? config.credentials.steam.userId);

    // Fetch the user's data
    const {
        nickname,
        avatar,
        url,
        created: createdTimestamp,
        lastLogOff: lastLogOffTimestamp,
        countryCode
    } = (await steam.getUserSummary(steamId)) as unknown as SteamAPI.PlayerSummary;

    const createdAt = formatDate(createdTimestamp);
    const lastLogOff = formatDate(lastLogOffTimestamp);

    const [{ playTime, playTime2, ...mostPlayedRecently }] = await steam.getUserRecentGames(
        steamId
    );

    const timePlayedInMs = playTime * 60000;

    return res.json({
        steamId,
        nickname,
        avatar,
        url,
        createdAt,
        lastLogOff,
        country: countries.getName(countryCode, 'en'),
        mostPlayedRecently: {
            ...mostPlayedRecently,
            timePlayedInMs,
            humanTimePlayed: humanise(timePlayedInMs)
        }
    });
};
