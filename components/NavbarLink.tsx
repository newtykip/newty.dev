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
        <li className={isActive ? 'box-border border-slate-500 p-2 border-2' : ''}>
            <button onClick={() => router.push(path)} className="font-bold">
                {content}
            </button>
        </li>
    );
};

export default NavbarLink;
