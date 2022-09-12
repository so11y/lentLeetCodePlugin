import type { Plugin } from 'lent';
import { readFileSync } from 'fs';

export const injectLeetCodePlugin = (): Plugin => {
	return {
		name: 'lent:injectLeetCode',
		enforce: 'pre',
		resolveId(id) {
			if (id === 'injectLeetCode') {
				return `/${id}`;
			}
		},
		load(id) {
			if (id === '/injectLeetCode')
				return readFileSync('./dist/share.js').toString();
		}
	};
};
