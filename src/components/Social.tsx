import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitch } from '@fortawesome/free-brands-svg-icons';
import type { SizeProp } from '@fortawesome/fontawesome-svg-core';

interface SocialProps {
    iconSize: SizeProp;
}

// todo: make the twitch icon turn red when i am streaming
function Social({ iconSize }: SocialProps) {
    return (
        <ul className="inline space-x-8">
            <a
                href="https://github.com/newtykins"
                className="hover:text-silver"
            >
                <FontAwesomeIcon icon={faGithub} size={iconSize} />
            </a>
            <a href="https://twitch.tv/newtykin" className="hover:text-silver">
                <FontAwesomeIcon icon={faTwitch} size={iconSize} />
            </a>
        </ul>
    );
}

export default Social;
