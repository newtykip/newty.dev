import countries from 'i18n-iso-countries';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import config from '@utils/config';
import humanise from '@utils/humanise';
import formatDate from '@utils/formatDate';

type OsuQueryType = 'id' | 'username';

const getAvatar = (id: string) => `${config.endpoints.osu.getAvatar}/${id}`;

const getUser = async (type: OsuQueryType, q: string) => {
    const params = new URLSearchParams({
        k: config.credentials.osu.apiKey,
        u: q,
        type: type === 'username' ? 'string' : 'id'
    });

    const [user] = await fetch(`${config.endpoints.osu.getUser}?${params.toString()}`).then(res =>
        res.json()
    );

    if (user) {
        const timePlayedInMs = parseFloat(user.total_seconds_played) * 1000;

        const hits = {
            300: parseInt(user.count300),
            100: parseInt(user.count100),
            50: parseInt(user.count50)
        };

        const scores = {
            ranked: parseInt(user.ranked_score),
            total: parseInt(user.total_score)
        };

        const ss = {
            gold: parseInt(user.count_rank_ss),
            silver: parseInt(user.count_rank_ssh)
        };

        const s = {
            gold: parseInt(user.count_rank_s),
            silver: parseInt(user.count_rank_sh)
        };

        return {
            username: user.username,
            id: parseInt(user.user_id),
            globalRank: parseInt(user.pp_rank),
            countryRank: parseInt(user.pp_country_rank),
            country: countries.getName(user.country, 'en'),
            countryCode: user.country,
            pp: parseFloat(user.pp_raw),
            level: parseFloat(user.level),
            timePlayedInMs,
            humanTimePlayed: humanise(timePlayedInMs),
            playCount: parseInt(user.playcount),
            accuracy: parseFloat(parseFloat(user.accuracy).toFixed(2)),
            avatar: getAvatar(user.user_id),
            joinDate: formatDate(user.join_date),
            hits: {
                ...hits,
                total: hits[300] + hits[100] + hits[50]
            },
            scores: {
                ...scores,
                unranked: scores.total - scores.ranked
            },
            ranks: {
                ss: {
                    ...ss,
                    total: ss.gold + ss.silver
                },
                s: {
                    ...s,
                    total: s.gold + s.silver
                },
                a: parseInt(user.count_rank_a)
            }
        };
    } else {
        return null;
    }
};

export default async (req: VercelRequest, res: VercelResponse) => {
    // Take either potential parameter
    const { id, username } = req.query;

    // Determine the input type, and search for the user
    var inputType: OsuQueryType = 'id';
    if (username) inputType = 'username';

    const user = await getUser(
        inputType,
        inputType === 'id'
            ? id
                ? (id as string)
                : config.credentials.osu.userId
            : username
            ? (username as string)
            : config.credentials.osu.userId
    );

    // Ensure that the user exists
    if (!user) {
        return res.json({
            message: `Sorry, but I could not find an active osu! user with the ${inputType} ${
                inputType === 'id' ? id : username
            }`
        });
    } else {
        return res.json(user);
    }
};
