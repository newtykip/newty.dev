import Article from '@components/Article';
import Blog from '@contexts/Blog';
import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useContext } from 'react';

const Home: NextPage = () => {
    const articles = useContext(Blog);

    return (
        <React.Fragment>
            <h1 className="heading text-4xl">
                Check out my <span className="rainbow">writings</span> :o
            </h1>

            {articles ? (
                articles.length > 0 ? (
                    articles.map(article => (
                        <Article
                            title={article?.title}
                            description={article?.description}
                            image={article?.['cover_image']}
                            reactions={article?.['positive_reactions_count']}
                            comments={article?.['comments_count']}
                            date={article?.['readable_publish_date']}
                            url={article?.url}
                            tags={article?.['tag_list']}
                            readTime={article?.['reading_time_minutes']}
                        />
                    ))
                ) : (
                    <React.Fragment>
                        <br />
                        <span className="subheading text-xl">
                            Woops! Looks like there is nothing here right now! Come back later (:
                        </span>
                        <br />
                        <br />
                        <Image src="/uhoh.png" width={250} height={250} className="rounded-3xl" />
                    </React.Fragment>
                )
            ) : (
                <React.Fragment>
                    <br />
                    <span className="subheading text-xl">Just loading... :D</span>
                    <br />
                    <br />
                    <Image src="/WOAH.webp" width={250} height={250} className="rounded-3xl" />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default Home;
