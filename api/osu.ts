import { VercelRequest, VercelResponse } from '@vercel/node';
import { getOsuUser } from '../lib/osu';

type Await<T> = T extends Promise<infer U> ? U : T;

export default async (req: VercelRequest, res: VercelResponse) => {
    const { id, username } = req.query;
    var user: Await<ReturnType<typeof getOsuUser>>;

    if (id) {
        user = await getOsuUser('id', id as string);

        if (!user) {
            return res.json({
                message: `I could not find an active user on osu! with the ID ${id}!`,
            });
        }
    } else if (username) {
        user = await getOsuUser('username', username as string);

        if (!user) {
            return res.json({
                message: `I could not find an active user on osu! with the username ${username}!`,
            });
        }
    }

    return res.json(user);
};
