import { VercelRequest, VercelResponse } from '@vercel/node';
import { getCurrentTrack } from '../lib/spotify';

export default async (_req: VercelRequest, res: VercelResponse) => {
    const track = await getCurrentTrack();

    if (!track) {
        return res.json({
            message: 'newt is not currently listening to anything!',
        });
    }

    return res.json(track);
};
