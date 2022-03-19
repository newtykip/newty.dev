import type { NextPage } from 'next';
import React from 'react';

const Shhh: NextPage = () => {
    return (
        <React.Fragment>
            <h1 className="text-3xl heading">
                You have found the <span className="rainbow">treasure</span>
            </h1>

            <span className="subheading text-xl">Enjoy this video as a reward (:</span>

            <div className="flex justify-center mt-10">
                <video src="./high five!!.mp4" autoPlay loop controls></video>
            </div>
        </React.Fragment>
    );
};

export default Shhh;
