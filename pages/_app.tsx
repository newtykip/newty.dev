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
import GitHub, { CommitData, StarData } from '@contexts/GitHub';
import Osu from '@contexts/Osu';
import Favicon from 'react-favicon';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import Blog from '@contexts/Blog';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
    const [currentSong, setCurrentSong] = useState<Song>(null);
    const [liveStatus, setLiveStatus] = useState<LiveStatus>(null);
    const [repoCount, setRepoCount] = useState<number>(null);
    const [recentCommit, setRecentCommit] = useState<CommitData>(null);
    const [recentStar, setRecentStar] = useState<StarData>(null);
    const [osuRank, setOsuRank] = useState<number>(null);
    const [recentGame, setRecentGame] = useState<Game>();
    const [articles, setArticles] = useState<any[]>();

    const updateSong = async () => {
        const { artists, name, url } = await fetch(`${window.location.origin}/api/spotify`).then(
            res => res.json()
        );

        const artist = artists?.[0]?.name;

        setCurrentSong({
            artist,
            name,
            url
        });
    };

    useEffect(() => {
        // Check if newt is live on Twitch
        fetch(`${window.location.origin}/api/twitch`)
            .then(res => res.json())
            .then(data => {
                let live = false;
                if (data.stream) live = true;

                setLiveStatus({
                    live,
                    username: data.username
                });
            });

        // Fetch GitHub repo count
        fetch(`https://api.github.com/users/${config.credentials.github.username}/repos`)
            .then(res => res.json())
            .then((repos: any[]) => setRepoCount(repos.length));

        // Fetch most recent commit
        fetch(
            `https://api.github.com/search/commits?q=author:${config.credentials.github.username}&sort=author-date&order=desc&page=1`
        )
            .then(res => res.json())
            .then(({ items: commits }: { items: any[] }) => {
                const [recentCommit] = commits;
                const [repoOwner, repoName] = recentCommit?.repository?.['full_name']?.split('/');
                const { message } = recentCommit?.commit;

                setRecentCommit({
                    repoOwner,
                    repoName,
                    url: `https://github.com/${repoOwner}/${repoName}/commit/${recentCommit.sha}`,
                    message
                });
            });

        // Fetch the most recently starred repository
        fetch(`https://api.github.com/users/${config.credentials.github.username}/starred`)
            .then(res => res.json())
            .then((repos: any[]) => {
                const [recentStar] = repos;
                const [repoOwner, repoName] = recentStar?.['full_name']?.split('/');

                setRecentStar({
                    repoOwner,
                    repoName
                });
            });

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

        // Fetch blog posts
        fetch(`${config.baseUrl}/api/posts`)
            .then(res => res.json())
            .then(res => {
                setArticles(res);
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
            <Head>
                <title>newt!!</title>
            </Head>

            <Favicon url={frames} animated={true} animationDelay={60} />

            <ThemeProvider defaultTheme="system" attribute="class">
                <SongContext.Provider value={currentSong}>
                    <Twitch.Provider value={liveStatus}>
                        <GitHub.Provider value={{ repoCount, recentCommit, recentStar }}>
                            <Osu.Provider value={osuRank}>
                                <Steam.Provider value={recentGame}>
                                    <Blog.Provider value={articles}>
                                        <div className="max-w-screen-lg mx-auto px-6 py-4 md:px-4 md:py-10 text-center">
                                            <Navbar />
                                            <Component {...pageProps} />
                                            <Footer />
                                        </div>
                                    </Blog.Provider>
                                </Steam.Provider>
                            </Osu.Provider>
                        </GitHub.Provider>
                    </Twitch.Provider>
                </SongContext.Provider>
            </ThemeProvider>
        </React.Fragment>
    );
};

faConfig.autoAddCss = false;
export default App;
