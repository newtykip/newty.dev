import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

interface Song {
    artist: string;
    title: string;
    url: string;
}

const Home: NextPage = () => {
    const [currentSong, setCurrentSong] = useState<Song>(null);

    useEffect(() => {
        fetch(`${window.location.origin}/api/spotify`)
            .then(res => res.json())
            .then(data =>
                setCurrentSong({
                    artist: data.artists?.map(artist => artist.name).join(', '),
                    title: data.name,
                    url: data.url
                })
            );
    }, []);

    return (
        <React.Fragment>
            {/* todo: change image */}
            <div className="items-center justify-between mb-8">
                <Image src="/image.png" width={200} height={200} className="rounded-full" />
            </div>

            <div className="mb-24 items-center justify-between">
                <h1 className="text-3xl font-bold heading mb-2">
                    Hi, I'm <span className="rainbow">newt!</span>
                </h1>
                <h2 className="text-xl mb-0 subheading leading-relaxed">
                    Welcome to my home on the internet. <br />
                    <FontAwesomeIcon icon={faMusic} />{' '}
                    {currentSong?.title ? (
                        <a href={currentSong?.url} className="hover:underline">
                            {currentSong?.artist} - {currentSong?.title}
                        </a>
                    ) : (
                        'I am not currenty listening to anything!'
                    )}{' '}
                    <br />
                    <br />
                    If you are new around here
                    <br /> try the about page (:
                </h2>
            </div>
        </React.Fragment>
    );
};

export default Home;
