import axios from 'axios';
import React, { useState } from 'react';
import Typewriter, { TypewriterClass } from 'typewriter-effect';

// todo: add typewriter effect when changing songs
function Social() {
    const [url, setUrl] = useState<string>();

    const handleTypewriter = (typewriter: TypewriterClass) => {
        axios.get(`${window.location.origin}/api/spotify`).then(({ data }) => {
            if (!data.message) {
                typewriter
                    .changeDelay(50)
                    .typeString(
                        `now playing: ${data.artists
                            .map((a: any) => a.name)
                            .join(', ')
                            .toLowerCase()} - ${data.name.toLowerCase()}`,
                    )
                    .start();

                setUrl(data.url);
            }
        });
    };

    return (
        <a
            href={url}
            className="text-silver text-3xl font-bold hover:underline"
        >
            <Typewriter
                onInit={handleTypewriter}
                options={{
                    cursor: '',
                }}
            />
        </a>
    );
}

export default Social;
