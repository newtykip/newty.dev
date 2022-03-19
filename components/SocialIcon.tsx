import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { NextPage } from 'next';

interface Props {
    className?: string;
    icon: IconDefinition;
    url: string;
    tooltip?: string;
    iconClass?: string;
}

const SocialIcon: NextPage<Props> = ({ url, icon, className, tooltip, iconClass }) => {
    return (
        <a href={url} className={`mr-6 ${className}`} title={tooltip}>
            <FontAwesomeIcon icon={icon} className={iconClass ?? 'text-2xl'} />
        </a>
    );
};

export default SocialIcon;
