import axios from 'axios';
import config from './config';
import countries from 'i18n-iso-countries';
import { humanise } from './utils';

const getUserAvatar = (id: string) => `${config.endpoints.osu.getAvatar}/${id}`;

const getOsuUser = async (
    type: 'id' | 'username' = 'id',
    q: string = config.credentials.osu.newtId,
) => {
    const params = new URLSearchParams({
        k: config.credentials.osu.apiKey,
        u: q,
        type: type === 'username' ? 'string' : 'id',
    });

    const { data } = await axios.get(
        `${config.endpoints.osu.getUser}?${params}`,
    );
    const user: any = data[0];

    if (user) {
        const timePlayedInMs = parseFloat(user.total_seconds_played) * 1000;

        const hits = {
            300: parseInt(user.count300),
            100: parseInt(user.count100),
            50: parseInt(user.count50),
        };

        const scores = {
            ranked: parseInt(user.ranked_score),
            total: parseInt(user.total_score),
        };

        const ssRanks = {
            gold: parseInt(user.count_rank_ss),
            silver: parseInt(user.count_rank_ssh),
        };

        const sRanks = {
            gold: parseInt(user.count_rank_s),
            silver: parseInt(user.count_rank_sh),
        };

        hits['total'] = hits[300] + hits[100] + hits[50];
        scores['unranked'] = scores.total - scores.ranked;
        ssRanks['total'] = ssRanks.gold + ssRanks.silver;
        sRanks['total'] = sRanks.gold + sRanks.silver;

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
            avatar: getUserAvatar(user.user_id),
            joinDate: user.join_date,
            hits,
            scores,
            ranks: {
                ss: ssRanks,
                s: sRanks,
                a: parseInt(user.count_rank_a),
            },
        };
    } else {
        return null;
    }
};

export { getOsuUser };
