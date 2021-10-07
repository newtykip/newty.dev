import { VercelRequest, VercelResponse } from '@vercel/node';
import { getOsuUser } from '../lib/osu';

export default async (req: VercelRequest, res: VercelResponse) => {
    const { id } = req.query;
    const user = await getOsuUser(id as string);

    if (!user) {
        return res.json({
            message: `I could not find an active user on osu! with the ID ${id}!`,
        });
    }

    return res.json(user);
};
