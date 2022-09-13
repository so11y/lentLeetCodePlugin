// const { defineLentConfig } = require('lent');
// const { lentLeetCodePlugin } = require('./dist/index');

// module.exports = defineLentConfig({
// 	root: './',
// 	plugin(i) {
// 		lentLeetCodePlugin(i);
// 	}
// });
import { lentLeetCode, injectQueryPlugin, injectLeetCodePlugin } from './dist';

import { defineConfig } from 'lent';

export default defineConfig({
	port: 3099,
	plugins: [injectQueryPlugin(), injectLeetCodePlugin()],
	middleware: [lentLeetCode]
});
