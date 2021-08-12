import { Request, Response } from 'express';
import axios from 'axios';
import humanise from 'humanize-duration';

export default async (req: Request, res: Response) => {
    const id = req.params.id ? req.params.id : process.env.OSUID ?? '16009610';
    const user = (
        await axios.get(
            `https://osu.ppy.sh/api/get_user?k=${process.env.OSU}&u=${id}&type=id`,
        )
    ).data[0];

    res.send({
        username: user ? user.username : null,
        id: user ? parseFloat(user.user_id) : null,
        globalRank: user ? parseFloat(user.pp_rank) : null,
        countryRank: user ? parseFloat(user.pp_country_rank) : null,
        country: user ? user.country : null,
        pp: user ? parseFloat(user.pp_raw) : null,
        level: user ? parseFloat(user.level) : null,
        timePlayed: user
            ? humanise(parseFloat(user.total_seconds_played) * 1000, {
                  round: true,
                  conjunction: ' and ',
              })
            : null,
        accuracy: user ? parseFloat(user.accuracy).toFixed(2) : null,
        avatar: user ? `https://a.ppy.sh/${user.user_id}` : null,
        joinDate: user ? user.join_date : null,
        hits: {
            total: user
                ? parseFloat(user.count300) +
                  parseFloat(user.count100) +
                  parseFloat(user.count50)
                : null,
            300: user ? parseFloat(user.count300) : null,
            100: user ? parseFloat(user.count100) : null,
            50: user ? parseFloat(user.count50) : null,
        },
        playCount: user ? parseFloat(user.playcount) : null,
        scores: {
            ranked: user ? parseFloat(user.ranked_score) : null,
            total: user ? parseFloat(user.total_score) : null,
        },
        ranks: {
            ss: {
                nomod: user ? parseFloat(user.count_rank_ss) : null,
                hidden: user ? parseFloat(user.count_rank_ssh) : null,
                total: user
                    ? parseFloat(user.count_rank_ss) +
                      parseFloat(user.count_rank_ssh)
                    : null,
            },
            s: {
                nomod: user ? parseFloat(user.count_rank_s) : null,
                hidden: user ? parseFloat(user.count_rank_sh) : null,
                total: user
                    ? parseFloat(user.count_rank_s) +
                      parseFloat(user.count_rank_sh)
                    : null,
            },
            a: user ? parseFloat(user.count_rank_a) : null,
        },
    });
};
