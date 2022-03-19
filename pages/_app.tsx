import '@styles/globals.css';
import '@styles/tailwind.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'animate.css';

import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import React, { useEffect, useState } from 'react';
import { config as faConfig } from '@fortawesome/fontawesome-svg-core';
import config from '@utils/config';
import SongContext, { Song } from '@contexts/Song';
import Twitch, { LiveStatus } from '@contexts/Twitch';
import Steam, { Game } from '@contexts/Steam';
import Repo from '@contexts/Repo';
import Osu from '@contexts/Osu';
import Favicon from 'react-favicon';

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

    const frames = Array.from(
        Array(9),
        (_, x) => `./favicon/${x}.png?v=${Math.floor(Math.random() * 100000)}`
    );

    return (
        <React.Fragment>
            <Favicon url={frames} animated={true} animationDelay={60} />

            <SongContext.Provider value={currentSong}>
                <Twitch.Provider value={liveStatus}>
                    <Repo.Provider value={repoCount}>
                        <Osu.Provider value={osuRank}>
                            <Steam.Provider value={recentGame}>
                                <div className="max-w-screen-lg mx-auto px-6 py-4 md:px-4 md:py-10 text-center">
                                    <Navbar />
                                    <Component {...pageProps} />
                                    <Footer />
                                </div>
                            </Steam.Provider>
                        </Osu.Provider>
                    </Repo.Provider>
                </Twitch.Provider>
            </SongContext.Provider>
        </React.Fragment>
    );
};

faConfig.autoAddCss = false;
export default App;
