const plugins = {
	buttons: require('./buttons'),
	flexGrids: require('./flexGrids'),
	containers: require('./containers'),
};

function blend(pluginNames = []) {
	return pluginNames.reduce((accumulator, pluginName) => {
		plugin = plugins[pluginName];

		if( !plugin ) {
			throw new Error(`Plugin "${pluginName}" does not exists.`);
		}

		accumulator.push(plugin);

		return accumulator;
	}, []);
}

blend.config = (config = {}) => ({
	...config,
	container: false,
    gap: false,
    columnGap: false,
    rowGap: false,
    gridColumn: false,
    gridColumnEnd: false,
    gridColumnStart: false,
    gridRow: false,
    gridRowEnd: false,
    gridRowStart: false,
    gridTemplateColumns: false,
    gridTemplateRows: false,
    gridAutoFlow: false,
});

module.exports = blend;
