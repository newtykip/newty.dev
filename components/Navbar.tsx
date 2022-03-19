import '@styles/Navbar.module.css';
import type { NextPage } from 'next';
import NavbarLink from './NavbarLink';
import { useRouter } from 'next/router';

const Navbar: NextPage = () => {
    const router = useRouter();

    return (
        <header className="flex items-center flex-wrap justify-between relative mb-20" id="nav">
            <button className="rainbow text-2xl mr-6 font-bold" onClick={() => router.push('/')}>
                newt!
            </button>

            <ul className="align-baseline sm:block flex-wrap md:flex md:items-center flex-grow py-4 px-2 md:p-0 md:bg-transparent">
                <NavbarLink path="/" content="Home" />
                <NavbarLink path="/about" content="About Me" />
            </ul>
        </header>
    );
};

export default Navbar;
