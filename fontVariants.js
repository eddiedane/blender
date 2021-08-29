module.exports = ({addUtilities, theme}) => {
	const fontVariants = {
		'.smallcaps': {
			fontVariant: `small-caps`,
		},
	}

	addUtilities(fontVariants);
};
