import humanizeDuration from 'humanize-duration';

export const humanise = (ms: number) => {
    return humanizeDuration(ms, {
        round: true,
        conjunction: ' and ',
    });
};
