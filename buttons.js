
module.exports = ({addComponents, theme}) => {
	const buttons = {
		'.btn': {
			padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
			borderRadius: theme('borderRadius.md'),
			fontWeight: theme('fontWeight.600'),
		},
		'.btn-sm': {
			padding: `${theme('spacing.1')} ${theme('spacing.2')}`,
			fontSize: `${theme('fontSize.sm')}`,
		},
		'.btn-blue': {
			backgroundColor: theme('colors.blue.500'),
			color: theme('colors.white'),
			'&:hover': {
				backgroundColor: theme('colors.blue.600'),
			}
		},
		'.btn-yellow': {
			backgroundColor: theme('colors.yellow.500'),
			color: theme('colors.black'),
			'&:hover': {
				backgroundColor: theme('colors.yellow.600'),
			}
		},
	}

	addComponents(buttons);
};
