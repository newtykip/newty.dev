import '@styles/globals.css';
import '@styles/tailwind.css';
import type { AppProps } from 'next/app';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="max-w-screen-lg mx-auto px-6 py-4 md:px-4 md:py-10 text-center">
            <Navbar />
            <Component {...pageProps} />
            <Footer />
        </div>
    );
}

export default MyApp;
