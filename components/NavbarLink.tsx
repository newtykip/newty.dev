import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { CSSProperties } from 'react';

interface Props {
    path: string;
    content: string;
}

const NavbarLink: NextPage<Props> = ({ path, content }) => {
    const router = useRouter();
    const isActive = router.pathname === path;

    return (
        <li
            className={`mr-4 ${
                isActive ? 'sm:box-border border-slate-500 sm:p-2 sm:border-2' : ''
            }`}
        >
            <button
                onClick={() => router.push(path)}
                className={`font-bold ${
                    !isActive ? 'hover:underline' : 'hover:underline sm:hover:no-underline'
                }`}
            >
                {content}
            </button>
        </li>
    );
};

export default NavbarLink;
