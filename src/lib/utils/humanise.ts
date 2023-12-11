import humanizeDuration from 'humanize-duration';

export default function humanise(ms: number) {
    return humanizeDuration(ms, {
        round: true,
        conjunction: ' and '
    });
}
