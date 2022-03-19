import dayjs from 'dayjs';

export default function formatDate(input: number | string) {
    const date = typeof input === 'number' ? dayjs.unix(input) : dayjs(input);

    return date.format('DD/MM/YYYY HH:MM:ss');
}
