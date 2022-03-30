import type { NextPage } from 'next';
import React, { useContext } from 'react';
import Card from '@components/Card';
import config from '@utils/config';
import Song from '@contexts/Song';
import GitHub from '@contexts/GitHub';
import Osu from '@contexts/Osu';
import Steam from '@contexts/Steam';
import Image from 'next/image';

const About: NextPage = () => {
    const currentSong = useContext(Song);
    const githubData = useContext(GitHub);
    const osuRank = useContext(Osu);
    const lastPlayedGame = useContext(Steam);

    return (
        <React.Fragment>
            <h1 className="heading text-4xl">
                Hi, I'm <span className="rainbow">newt!</span>
            </h1>

            <span className="subheading text-xl">I do stuff on the internet sometimes.</span>

            <h2 className="heading text-3xl mt-10">
                Sometimes that stuff is pretty <span className="rainbow">cool</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-8 place-items-center content-center items-center justify-center">
                <Card header="GitHub Repos">
                    <a
                        href={`https://github.com/${config.credentials.github.username}?tab=repositories`}
                        className="heading text-3xl hover:underline"
                    >
                        {githubData?.repoCount ?? '...'}
                    </a>
                </Card>

                <Card header="osu! rank">
                    <a
                        href={`https://osu.ppy.sh/u/${config.credentials.osu.userId}`}
                        className="heading text-2xl hover:underline"
                    >
                        {osuRank ? `#${osuRank?.toLocaleString()}` : '...'}
                    </a>
                </Card>

                <Card header="Most Played Recently?">
                    <span className="font-bold text-xl">
                        {lastPlayedGame?.name ? (
                            <a href={lastPlayedGame?.url} className="hover:underline">
                                {lastPlayedGame?.name}
                            </a>
                        ) : (
                            '...'
                        )}
                    </span>
                </Card>

                <Card header="Listening to">
                    <span className="font-bold text-xl">
                        {currentSong ? (
                            <a
                                href={
                                    currentSong?.url ??
                                    'https://open.spotify.com/user/31f5j3pn6dafanybum4r4fwsppea'
                                }
                                className="hover:underline"
                            >
                                {currentSong?.name
                                    ? `${currentSong?.artist} - ${currentSong?.name}`
                                    : 'nothing (:'}
                            </a>
                        ) : (
                            '...'
                        )}
                    </span>
                </Card>

                <Card header="Most Recent Commit">
                    <span className="subheading font-bold text-lg visible hidden md:inline">
                        {githubData?.recentCommit ? (
                            <React.Fragment>
                                (
                                <a
                                    href={`https://github.com/${githubData?.recentCommit?.repoOwner}/${githubData?.recentCommit?.repoName}`}
                                    className="hover:underline"
                                >
                                    {githubData?.recentCommit?.repoOwner}/
                                    {githubData?.recentCommit?.repoName}
                                </a>
                                )
                            </React.Fragment>
                        ) : (
                            '...'
                        )}

                        <br />
                    </span>
                    <span className="font-bold text-xl">
                        {githubData?.recentCommit ? (
                            <a href={githubData?.recentCommit?.url} className="hover:underline">
                                {githubData?.recentCommit?.message}
                            </a>
                        ) : (
                            '...'
                        )}
                    </span>
                </Card>

                <Card header="Most Recent Star">
                    <span className="font-bold text-xl">
                        {githubData?.recentStar ? (
                            <a
                                href={`https://github.com/${githubData?.recentStar?.repoOwner}/${githubData?.recentStar?.repoName}`}
                                className="hover:underline"
                            >
                                {githubData?.recentStar?.repoOwner}/
                                {githubData?.recentStar?.repoName}
                            </a>
                        ) : (
                            '...'
                        )}
                    </span>
                </Card>
            </div>

            <Image src="/jinx.webp" width={250} height={250} className="rounded-3xl" />
        </React.Fragment>
    );
};

export default About;
