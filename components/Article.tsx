import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import type { NextPage } from 'next';

interface Props {
    title: string;
    description: string;
    image: string;
    reactions: number;
    comments: number;
    date: string;
    url: string;
    tags: string[];
    readTime: number;
}

const Article: NextPage<Props> = ({
    title,
    description,
    image,
    reactions,
    comments,
    date,
    url,
    tags,
    readTime
}) => {
    let columnCount = 0;

    if (reactions) columnCount += 1;
    if (comments) columnCount += 1;
    if (readTime) columnCount += 1;
    if (date) columnCount += 1;

    return (
        <div className="mt-8 p-4 w-full border-4 rounded-lg shadow-md dark:border-nord-0 hover:shadow-xl break-words">
            <a href={url}>
                <img src={image} />

                <h1 className="subheading font-bold text-xl object-scale-down p-5 hover:underline">
                    {title}
                </h1>
            </a>

            {description ? <p className="pb-5">{description}</p> : null}

            <div className={`grid grid-cols-${columnCount} pb-3`}>
                {reactions ? (
                    <div>
                        <FontAwesomeIcon icon={faHeart} /> {reactions}
                    </div>
                ) : null}
                {comments ? (
                    <div>
                        <a href={`${url}#comments`}>
                            <FontAwesomeIcon icon={faMessage} />{' '}
                            <span className="hover:underline">{comments}</span>
                        </a>
                    </div>
                ) : null}
                {readTime ? (
                    <div>
                        <FontAwesomeIcon icon={faClock} /> {readTime} minute
                        {readTime > 1 ? 's' : ''}
                    </div>
                ) : null}
                {date ? (
                    <div>
                        <FontAwesomeIcon icon={faCalendar} /> {date}
                    </div>
                ) : null}
            </div>

            {tags ? (
                <p className="subheading">
                    {tags.map(tag => (
                        <a className="hover:underline pl-2" href={`https://dev.to/t/${tag}`}>
                            #{tag}
                        </a>
                    ))}
                </p>
            ) : null}
        </div>
    );
};

export default Article;
