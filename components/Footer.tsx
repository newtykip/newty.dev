import type { NextPage } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/router';

const Footer: NextPage = () => {
    const router = useRouter();

    return (
        <footer className="text-sm mt-20 select-none">
            made by{' '}
            <span className="hover:underline">
                <Link href="https://github.com/newtykins">newtykins</Link>
            </span>
            <div className="mt-2">
                <button
                    className="mr-6 hover:text-red-600"
                    onClick={() => router.push('/shhh')}
                    aria-label="Heart"
                >
                    <FontAwesomeIcon icon={faHeart} />
                </button>

                <a href="https://github.com/newtykins/web">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
