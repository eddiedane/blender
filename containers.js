const variablePrefix = 'bs-';
const gridGutterWidth = 1.5;
const containerPaddingX = gridGutterWidth / 2;
const breakpoints = {
	xs: 0,
	sm: '576px',
	md: '768px',
	lg: '992px',
	xl: '1200px',
	xxl: '1400px'
};
const containerMaxWidths = {
  sm: '540px',
  md: '720px',
  lg: '960px',
  xl: '1140px',
  xxl: '1320px'
};

function breakpointMin(bp, bps = breakpoints) {
	const min = breakpoints[bp];
	return min != 0 ? min : null;
}

function breakpointInfix(bp, bps = breakpoints) {
	return breakpointMin(bp, bps) == null ? "" : `-${bp}`
}

function makeContainer(gutter = containerPaddingX) {
	return {
		width: '100%',
		paddingRight: `var(--${variablePrefix}gutter-x, ${gutter}rem)`,
		paddingLeft: `var(--${variablePrefix}gutter-x, ${gutter}rem)`,
		marginRight: 'auto',
		marginLeft: 'auto',
	}
}

function mediaBreakpointUp(contents, bp, bps = breakpoints) {
	const min = breakpointMin(bp, bps);
	if( min ) {
		return {
			[`@media (min-width: ${min})`]: contents,
		}
	}
	else {
		return contents;
	}
}

module.exports = ({addUtilities, theme}) => {

	const containers = {
		main: {'.container, .container-fluid': makeContainer()},
		responsive: {},
	};

	const responsiveContainer = {};
	const screens = [];

	for(let bp in containerMaxWidths) {
		let containerMaxWidth = containerMaxWidths[bp];

		containers.responsive[`.${bp + ':'}container`] = makeContainer();

		responsiveContainer[`${bp}`] = () => ({maxWidth: containerMaxWidths});

		let extendBreakpoint = true;
		for(let name in breakpoints) {
			let width = breakpoints[name];
			if( extendBreakpoint ) {
				let infix = breakpointInfix(name, breakpoints);
				screens.push(mediaBreakpointUp({
					[`.${infix?name+':':''}container`]: responsiveContainer[bp]()
				}, bp, breakpoints))

				if( name == bp ) extendBreakpoint = false;
			}
		}
	}

	console.log(screens);
}
