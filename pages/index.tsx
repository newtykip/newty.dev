import type { NextPage } from 'next';
import React, { useContext } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Song from '@contexts/Song';

const Home: NextPage = () => {
    const currentSong = useContext(Song);

    return (
        <React.Fragment>
            <div className="items-center justify-between mb-8">
                <Image
                    src="https://github.com/newtykins.png"
                    width={200}
                    height={200}
                    className="rounded-full"
                />
            </div>

            <div className="mb-24 items-center justify-between">
                <h1 className="text-3xl heading">
                    Hi, I'm <span className="rainbow">newt!</span>
                </h1>
                <h2 className="text-xl mb-0 subheading leading-relaxed">
                    Welcome to my home on the internet. <br />
                    <FontAwesomeIcon icon={faMusic} />{' '}
                    {currentSong ? (
                        currentSong.title ? (
                            <a href={currentSong?.url} className="hover:underline">
                                {currentSong?.artist} - {currentSong?.title}
                            </a>
                        ) : (
                            'I am not currenty listening to anything!'
                        )
                    ) : (
                        '...'
                    )}{' '}
                    <br />
                    <br />
                    If you are new around here
                    <br /> try the{' '}
                    <span className="underline">
                        <Link href="/about">about page</Link>
                    </span>{' '}
                    (:
                </h2>
            </div>
        </React.Fragment>
    );
};

export default Home;
