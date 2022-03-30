const componentToHex = (component: number) => {
    const hex = component.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
};

export default function rgbToHex(r: number, g: number, b: number) {
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}
