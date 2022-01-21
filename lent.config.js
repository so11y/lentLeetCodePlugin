const { defineLentConfig } = require('lent');
const { lentLeetCodePlugin } = require('./dist/index');

module.exports = defineLentConfig({
	root: './',
	plugin(i) {
		lentLeetCodePlugin(i);
	}
});
