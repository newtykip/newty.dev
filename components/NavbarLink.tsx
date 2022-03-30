import type { NextPage } from 'next';
import { useRouter } from 'next/router';

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
                isActive
                    ? 'md:box-border border-slate-500 dark:border-nord-4 md:p-2 md:border-2'
                    : ''
            }`}
        >
            <button
                onClick={() => router.push(path)}
                className={`font-bold ${
                    !isActive ? 'hover:underline' : 'hover:underline md:hover:no-underline'
                }`}
            >
                {content}
            </button>
        </li>
    );
};

export default NavbarLink;
