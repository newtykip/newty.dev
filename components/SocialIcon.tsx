import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useResize from '@hooks/useResize';
import getBreakpoint from '@utils/getBreakpoint';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

interface IconProps {
    icon: IconProp;
    iconClass?: string;
    calculatedSize: number;
}

interface Props extends Omit<IconProps, 'calculatedSize'> {
    className?: string;
    url?: string;
    tooltip?: string;
    iconSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    shouldResize?: boolean;
}

const Icon: NextPage<IconProps> = ({ icon, calculatedSize, iconClass }) => (
    <FontAwesomeIcon
        icon={icon}
        className={`text-${calculatedSize === 1 ? '' : calculatedSize}xl ${
            iconClass ? ` ${iconClass}` : ''
        }`}
    />
);

const SocialIcon: NextPage<Props> = ({
    url,
    icon,
    className,
    tooltip,
    iconClass,
    iconSize,
    shouldResize
}) => {
    iconSize ??= 2;
    shouldResize ??= true;

    const [calculatedSize, setIconSize] = useState<number>(iconSize);

    useResize(() => {
        if (shouldResize) {
            const breakpoint = getBreakpoint();

            if (breakpoint !== 'sm') {
                setIconSize(iconSize);
            } else {
                setIconSize(iconSize - 1);
            }
        }
    });

    return (
        <span className={`mr-6 hover:cursor-pointer ${className ?? ''}`} title={tooltip}>
            {url.startsWith('/') ? (
                <Link href={url}>
                    <Icon icon={icon} calculatedSize={calculatedSize} iconClass={iconClass} />
                </Link>
            ) : (
                <a href={url}>
                    <Icon icon={icon} calculatedSize={calculatedSize} iconClass={iconClass} />
                </a>
            )}
        </span>
    );
};

export default SocialIcon;
