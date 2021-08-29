const Chroma = require('../chroma/index');
const getColors = require('./helpers/colors');

module.exports = ({addComponents, theme}) => {

	const colors = getColors(theme, true).withShades;
	const defaultShade = 500;
	const prefix = '.badge-';
	const badges = [];

	const colorBadge = (color) => {
		return {
		    'background': color,
		    'color': Chroma.contrast(color),
		}
	}

	const outlineBadge = color => ({
		'background': 'transparent',
		color: color,
		borderColor: color,
		borderWidth: theme('borderWidth.DEFAULT')
	});

	for(let color in colors) {
		let shades = colors[color];

		badges.push({
			[prefix + color]: colorBadge(shades[defaultShade]),
			[prefix + 'outline-' + color]: outlineBadge(shades[defaultShade]),
		});

		for(let shade in shades) {
			badges.push({
				[prefix + color + `-${shade}`]: colorBadge(shades[shade]),
				[prefix + 'outline-' + color + `-${shade}`]: outlineBadge(shades[shade]),
			});
		}
	}

	addComponents({
		'.badge': {
			'display': 'inline-block',
		    'padding': `${theme('spacing')['1.5']} ${theme('spacing')['2.5']}`,
		    'fontSize': theme('fontSize.xs'),
		    'fontWeight': theme('fontWeight.bold'),
		    'lineHeight': '1',
		    'textAlign': 'center',
		    'whiteSpace': 'nowrap',
		    'verticalAlign': 'baseline',
		    'borderRadius': theme('spacing.1'),
		    'cursor': 'pointer',
		}
	})

	addComponents({
		'.badge-sm': {
		    'padding': `${theme('spacing.1')} ${theme('spacing.2')}`,
		}
	})

	addComponents(badges, ['responsive']);
};