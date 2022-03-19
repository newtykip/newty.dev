import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { NextPage } from 'next';

interface Props {
    className?: string;
    icon: IconDefinition;
    url: string;
    tooltip?: string;
}

const NavbarIcon: NextPage<Props> = ({ url, icon, className, tooltip }) => {
    return (
        <a href={url} className={`mr-6 ${className}`} title={tooltip}>
            <FontAwesomeIcon icon={icon} className={'text-2xl'} />
        </a>
    );
};

export default NavbarIcon;
