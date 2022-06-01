import type { NextPage } from 'next';
import React, { useContext, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Song from '@contexts/Song';
import {
    createOrbitControls,
    SkinViewer as SkinRenderer,
    WalkingAnimation,
    IdleAnimation
} from 'skinview3d';
import config from '@utils/config';

const Home: NextPage = () => {
    const currentSong = useContext(Song);
    const canvas = useRef<HTMLCanvasElement>();

    useEffect(() => {
        // Prepare the Minecraft skin renderer
        const skin: string = `${config.baseUrl}/minecraft/skin.png`;
        const cape: string = `${config.baseUrl}/minecraft/cape.png`;

        const renderer = new SkinRenderer({
            canvas: canvas.current,
            width: 256,
            height: 320,
            skin,
            cape,
            zoom: 1
        });

        const control = createOrbitControls(renderer);

        control.enableRotate = true;
        control.enableZoom = false;

        renderer.animations.add(WalkingAnimation);
        renderer.animations.add(IdleAnimation);
    }, []);

    return (
        <React.Fragment>
            <div className="items-center justify-between mb-8">
                <canvas ref={canvas} className="skin h-64 w-80" />
            </div>

            <div className="mb-24 items-center justify-between">
                <h1 className="text-3xl heading">
                    Hi, I'm <span className="rainbow">newt!</span>
                </h1>
                <h2 className="text-xl mb-0 subheading leading-relaxed">
                    Welcome to my home on the internet. <br />
                    <FontAwesomeIcon icon={faMusic} />{' '}
                    {currentSong ? (
                        currentSong.name ? (
                            <a href={currentSong?.url} className="hover:underline">
                                {currentSong?.artist} - {currentSong?.name}
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
