import { createContext } from 'react';

export interface CommitData {
    id: string;
    repoName: string;
    message: string;
}

interface GitHubData {
    repoCount: number;
    recentCommit: CommitData;
}

export default createContext<GitHubData>(null);
