module.exports = (theme, blackVariant) => {
	const thmColors = theme('colors');
	const bdrColors = theme('blender.colors') || {};

	const colors = {...thmColors, ...bdrColors};
	const withShades = {};

	for(let color in colors) {
		let variants = colors[color];
		if( typeof variants === 'string' ) continue;

		withShades[color] = variants;
	}

	if( blackVariant ) {
		withShades.black = {
			50: '#0f0f0f',
			100: '#0d0d0d',
			200: '#0b0b0b',
			300: '#090909',
			400: '#070707',
			500: '#050505',
			600: '#030303',
			700: '#020202',
			800: '#010101',
			900: '#000000',
		}
	}

	return {
		all: colors,
		withShades
	};
};
