import type { NextPage } from 'next';

interface Props {
    header: string;
}

const Card: NextPage<Props> = ({ header, children }) => {
    return (
        <div className="mt-8 p-4 w-full border-2 rounded-lg shadow-md dark:border-nord-0 hover:shadow-xl max-w-xs break-words">
            <h1 className="subheading font-bold text-xl object-scale-down">{header}</h1>
            {children}
        </div>
    );
};

export default Card;
