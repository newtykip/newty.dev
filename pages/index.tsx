import type { NextPage } from 'next';
import React, { useContext, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Song from '@contexts/Song';
import { createOrbitControls, SkinViewer, WalkingAnimation } from 'skinview3d';
import config from '@utils/config';

const Home: NextPage = () => {
    const currentSong = useContext(Song);
    const skinCanvas = useRef<HTMLCanvasElement>();

    useEffect(() => {
        fetch(`https://api.capes.dev/load/${config.credentials.minecraft.uuid}/optifine`)
            .then(res => res.json())
            .then(({ imageUrl }) => {
                const skin = new SkinViewer({
                    canvas: skinCanvas.current,
                    width: 250,
                    height: 350,
                    skin: `https://crafatar.com/skins/${config.credentials.minecraft.uuid}.png`,
                    cape: `${imageUrl}.png`
                });

                const control = createOrbitControls(skin);

                control.enableRotate = true;
                control.enableZoom = false;

                skin.animations.add(WalkingAnimation);
            });
    }, []);

    return (
        <React.Fragment>
            <div className="items-center justify-between mb-8">
                <canvas ref={skinCanvas} className="skin" />
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
