import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';

const Home: NextPage = () => {
    return (
        <React.Fragment>
            {/* todo: change image */}
            <div className="items-center justify-between mb-8">
                <Image src="/image.png" width={200} height={200} className="rounded-full" />
            </div>

            <div className="mb-24 items-center justify-between">
                <h1 className="text-3xl font-bold heading">
                    Hi, I'm <span className="rainbow">newt!</span>
                </h1>
                <h2 className="text-xl mb-0 subheading">Welcome to my home on the internet.</h2>
            </div>
        </React.Fragment>
    );
};

export default Home;
