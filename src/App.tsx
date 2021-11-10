import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min.js';
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import Helmet from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitch } from '@fortawesome/free-brands-svg-icons';
import './App.css';
import type { SizeProp } from '@fortawesome/fontawesome-svg-core';

interface AppProps {}

function App({}: AppProps) {
    const [vantaEffect, setVantaEffect]: any = useState(0);
    const iconSize: SizeProp = '2x';

    useEffect(() => {
        // Handle the VANTA animation
        if (!vantaEffect) {
            const { innerHeight: height, innerWidth: width } = window;

            setVantaEffect(
                NET({
                    el: '.anim',
                    mouseControls: true,
                    touchControls: false,
                    gyroControls: false,
                    minHeight: height,
                    minWidth: width,
                    backgroundColor: 0x0f0f10,
                    color: 0xffffff,
                    showDots: false,
                    points: width >= 1920 ? 3 : Math.floor(width / 100),
                    THREE,
                }),
            );
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    const handleTypewriter = (typewriter: TypewriterClass) => {
        typewriter.typeString('newtykins').start();
    };

    return (
        <main>
            <Helmet>
                <title>newt!!</title>
            </Helmet>
            <span className="anim"></span>
            <span className="text-silver text-8xl font-extrabold name">
                <Typewriter onInit={handleTypewriter} />
            </span>
            <span className="text-gray-400 text-5xl font-bold py-56 leading-relaxed intro">
                Student programmer providing simplistic solutions to modern
                problems.
            </span>

            <footer className="text-gray-400">
                <ul className="inline space-x-8">
                    <a
                        href="https://github.com/newtykins"
                        className="hover:text-silver"
                    >
                        <FontAwesomeIcon icon={faGithub} size={iconSize} />
                    </a>
                    <a
                        href="https://twitch.tv/newtykin"
                        className="hover:text-silver"
                    >
                        <FontAwesomeIcon icon={faTwitch} size={iconSize} />
                    </a>
                </ul>
            </footer>
        </main>
    );
}

export default App;
