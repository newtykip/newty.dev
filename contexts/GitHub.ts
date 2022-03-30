import { createContext } from 'react';

export interface CommitData {
    repoOwner: string;
    repoName: string;
    url: string;
    message: string;
}

export interface StarData {
    repoOwner: string;
    repoName: string;
}

interface GitHubData {
    repoCount: number;
    recentCommit: CommitData;
    recentStar: StarData;
}

export default createContext<GitHubData>(null);
