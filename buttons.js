const Chroma = require('../chroma/index');
const getColors = require('./helpers/colors');

module.exports = ({addComponents, theme}) => {
	const colors = getColors(theme, true).withShades;

	const white = colors.white;
	const black = colors.black;
	const defaultShade = 500;
	const buttonsColors = [];
	const addFocusStyles = (color, shades) => ({
		[color == 'black' || color == 'white' || typeof shades === 'string' ? '' : `@apply ring-${color}-300`]: '',
	});

	for(let color in colors) {
		let shades = colors[color];

		let defaultHex = shades[defaultShade];
		let defaultContrast = Chroma.contrast(defaultHex);

		buttonsColors.push({
			[`.btn-${color}`]: {
				backgroundColor: defaultHex,
				color: defaultContrast,
				'&.active': {backgroundColor: Chroma.darken(defaultHex, 50)},
				'&:enabled:hover, &:not(button):hover': {
					backgroundColor: Chroma.darken(defaultHex, (defaultShade/100)*4),
				},
				'&:enabled:focus, &:not(button):focus': addFocusStyles(color, shades)
			},
			[`.btn-outline-${color}`]: {
				backgroundColor: 'transparent',
				color: defaultHex,
				borderColor: defaultHex,
				borderWidth: theme('borderWidth.DEFAULT'),
				'&.active': {backgroundColor: Chroma.darken(defaultHex, 50)},
				'&:enabled:hover, &:not(button):hover': {
					backgroundColor: defaultHex,
					color: defaultContrast,
				},
				'&:enabled:focus, &:not(button):focus': addFocusStyles(color, shades)
			},
		})

		for(let shade in shades) {
			
			let colorHex = shades[shade];
			let colorContrast = Chroma.contrast(colorHex);

			buttonsColors.push({
				[`.btn-${color}-${shade}`]: {
					backgroundColor: colorHex,
					color: colorContrast,
					'&.active': {backgroundColor: Chroma.darken(colorHex, 50)},
					'&:enabled:hover, &:not(button):hover': {
						backgroundColor: Chroma.darken(colorHex, (shade/100)*4),
					},
					'&:enabled:focus, &:not(button):focus': addFocusStyles(color, shades)
				},
				[`.btn-outline-${color}-${shade}`]: {
					backgroundColor: 'transparent',
					color: colorHex,
					borderColor: colorHex,
					borderWidth: theme('borderWidth.DEFAULT'),
					'&.active': {backgroundColor: Chroma.darken(colorHex, 50)},
					'&:enabled:hover, &:not(button):hover': {
						backgroundColor: colorHex,
						color: colorContrast,
					},
					'&:enabled:focus, &:not(button):focus': addFocusStyles(color, shades)
				},
			});
		}
	}

	addComponents({
		'.btn': {
			padding: `${theme('spacing')['1.5']} ${theme('spacing.3')}`,
			borderRadius: '.3rem',
			fontWeight: theme('fontWeight.600'),
			borderWidth: '1px',
			borderColor: 'transparent',
			outline: 'none !important',
			'@apply transition-all ease-in-out text-center inline-block': '',
		},
		'.btn:focus': {
			'@apply ring-4': '',
		}
	});

	addComponents({
		'.btn-md': {
			padding: `${theme('spacing')['1.5']} ${theme('spacing.3')}`,
			fontSize: `1rem`,
		},
		'.btn-sm': {
			padding: `${theme('spacing.1')} ${theme('spacing.2')}`,
			fontSize: `${theme('fontSize.sm')}`,
		},
		'.btn-xs': {
			padding: `${theme('spacing')['0.5']} ${theme('spacing.2')}`,
			fontSize: `${theme('fontSize.xs')}`,
		}
	}, ['responsive']);

	addComponents(buttonsColors, ['responsive']);
};
