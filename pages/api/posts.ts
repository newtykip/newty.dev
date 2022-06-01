import config from '@utils/config';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
    const data = await fetch(`${config.endpoints.devTo.getArticles}`, {
        headers: {
            'api-key': config.credentials.devTo.apiKey
        }
    }).then(res => res.json());

    return res.json(data);
};
