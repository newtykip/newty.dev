import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min.js';
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import Helmet from 'react-helmet';
import Social from './components/Social';
import Song from './components/Song';
import Favicon from 'react-favicon';

interface AppProps {}

function App({}: AppProps) {
    const [vantaEffect, setVantaEffect]: any = useState(0);

    useEffect(() => {
        // Handle the VANTA animation
        if (!vantaEffect) {
            const { innerHeight: height, innerWidth: width } = window;

            setVantaEffect(
                NET({
                    el: 'body',
                    mouseControls: true,
                    touchControls: false,
                    gyroControls: false,
                    minHeight: height,
                    minWidth: width,
                    backgroundColor: 0x0f0f10,
                    color: 0xffffff,
                    showDots: false,
                    points: 3,
                    THREE,
                }),
            );
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    // todo: animate exclamation marks in title

    const handleTypewriter = (typewriter: TypewriterClass) => {
        typewriter.typeString('newtykins').start();
    };

    const frames = Array.from(
        Array(9),
        (_, x) => `./favicon/${x}.png?v=${Math.floor(Math.random() * 100000)}`,
    );

    return (
        <main>
            <Helmet>
                <title>newt!!</title>
            </Helmet>
            <Favicon url={frames} animated={true} animationDelay={75} />

            <div className="p-40">
                <div className="name flex flex-col w-full z-1">
                    <span className="text-silver text-8xl font-extrabold pb-10">
                        <Typewriter onInit={handleTypewriter} />
                    </span>

                    <Song />
                </div>

                <span className="flex text-gray-400 text-5xl font-bold leading-relaxed intro pt-20 w-3/5">
                    Student programmer providing simplistic solutions to modern
                    problems.
                </span>

                <footer className="flex text-gray-400 pt-32">
                    <Social iconSize={'2x'} />
                </footer>
            </div>
        </main>
    );
}

export default App;
