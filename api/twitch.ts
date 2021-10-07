import { VercelRequest, VercelResponse } from '@vercel/node';
import { getTwitchUser } from '../lib/twitch';

export default async (req: VercelRequest, res: VercelResponse) => {
    const { q } = req.query;
    const user = await getTwitchUser(q as string);

    if (!user) {
        return res.json({
            message: `I could not find an active user on Twitch with the ${
                isNaN(q as any) ? 'username' : 'id'
            } ${q}!`,
        });
    }

    return res.json(user);
};
