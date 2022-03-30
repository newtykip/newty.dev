import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config';

const {
    theme: { screens }
} = resolveConfig(tailwindConfig as any);

export default function getBreakpoint() {
    let breakpoint: string;

    Object.keys(screens).forEach(key => {
        if (window.innerWidth > parseInt(screens[key].split('px')[0])) {
            breakpoint = key;
        }
    });

    breakpoint ??= 'sm';

    return breakpoint;
}
