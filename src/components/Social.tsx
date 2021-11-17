import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitch } from '@fortawesome/free-brands-svg-icons';
import type { SizeProp } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';

interface SocialProps {
    iconSize: SizeProp;
}

function Social({ iconSize }: SocialProps) {
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        if (!isLive) {
            checkIfLive();
        }
    }, []);

    const checkIfLive = async () => {
        const { data } = await axios.get('https://newtt.me/api/twitch');

        setIsLive(data['stream'] ? true : false);
    };

    return (
        <ul className="inline space-x-8">
            <a
                href="https://github.com/newtykins"
                className="hover:text-silver"
            >
                <FontAwesomeIcon icon={faGithub} size={iconSize} />
            </a>
            <a
                href="https://twitch.tv/newtykin"
                className={
                    isLive
                        ? 'text-purple-500 hover:text-purple-400'
                        : 'hover:text-silver'
                }
            >
                <FontAwesomeIcon icon={faTwitch} size={iconSize} />
            </a>
        </ul>
    );
}

export default Social;
