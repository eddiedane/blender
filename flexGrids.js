module.exports = ({addUtilities, theme, addComponents}) => {
	const thm = theme('blender.flexGrids')||{};
	const gutterX = theme('spacing.6');
	const gutterY = theme('spacing.0');
	const gridColums = thm.columns || 12;
	const gridRowColums = 6;
	const gridGutterWidth = thm.gutter || '1.5rem';
	const variablePrefix = 'bs-';
	const containerPaddingX = rem(parseFloat(gridGutterWidth) / 2);
	const breakpoints = theme('screens');
	const containerMaxWidths = defaultContainerMaxWidths(thm.containerMaxWidths);
	const gutters = theme('spacing');

	function defaultContainerMaxWidths(def, bps=breakpoints) {
		if( def === undefined ) {
			const defPercentages = {sm: 6.25, md: 6.25, lg: 3.23, xl: 5, '2xl': 5.71};
			def = {};

			for(let bp in bps) {
				let width = parseInt(breakpoints[bp]);
				def[bp] = parseInt(width - (((defPercentages[bp]||defPercentages.xl)*width)/100)) + 'px';
			}
		}

		return def;
	}

	function makeContainer(gutter = containerPaddingX) {
		return {
			width: '100%',
			paddingRight: `var(--${variablePrefix}gutter-x, ${gutter})`,
			paddingLeft: `var(--${variablePrefix}gutter-x, ${gutter})`,
			marginRight: 'auto',
			marginLeft: 'auto',
		}
	}

	function makeColAuto() {
		return {
			flex: '0 0 auto',
			width: 'auto',
		}
	}

	function rem(num) {
		return `${num}rem`;
	}

	function makeCol(size = false, columns = gridColumns) {
	  if(size) {
	  	return {
		    flex: '0 0 auto',
		    width: `${size*100/columns}%`,
	  	}
	  }
	  else {
	  	return {
		    flex: '1 1 0',
		    maxWidth: '100%',
	  	}
	  }
	}

	function makeRow(gw = gridGutterWidth) {
		return {
			[`--${variablePrefix}gutter-x`]: gw,
			[`--${variablePrefix}gutter-y`]: 0,
			display: 'flex',
			flexWrap: 'wrap',
			marginTop: `calc(var(--${variablePrefix}gutter-y) * -1)`,
			marginRight: `calc(var(--${variablePrefix}gutter-x) / -2)`,
			marginLeft: `calc(var(--${variablePrefix}gutter-x) / -2)`,
		}
	}

	function makeColReady(gw = gridGutterWidth) {
		return {
			boxSizing: 'border-box',
			flexShrink: 0,
			width: '100%',
			maxWidth: '100%',
			paddingRight: `calc(var(--${variablePrefix}gutter-x) / 2)`,
			paddingLeft: `calc(var(--${variablePrefix}gutter-x) / 2)`,
			marginTop: `--${variablePrefix}gutter-y`,
		}
	}

	function makeColOffset(size, columns = gridColumns) {
	  const num = size / columns;
	  return {
	  	marginLeft: num == 0 ? 0 : `${num}%`
	  }
	}

	function mediaBreakpointUp(contents, bp, bps = breakpoints) {
		const min = breakpointMin(bp, bps);
		if( min ) {
			return {
				[`@screen ${bp}`]: contents,
			}
		}
		else {
			return contents;
		}
	}

	function breakpointMin(bp, bps = breakpoints) {
		const min = breakpoints[bp];
		return min != 0 ? min : null;
	}

	function breakpointInfix(bp, bps = breakpoints) {
		return breakpointMin(bp, bps) == null ? "" : `${bp}\\:`
	}

	function rowCols(i) {
		return {
			flex: '0 0 auto',
			width: `${100 / i}%`,
		}
	}

	function makeContainers(cols = gridColums) {
		const containers = [{'.container, .container-fluid': makeContainer()}];

		for(let bp in containerMaxWidths) {
			let containerMaxWidth = containerMaxWidths[bp];

			containers.push({[`.${breakpointInfix(bp, breakpoints)}container`]: makeContainer()});
			let screenContainers = {};
			let extendBreakpoint = true;
			for(let name in breakpoints) {
				let width = breakpoints[name];
				if( extendBreakpoint ) {
					let infix = breakpointInfix(name, breakpoints);
					screenContainers[`.container`] = {maxWidth: containerMaxWidth};
					screenContainers[`.${infix}container`] = {maxWidth: containerMaxWidth};

					if( name == bp ) extendBreakpoint = false;
				}
			}

			containers.push(mediaBreakpointUp(screenContainers, bp, breakpoints));
		}

		return containers;
	}

	function makeGridCols(cols = gridColums, gutter = gridGutterWidth, bps = breakpoints) {
		let gridCols = {row: {
			'.row': makeRow(),
			'.row > *': makeColReady()
		}};

		let gridBpCols = {};

		gridBpCols[`.col`] = {flex: '1 0 0%'}
		gridBpCols[`.row-cols-auto > *`] = makeColAuto()

		if( gridRowColums > 0 ) {
			for (let i = 1; i <= gridRowColums; i++) {
				gridBpCols[`.row-cols-${i} > *`] = rowCols(i)
			}
		}

		gridBpCols[`.col-auto`] = makeColAuto()

		if( cols > 0 ) {
			for (let i = 1; i <= cols; i++) {
				gridBpCols[`.col-${i}`] = makeCol(i, cols)
			}

			for (let i = 0; i <= cols - 1; i++) {
			  if(i != 0) {
			    gridBpCols[`.offset-${i}`] = makeColOffset(i, cols)
			  }
			}
		}

		for(let key in gutters) {
			let value = gutters[key];
			gridBpCols[`.g-${key}, .gx-${key}`] = {[`--${variablePrefix}gutter-x`]: value}
			gridBpCols[`.g-${key}, .gy-${key}`] = {[`--${variablePrefix}gutter-y`]: value}
		}

		gridCols.cols = gridBpCols;

		return gridCols;
	}

	const containers = makeContainers();
	const gridUtilities = makeGridCols();

	addComponents(containers);
	addUtilities(gridUtilities.row)
	addUtilities(gridUtilities.cols, ['responsive']);
}
