import type { NextPage } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer: NextPage = () => {
    return (
        <footer className="text-sm">
            made by{' '}
            <span className="hover:underline">
                <Link href="https://github.com/newtykins">newtykins</Link>
            </span>
            <br />
            <FontAwesomeIcon icon={faHeart} />
        </footer>
    );
};

export default Footer;
