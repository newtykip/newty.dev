import type { NextPage } from 'next';
import { Html, Head, Main, NextScript } from 'next/document';

const Document: NextPage = () => {
    return (
        <Html>
            <Head>
                <title>newt!!</title>

                <meta property="og:title" content="newt!!" />
                <meta
                    property="og:description"
                    content="Student programmer providing simplistic solutions to modern
        problems"
                />
                <meta property="og:locale" content="en_GB" />
                <meta property="og:site_name" content="newtt.me" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://newtt.me/" />
                <meta property="og:image" content="https://github.com/newtykins.png" />

                <meta name="twitter:title" content="newt!!" />
                <meta
                    name="twitter:description"
                    content="Student programmer providing simplistic solutions to modern
            problems"
                />
                <meta name="twitter:image" content="/thumb.png" />
                <meta name="twitter:card" content="summary_large_image" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
