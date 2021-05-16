# What is Blender CSS?

Add plugins with ease, and ease transition from other CSS libraries to tailwind by providing plugins that adds utilities and components e.t.c. that mimics other libraries while maintaining tailwind conventions and synax.

Blender may also include collections of plugin in the tailwind ecosystem e.g @tailwindcss/forms

# Installation

`npm install blender --save-dev`

# Usage

```
// tailwind.config.js
const plugin = require('tailwindcss/plugin')
const blend = require('blender')

module.exports = {
	// add plugins with keyword from blender
	// or require other plugin
    plugins: blend([
    	'flexGrids',
    	require('other-plugin'),
    ]),
    // disables conficting plugins
    corePlugins: blend.config(),


    purge: [],
    darkMode: false,
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
}

```

## Options

### Note

All customization options should be defined in the `tailwind.config.js` within `theme.blender[$pluginName]`

*Example*
```
module.exports = {
	theme: {
		blender: {
			flexGrids: {
				columns: 6,
				gutter: '2rem',
			}
		}
		// ...
	},
	// ...
}
```

### Plugin options

Each plugins may have its own options check below,

* *flexGrids*
	* *columns* - _number of columns to generate_ (Defaults to 12)
	* *gutter* - _default gutter width, can be overiden with gutter class `.g, .gx, .gy`_ (Defaults to 1.5rem)
	* *containerMaxWidths* - _specify the maxwidth of `.container` at specified breakpoint_ (Defaults dynamically generated with predifined percentage reduction at each breakpoint)

## Included plugin

* *flexGrids* - _mimics bootstrap's flex grid, but still uses tailwind syntax i.e `.col-lg-1 = .lg:col-1`._
* *buttons*
