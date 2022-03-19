import '@styles/globals.css';
import '@styles/tailwind.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { createContext, useEffect, useState } from 'react';

// todo: refactor song
export const SongContext = createContext(null);

export interface Song {
    artist: string;
    title: string;
    url: string;
}

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
    const [currentSong, setCurrentSong] = useState<Song>(null);

    const updateSong = async () => {
        const data = await fetch(`${window.location.origin}/api/spotify`).then(res => res.json());

        setCurrentSong({
            artist: data.artists?.[0]?.name,
            title: data.name,
            url: data.url
        });
    };

    useEffect(() => {
        updateSong();
        setInterval(updateSong, 10000);
    }, []);

    return (
        <SongContext.Provider value={currentSong}>
            <div className="max-w-screen-lg mx-auto px-6 py-4 md:px-4 md:py-10 text-center">
                <Navbar />
                <Component {...pageProps} />
                <Footer />
            </div>
        </SongContext.Provider>
    );
};

export default App;
