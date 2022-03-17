import type { NextPage } from 'next';
import Link from 'next/link';

const Footer: NextPage = () => {
    return (
        <footer className="text-sm">
            made by{' '}
            <span className="hover:underline">
                <Link href="https://github.com/newtykins">newtykins</Link>
            </span>
            <br />♥
        </footer>
    );
};

export default Footer;
