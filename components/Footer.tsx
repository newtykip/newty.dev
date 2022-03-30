import type { NextPage } from 'next';
import Link from 'next/link';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import SocialIcon from './SocialIcon';

const Footer: NextPage = () => {
    return (
        <footer className="text-sm mt-20 select-none flex flex-col content-center dark:text-nord-4">
            <span className="transformrelative w-full">
                made by{' '}
                <span className="hover:underline">
                    <Link href="https://github.com/newtykins">newtykins</Link>
                </span>
            </span>

            <div className="absolute left-1/2 transform -translate-x-1/2 mt-6">
                <SocialIcon
                    className="hover:text-red-600"
                    action="/shhh"
                    aria-label="Heart"
                    icon={faHeart}
                    iconSize={1}
                    shouldResize={false}
                />

                <SocialIcon
                    action="https://github.com/newtykins/web"
                    icon={faGithub}
                    iconSize={1}
                    shouldResize={false}
                />
            </div>
        </footer>
    );
};

export default Footer;
