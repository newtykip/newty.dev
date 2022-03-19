import { createContext } from 'react';

interface LiveStatus {
    live: boolean;
    username: string;
}

export type { LiveStatus };
export default createContext<LiveStatus>(null);
