const colors = require('tailwindcss/colors');
const colours = require('tailwindcss/colors');

module.exports = {
	mode: 'jit',
	purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ['Inter'],
		},
		colors: {
			gray: colours.gray,
			silver: '#d1c5ad',
			white: colours.white,
			purple: colors.violet,
		},
	},
};
