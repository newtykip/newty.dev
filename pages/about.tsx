import type { NextPage } from 'next';
import React, { useContext } from 'react';
import Card from '@components/Card';
import config from '@utils/config';
import Song from '@contexts/Song';
import Repo from '@contexts/Repo';
import Osu from '@contexts/Osu';
import Steam from '@contexts/Steam';
import Image from 'next/image';

const About: NextPage = () => {
    const currentSong = useContext(Song);
    const repoCount = useContext(Repo);
    const osuRank = useContext(Osu);
    const lastPlayedGame = useContext(Steam);

    return (
        <React.Fragment>
            <h1 className="heading text-4xl">
                Hi, I'm <span className="rainbow">newt</span>.
            </h1>

            <span className="subheading text-xl">I do stuff on the internet sometimes.</span>

            <h2 className="heading text-3xl mt-10">
                Sometimes that stuff is pretty <span className="rainbow">cool</span>
            </h2>

            <div className="grid grid-flow-row justify-center items-center md:grid-flow-col gap-2 mb-8">
                <Card header="GitHub Repos">
                    <a
                        href={`https://github.com/${config.credentials.github.username}`}
                        className="heading text-3xl hover:underline"
                    >
                        {repoCount ?? '...'}
                    </a>
                </Card>

                <Card header="osu! rank">
                    <a
                        href={`https://osu.ppy.sh/u/${config.credentials.osu.userId}`}
                        className="heading text-2xl hover:underline"
                    >
                        {`#${osuRank?.toLocaleString()}` ?? '...'}
                    </a>
                </Card>

                <Card header="Listening to">
                    <span className="font-bold text-xl">
                        {currentSong ? (
                            currentSong?.title ? (
                                <a href={currentSong?.url} className="hover:underline">
                                    {currentSong?.artist} - {currentSong?.title}
                                </a>
                            ) : (
                                'nothing (:'
                            )
                        ) : (
                            '...'
                        )}
                    </span>
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
            </div>

            {/* todo: add more content */}

            <Image src="/jinx.webp" width={250} height={250} className="rounded-3xl" />
        </React.Fragment>
    );
};

export default About;
