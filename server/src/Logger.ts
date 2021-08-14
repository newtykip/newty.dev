import chalk from 'chalk';

export default class Logger {
    info(...text: string[]) {
        console.log(chalk.yellow('[INFO] ', ...text));
    }

    error(...text: string[]) {
        console.error(chalk.red('[ERROR] ', ...text));
    }

    spotify(...text: string[]) {
        console.log(chalk.green('[SPOTIFY] ', ...text));
    }

    osu(...text: string[]) {
        console.log(chalk.hex('#FFC0CB')('[OSU] ', ...text));
    }

    twitch(...text: string[]) {
        console.log(chalk.magenta('[TWITCH] ', ...text));
    }

    bold(...text: string[]) {
        return chalk.bold(...text);
    }
}
