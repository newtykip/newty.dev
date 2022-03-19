import '@styles/globals.css';
import '@styles/tailwind.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'animate.css';

import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { createContext, useEffect, useState } from 'react';
import { config as faConfig } from '@fortawesome/fontawesome-svg-core';
import config from '@utils/config';
faConfig.autoAddCss = false;

// todo: refactor song
export const SongContext = createContext<Song>(null);
export const LiveContext = createContext<LiveStatus>(null);
export const RankContext = createContext<number>(null);
export const RepoContext = createContext<number>(null);
export const GameContext = createContext<Game>(null);

interface LiveStatus {
    live: boolean;
    username: string;
}

interface Song {
    artist: string;
    title: string;
    url: string;
}

interface Game {
    name: string;
    playTime: number;
    url: string;
}

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
    const [currentSong, setCurrentSong] = useState<Song>(null);
    const [liveStatus, setLiveStatus] = useState<LiveStatus>(null);
    const [repoCount, setRepoCount] = useState<number>(null);
    const [osuRank, setOsuRank] = useState<number>(null);
    const [recentGame, setRecentGame] = useState<Game>();

    const updateSong = async () => {
        const data = await fetch(`${window.location.origin}/api/spotify`).then(res => res.json());

        setCurrentSong({
            artist: data.artists?.[0]?.name,
            title: data.name,
            url: data.url
        });
    };

    useEffect(() => {
        // Check if newt is live on Twitch
        fetch(`${window.location.origin}/api/twitch`)
            .then(res => res.json())
            .then(data => {
                let live = true; // todo: make this false
                if (data.stream) live = true;

                setLiveStatus({
                    live,
                    username: data.username
                });
            });

        // Fetch GitHub repo count
        fetch(`https://api.github.com/users/${config.credentials.github.username}/repos`)
            .then(res => res.json())
            .then(data => setRepoCount(data.length));

        // Fetch osu! rank
        fetch(`${window.location.origin}/api/osu`)
            .then(res => res.json())
            .then(data => setOsuRank(data.globalRank));

        // Fetch last played game
        fetch(`${window.location.origin}/api/steam`)
            .then(res => res.json())
            .then(({ mostPlayedRecently }) => {
                if (mostPlayedRecently) {
                    const { name, appID, humanTimePlayed } = mostPlayedRecently;

                    setRecentGame({
                        name,
                        playTime: humanTimePlayed,
                        url: `https://store.steampowered.com/app/${appID}`
                    });
                }
            });

        // Keep track of the current song
        updateSong();
        setInterval(updateSong, 10000);
    }, []);

    return (
        <SongContext.Provider value={currentSong}>
            <LiveContext.Provider value={liveStatus}>
                <RepoContext.Provider value={repoCount}>
                    <RankContext.Provider value={osuRank}>
                        <GameContext.Provider value={recentGame}>
                            <div className="max-w-screen-lg mx-auto px-6 py-4 md:px-4 md:py-10 text-center">
                                <Navbar />
                                <Component {...pageProps} />
                                <Footer />
                            </div>
                        </GameContext.Provider>
                    </RankContext.Provider>
                </RepoContext.Provider>
            </LiveContext.Provider>
        </SongContext.Provider>
    );
};

export default App;
