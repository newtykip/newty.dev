import { createContext } from 'react';

interface Game {
    name: string;
    playTime: number;
    url: string;
}

export type { Game };
export default createContext<Game>(null);
