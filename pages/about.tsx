import type { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import Card from '@components/Card';
import { Song, SongContext } from './_app';

const About: NextPage = () => {
    const [repoCount, setRepoCount] = useState<number>(null);
    const currentSong = useContext<Song>(SongContext);

    useEffect(() => {
        // Fetch the repo count
        fetch('https://api.github.com/users/newtykins/repos')
            .then(res => res.json())
            .then(data => setRepoCount(data?.length));
    }, []);

    return (
        <React.Fragment>
            <h1 className="heading text-4xl">
                Hi, I'm <span className="rainbow">newt</span>.
            </h1>

            <span className="subheading text-xl">I do stuff on the internet sometimes.</span>

            <h2 className="heading text-3xl mt-10">
                Sometimes that stuff is pretty <span className="rainbow">cool</span>
            </h2>

            <div className="grid grid-flow-row justify-center items-center md:grid-flow-col gap-2">
                <Card header="GitHub Repos">
                    <span className="heading text-3xl">{repoCount ?? '...'}</span>
                </Card>
                <Card header="Listening to">
                    <span className="font-bold text-xl">
                        {currentSong?.title ? (
                            <a href={currentSong?.url} className="hover:underline">
                                {currentSong?.artist} - {currentSong?.title}
                            </a>
                        ) : (
                            'nothing (:'
                        )}
                    </span>
                </Card>

                {/* todo: add anime watched and most played recently games (steam api) */}
            </div>
        </React.Fragment>
    );
};

export default About;
